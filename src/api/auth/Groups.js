import { useState } from "react";

export const useAuthGroups = ({ apiClient }) => {

  // values
  const [authGroups, setAuthGroups] = useState({});
  const [authGroupSelected, setAuthGroupSelected] = useState({});

  // functions
  const authGroupsGet = async () => {
    const res = await apiClient.client.get(`auth/0.1/groups?recurse=false`);
    setAuthGroups(res);
    return res;
  };

  const authGroupsPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const res = await apiClient.client.get(`auth/0.1/groups?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setAuthGroups(res);
      return res;
    } else {
      const res = await apiClient.client.get(`auth/0.1/groups?recurse=false&limit=${limit}&offset=${offset}`);
      setAuthGroups(res);
      return res;
    }
  }

  const authGroupGet = async (group) => {
    const groupUuid = group.uuid;
    try {
      const res = await apiClient.client.get(`auth/0.1/groups/${groupUuid}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const authGroupAdd = async (group) => {
    try {
      const res = await apiClient.client.post(`auth/0.1/groups`, group);
      return res;
    } catch (e) {
      return e;
    }
  };

  const authGroupCreate = async (authGroup, members, policies) => {
    const res = await authGroupAdd(authGroup);
    if (res.error) {
      return res;
    }

    for (const member of members) {
      const asso = await authGroupUserAssociate(res, member);
      if (asso.error) {
        return asso;
      }
    }

    for (const policy of policies) {
      const asso = await authGroupPolicyAssociate(res, policy);
      if (asso.error) {
        return asso;
      }
    }

    return res;
  };

  const authGroupEdit = async (group) => {
    const groupUuid = group.uuid;
    try {
      const res = await apiClient.client.put(`auth/0.1/groups/${groupUuid}`, group);
      return res;
    } catch (e) {
      return e;
    }
  };

  const authGroupUpdate = async (updatedAuthgroup, members, initialMembers, policies, initialPolicies) => {
    if(!updatedAuthgroup.system_managed) {
      // just edit only if not read_only nor system_managed
      const res = await authGroupEdit(updatedAuthgroup);
      if (res.error) {
        return res;
      }
    }

    // members
    // Dissociate members that are in initialMembers but not in members
    for (const initialMember of initialMembers) {
      if (!members.some((member) => member.uuid === initialMember.uuid)) {
        const diss = await authGroupUserDissociate(updatedAuthgroup, initialMember);
        if (diss.error) {
          return diss;
        }
      }
    }

    // Associate members that are in members but not in initialMembers
    for (const member of members) {
      if (!initialMembers.some((initialMember) => initialMember.uuid === member.uuid)) {
        const asso = await authGroupUserAssociate(updatedAuthgroup, member);
        if (asso.error) {
          return asso;
        }
      }
    }

    // Policies
    for (const initialPolicy of initialPolicies) {
      if (!policies.some((policy) => policy.uuid === initialPolicy.uuid)) {
        const diss = await authGroupPolicyDissociate(updatedAuthgroup, initialPolicy);
        if (diss.error) {
          return diss;
        }
      }
    }

    for (const policy of policies) {
      if (!initialPolicies.some((initialPolicy) => initialPolicy.uuid === policy.uuid)) {
        const asso = await authGroupPolicyAssociate(updatedAuthgroup, policy);
        if (asso.error) {
          return asso;
        }
      }
    }

    return updatedAuthgroup;
  };

  const authGroupDelete = async (group) => {
    const groupUuid = group.uuid;
    try {
      const res = await apiClient.client.delete(`auth/0.1/groups/${groupUuid}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const authGroupPoliciesGet = async (group) => {
    const groupUuid = group.uuid;
    try {
      const res = await apiClient.client.get(`auth/0.1/groups/${groupUuid}/policies`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const authGroupPolicyAssociate = async (group, policy) => {
    const groupUuid = group.uuid;
    const policyUuid = policy.uuid;
    try {
      const res = await apiClient.client.put(`auth/0.1/groups/${groupUuid}/policies/${policyUuid}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const authGroupPolicyDissociate = async (group, policy) => {
    const groupUuid = group.uuid;
    const policyUuid = policy.uuid;
    try {
      const res = await apiClient.client.delete(`auth/0.1/groups/${groupUuid}/policies/${policyUuid}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const authGroupUsersGet = async (group) => {
    const groupUuid = group.uuid;
    try {
      const res = await apiClient.client.get(`auth/0.1/groups/${groupUuid}/users`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const authGroupUserAssociate = async (group, user) => {
    const groupUuid = group.uuid;
    const userUuid = user.uuid;
    try {
      const res = await apiClient.client.put(`auth/0.1/groups/${groupUuid}/users/${userUuid}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const authGroupUserDissociate = async (group, user) => {
    const groupUuid = group.uuid;
    const userUuid = user.uuid;
    try {
      const res = await apiClient.client.delete(`auth/0.1/groups/${groupUuid}/users/${userUuid}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    authGroups,
    setAuthGroups,
    authGroupSelected,
    setAuthGroupSelected,
    authGroupsGet,
    authGroupsPageGet,
    authGroupGet,
    authGroupAdd,
    authGroupCreate,
    authGroupEdit,
    authGroupUpdate,
    authGroupDelete,
    authGroupPoliciesGet,
    authGroupPolicyAssociate,
    authGroupPolicyDissociate,
    authGroupUsersGet,
    authGroupUserAssociate,
    authGroupUserDissociate,
  };
};
