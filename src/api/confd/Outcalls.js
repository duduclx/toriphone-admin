import { useState } from "react";
import { useExtensions } from "./Extensions";

export const useOutcalls = ({ apiClient }) => {
  // dependencies
  const { extensionCreate, extensionDelete, extensionUpdate } = useExtensions({ apiClient });

  // values
  const [outcalls, setOutcalls] = useState({});
  const [outcallSelected, setOutcallSelected] = useState({});

  // functions
  const outcallsGet = async () => {
    const outcalls = await apiClient.client.get("confd/1.1/outcalls?recurse=false");
    setOutcalls(outcalls);
    return outcalls;
  };

  const outcallsPageGet = async (search = null, offset = 0, limit = 10) => {
    if (search) {
      const outcalls = await apiClient.client.get(
        `confd/1.1/outcalls?recurse=false&limit=${limit}&offset=${offset}&search=${search}`
      );
      setOutcalls(outcalls);
      return outcalls;
    } else {
      const outcalls = await apiClient.client.get(`confd/1.1/outcalls?recurse=false&limit=${limit}&offset=${offset}`);
      setOutcalls(outcalls);
      return outcalls;
    }
  };

  const outcallGet = async (outcallId) => {
    try {
      const res = await apiClient.client.get(`confd/1.1/outcalls/${outcallId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const outcallAdd = async (outcall) => {
    try {
      const res = await apiClient.client.post("confd/1.1/outcalls", outcall);
      return res;
    } catch (e) {
      return e;
    }
  };

  const outcallCreate = async (outcall) => {
    const res = await outcallAdd(outcall);
    if (res.error) {
      return res;
    }

    if (outcall.trunks.length > 0) {
      const trunk = await outcallTrunksAssociate(res, outcall);
      if (trunk.error) {
        return trunk;
      }
    }

    if (outcall.call_permissions.length > 0) {
      for (const permission of outcall.call_permissions) {
        try {
          await outcallCallpermissionAssociate(res, permission);
        } catch (e) {
          console.error(`Failed to associate permission ${permission.id}`, e);
        }
      }
    }

    if (outcall.schedule) {
      const sche = await outcallScheduleAssociate(res, outcall.schedule);
      if (sche.error) {
        return sche;
      }
    }

    for (const extension of outcall.extensions) {
      try {
        const exten = await extensionCreate(extension);
        await outcallExtensionAssociate(res, exten);
      } catch (e) {
        return exten;
      }
    }

    return res;
  };

  const outcallEdit = async (outcall) => {
    const outcallId = outcall.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/outcalls/${outcallId}`, outcall);
      return res;
    } catch (e) {
      return e;
    }
  };

  const outcallUpdate = async (outcall, outcallSelected) => {
    const res = await outcallEdit(outcall);
    if (res.error) {
      return res;
    }
    // callpermissions
    const perms = await CallPermissionUpdate(outcall, outcallSelected);
    if (perms.error) {
      return perms;
    }
    // extensions
    const ext = await extensionsUpdate(outcall, outcallSelected);
    if(ext) {
      return ext
    }
      
    // schedule
    if (outcall.schedule && outcallSelected.schedules[0]) {
      // Si les IDs des schedules sont différents, effectuer les opérations de dissociation et d'association
      if (outcall.schedule.id !== outcallSelected.schedules[0].id) {
        const diss = await outcallScheduleDissociate(outcall, outcallSelected.schedules[0]);
        if (diss.error) {
          return diss;
        }
        const sche = await outcallScheduleAssociate(outcall, outcall.schedule);
        if (sche.error) {
          return sche;
        }
      }
    } else if (outcall.schedule && !outcallSelected.schedules[0]) {
      // Si seulement outcall a un schedule, associer ce schedule
      const asso = await outcallScheduleAssociate(outcall, outcall.schedule);
      if (asso.error) {
        return asso;
      }
    } else if (!outcall.schedule && outcallSelected.schedules[0]) {
      // Si seulement outcallSelected a un schedule, dissocier ce schedule
      const diss = await outcallScheduleDissociate(outcall, outcallSelected.schedules[0]);
      if (diss.error) {
        return diss;
      }
    }
    // trunks
    const trunks = await outcallTrunksAssociate(outcall, outcall);
    if (trunks.error) {
      return trunks;
    }

    // no error
    return res;
  };

  const outcallDelete = async (outcall) => {
    const outcallId = outcall.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/outcalls/${outcallId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const outcallRemove = async (outcall) => {
    await outcallDelete(outcall);
    for (const extension of outcall.extensions) {
      await extensionDelete(extension);
    }
  };

  const outcallCallpermissionAssociate = async (outcall, callpermission) => {
    const outcallId = outcall.id;
    const callpermissionId = callpermission.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/outcalls/${outcallId}/callpermissions/${callpermissionId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const outcallCallpermissionDissociate = async (outcall, callpermission) => {
    const outcallId = outcall.id;
    const callpermissionId = callpermission.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/outcalls/${outcallId}/callpermissions/${callpermissionId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const outcallExtensionAssociate = async (outcall, extension) => {
    const outcallId = outcall.id;
    const extensionId = extension.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/outcalls/${outcallId}/extensions/${extensionId}`, extension);
      return res;
    } catch (e) {
      return e
    }
  };

  const outcallExtensionDissociate = async (outcall, extension) => {
    const outcallId = outcall.id;
    const extensionId = extension.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/outcalls/${outcallId}/extensions/${extensionId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const outcallScheduleAssociate = async (outcall, schedule) => {
    const outcallId = outcall.id;
    const scheduleId = schedule.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/outcalls/${outcallId}/schedules/${scheduleId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const outcallScheduleDissociate = async (outcall, schedule) => {
    const outcallId = outcall.id;
    const scheduleId = schedule.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/outcalls/${outcallId}/schedules/${scheduleId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const outcallTrunksAssociate = async (outcall, trunks) => {
    const outcallId = outcall.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/outcalls/${outcallId}/trunks`, trunks);
      return res;
    } catch (e) {
      return e;
    }
  };

  const CallPermissionUpdate = async (newGroup, groupSelected) => {
    const newCallPermissions = newGroup.call_permissions.map((cp) => cp.id);
    const oldCallPermissions = groupSelected.call_permissions.map((cp) => cp.id);

    // Trouver les permissions à dissocier
    const permissionsToDissociate = groupSelected.call_permissions.filter((cp) => !newCallPermissions.includes(cp.id));

    // Trouver les permissions à associer
    const permissionsToAssociate = newGroup.call_permissions.filter((cp) => !oldCallPermissions.includes(cp.id));

    // Dissocier les permissions qui ne sont plus présentes
    for (const permission of permissionsToDissociate) {
      try {
        await outcallCallpermissionDissociate(newGroup, permission);
      } catch (e) {
        console.error(`Failed to dissociate permission ${permission.id}`, e);
      }
    }

    // Associer les nouvelles permissions
    for (const permission of permissionsToAssociate) {
      try {
        await outcallCallpermissionAssociate(newGroup, permission);
      } catch (e) {
        console.error(`Failed to associate permission ${permission.id}`, e);
      }
    }
    return true;
  };

  const extensionsUpdate = async (outcall, outcallSelected) => {
    const updateExten = outcall.extensions.map((ext) => ext.id);
    const oldExten = outcall.extensions.filter((ext) => ext.id);

    const extenToDissociate = outcallSelected.extensions.filter((ext) => !updateExten.includes(ext.id));
    //const extenToAssociate = outcall.extensions.filter((ext) => !oldExten.includes(ext.id));
    const extenToAssociate = outcall.extensions.filter((ext) => !ext.id);

    for (const extension of oldExten) {
      try {
        const result = await outcallExtensionAssociate(outcall, extension);
        if (result?.error) {
          return result;
        }
      } catch (e) {
        return e;
      }
    }

    for (const extension of extenToDissociate) {
      await outcallExtensionDissociate(outcall, extension);
      await extensionDelete(extension);
    }

    for (const extension of extenToAssociate) {
      try {
        const res = await extensionCreate(extension);
        extension.id = res.id;
        await outcallExtensionAssociate(outcall, extension);
      } catch (e) {
        return e;
      }
    }
  };

  return {
    outcalls,
    setOutcalls,
    outcallSelected,
    setOutcallSelected,
    outcallsGet,
    outcallsPageGet,
    outcallGet,
    outcallAdd,
    outcallCreate,
    outcallEdit,
    outcallUpdate,
    outcallDelete,
    outcallRemove,
    outcallCallpermissionAssociate,
    outcallCallpermissionDissociate,
    outcallExtensionAssociate,
    outcallExtensionDissociate,
    outcallScheduleAssociate,
    outcallScheduleDissociate,
    outcallTrunksAssociate,
  };
};
