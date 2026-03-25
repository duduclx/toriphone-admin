import { useState } from "react";
import { useExtensions } from "./Extensions";

export const useGroups = ({ apiClient }) => {
  // dependencies
  const { extensionCreate, extensionDelete } = useExtensions({ apiClient });

  // values
  const [groups, setGroups] = useState({});
  const [groupsAll, setGroupsAll] = useState({});
  const [groupSelected, setGroupSelected] = useState({});

  // functions
  const groupsGet = async () => {
    const res = await apiClient.client.get("confd/1.1/groups?recurse=false");
    setGroupsAll(res);
    return res;
  };

  const groupsPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const res = await apiClient.client.get(`confd/1.1/groups?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setGroups(res);
      return res;
    } else {
      const res = await apiClient.client.get(`confd/1.1/groups?recurse=false&limit=${limit}&offset=${offset}`);
      setGroups(res);
      return res;
    }
  }

  const groupAdd = async (group) => {
    try {
      const res = await apiClient.client.post("confd/1.1/groups", group);
      return res;
    } catch (e) {
      return e;
    }
  };

  const groupCreate = async (newGroup, line) => {
    const createdGroup = await groupAdd(newGroup);
    if (createdGroup.error) {
      return createdGroup;
    }
    const createdLine = await extensionCreate(line);
    if (createdLine.error) {
      return createdLine;
    }
    const groupWithLine = await groupExtensionAssociate(createdGroup, createdLine);
    if (groupWithLine.error) {
      return groupWithLine;
    }
    if (newGroup.schedule) {
      const sche = await groupSchedulesAssociate(createdGroup, newGroup.schedule);
      if (sche.error) {
        return sche;
      }
    }
    if (newGroup.members.users.length > 0) {
      const members = await groupMembersUsersUpdate(createdGroup, newGroup.members);
      if (members.error) {
        return members;
      }
    }
    if (newGroup.fallbacks) {
      const falls = await groupFallbacksUpdate(createdGroup, newGroup.fallbacks);
      if (falls.error) {
        return falls;
      }
    }
    if (newGroup.call_permissions.length > 0) {
      const perms = await groupCallPermissionsAssociate(createdGroup, newGroup.call_permissions);
      if (perms.error) {
        return perms;
      }
    }
    return groupWithLine;
  };

  const groupEdit = async (group) => {
    const groupUuid = group.uuid;
    try {
      const res = await apiClient.client.put(`confd/1.1/groups/${groupUuid}`, group);
      return res;
    } catch (e) {
      return e;
    }
  };

  const groupUpdate = async (newGroup, line, groupSelected) => {
    // update general and options
    const updatedGroup = await groupEdit(newGroup);
    if (updatedGroup.error) {
      return updatedGroup;
    }

    // extension
    if (line.exten !== newGroup.extensions[0].exten) {
      // dissocier l'existante
      const diss = await groupExtensionDissociate(newGroup);
      if (diss.error) {
        return diss;
      }
      // supprimer l'ancienne extension
      const remove = await extensionDelete(newGroup.extensions[0]);
      if (remove.error) {
        return remove;
      }
      // créer la ligne et l'associer
      const createdLine = await extensionCreate(line);
      if (createdLine.error) {
        return createdLine;
      }
      const groupWithLine = await groupExtensionAssociate(newGroup, createdLine);
      if (groupWithLine.error) {
        return groupWithLine;
      }
    }

    // members
    const members = await groupMembersUsersUpdate(newGroup, newGroup.members);
    if (members.error) {
      return members;
    }

    // fallbacks
    const falls = await groupFallbacksUpdate(newGroup, newGroup.fallbacks);
    if (falls.error) {
      return falls;
    }

    // schedule
    if (newGroup.schedule && groupSelected.schedules[0]) {
      // Si les IDs des schedules sont différents, effectuer les opérations de dissociation et d'association
      if (newGroup.schedule.id !== groupSelected.schedules[0].id) {
        const diss = await groupSchedulesDissociate(newGroup, groupSelected.schedules[0]);
        if (diss.error) {
          return diss;
        }
        const asso = await groupSchedulesAssociate(newGroup, newGroup.schedule);
        if (asso.error) {
          return asso;
        }
      }
    } else if (newGroup.schedule && !groupSelected.schedules[0]) {
      // Si seulement newGroup a un schedule, associer ce schedule
      const asso = await groupSchedulesAssociate(newGroup, newGroup.schedule);
      if (asso.error) {
        return asso;
      }
    } else if (!newGroup.schedule && groupSelected.schedules[0]) {
      // Si seulement groupSelected a un schedule, dissocier ce schedule
      const diss = await groupSchedulesDissociate(newGroup, groupSelected.schedules[0]);
      if (diss.error) {
        return diss;
      }
    }

    // call permissions
    const perms = await groupCallPermissionUpdate(newGroup, groupSelected);
    if (perms.error) {
      return perms;
    }

    return updatedGroup;
  };

  const groupDelete = async (group) => {
    const groupUuid = group.uuid;
    try {
      const res = await apiClient.client.delete(`confd/1.1/groups/${groupUuid}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const groupCallPermissionAssociate = async (group, callPermission) => {
    const groupUuid = group.uuid;
    const callPermissionId = callPermission.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/groups/${groupUuid}/callpermissions/${callPermissionId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const groupCallPermissionsAssociate = async (group, callPermissions) => {
    const groupUuid = group.uuid;
    for (const callPermission of callPermissions) {
      const callPermissionId = callPermission.id;
      try {
        const res = await apiClient.client.put(`confd/1.1/groups/${groupUuid}/callpermissions/${callPermissionId}`);
        return res;
      } catch (e) {
        return e;
      }
    }
    return true;
  };

  const groupCallPermissionDissociate = async (group, callPermission) => {
    const groupUuid = group.uuid;
    const callPermissionId = callPermission.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/groups/${groupUuid}/callpermissions/${callPermissionId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const groupCallPermissionsDissociate = async (group, callPermissions) => {
    const groupUuid = group.uuid;
    for (const callPermission of callPermissions) {
      const callPermissionId = callPermission.id;
      try {
        const res = await apiClient.client.delete(`confd/1.1/groups/${groupUuid}/callpermissions/${callPermissionId}`);
        return res;
      } catch (e) {
        return e;
      }
    }
    return true;
  };

  const groupCallPermissionUpdate = async (newGroup, groupSelected) => {
    const newCallPermissions = newGroup.call_permissions.map((cp) => cp.id);
    const oldCallPermissions = groupSelected.call_permissions.map((cp) => cp.id);

    // Trouver les permissions à dissocier
    const permissionsToDissociate = groupSelected.call_permissions.filter((cp) => !newCallPermissions.includes(cp.id));

    // Trouver les permissions à associer
    const permissionsToAssociate = newGroup.call_permissions.filter((cp) => !oldCallPermissions.includes(cp.id));

    // Dissocier les permissions qui ne sont plus présentes
    for (const permission of permissionsToDissociate) {
      try {
        await groupCallPermissionDissociate(newGroup, permission);
      } catch (e) {
        console.error(`Failed to dissociate permission ${permission.id}`, e);
      }
    }

    // Associer les nouvelles permissions
    for (const permission of permissionsToAssociate) {
      try {
        await groupCallPermissionAssociate(newGroup, permission);
      } catch (e) {
        console.error(`Failed to associate permission ${permission.id}`, e);
      }
    }
    return true;
  };

  const groupExtensionAssociate = async (group, extension) => {
    const groupUuid = group.uuid;
    const extensionId = extension.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/groups/${groupUuid}/extensions/${extensionId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const groupExtensionDissociate = async (group) => {
    const groupUuid = group.uuid;
    const extensionId = group.extensions[0].id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/groups/${groupUuid}/extensions/${extensionId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const groupFallbacksGet = async () => {};

  const groupFallbacksUpdate = async (group, fallback) => {
    const groupUuid = group.uuid;
    try {
      const res = await apiClient.client.put(`confd/1.1/groups/${groupUuid}/fallbacks`, fallback);
      return res;
    } catch (e) {
      return e;
    }
  };

  const groupMembersExtensionsUpdate = async () => {};

  const groupMembersUsersUpdate = async (group, users) => {
    const groupUuid = group.uuid;
    try {
      const res = await apiClient.client.put(`confd/1.1/groups/${groupUuid}/members/users`, users);
      return res;
    } catch (e) {
      return e;
    }
  };

  const groupSchedulesAssociate = async (group, schedule) => {
    const groupUuid = group.uuid;
    const scheduleId = schedule.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/groups/${groupUuid}/schedules/${scheduleId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const groupSchedulesDissociate = async (group, schedule) => {
    const groupUuid = group.uuid;
    const scheduleId = schedule.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/groups/${groupUuid}/schedules/${scheduleId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    groups,
    setGroups,
    groupsAll,
    setGroupsAll,
    groupSelected,
    setGroupSelected,
    groupsGet,
    groupsPageGet,
    groupAdd,
    groupCreate,
    groupEdit,
    groupUpdate,
    groupDelete,
    groupCallPermissionAssociate,
    groupCallPermissionsAssociate,
    groupCallPermissionDissociate,
    groupCallPermissionsDissociate,
    groupMembersUsersUpdate,
    groupFallbacksUpdate,
    groupExtensionAssociate,
    groupExtensionDissociate,
    groupSchedulesAssociate,
    groupSchedulesDissociate,
  };
};
