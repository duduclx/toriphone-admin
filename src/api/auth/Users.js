import { useState } from "react";

export const useAuthUsers = ({ apiClient }) => {

  // values
  const [authUsers, setAuthUsers] = useState({});
  const [authUserSelected, setAuthUserSelected] = useState({});

  // functions
  const authUsersGet = async () => {
    const res = await apiClient.client.get(`auth/0.1/users?recurse=false`);
    setAuthUsers(res);
    return res;
  };

  const authUsersPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const res = await apiClient.client.get(`auth/0.1/users?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setAuthUsers(res);
      return res;
    } else {
      const res = await apiClient.client.get(`auth/0.1/users?recurse=false&limit=${limit}&offset=${offset}`);
      setAuthUsers(res);
      return res;
    }
  }

  const authUserSearch = async (term) => {
    try {
      const res = await apiClient.client.get(`auth/0.1/users?search=${term}&recurse=false`);
      return res
    } catch (e) {
      return e
    }
  }

  const authUserGet = async (user) => {
    const userUuid = user.uuid;
    try {
      const res = await apiClient.client.get(`auth/0.1/users/${userUuid}`);
      return res;
    } catch (e) {
      return e
    }
  };

  const authUserAdd = async (user) => {
    try {
      const res = await apiClient.client.post(`auth/0.1/users`, user);
      return res;
    } catch (e) {
      return e
    }
  };

  const authUserCreate = async (user, policies, groups) => {
    const created = await authUserAdd(user);
    // email
    await authUserEmailEdit(created, user);
    // policies
    for (const policy of policies) {
      await authUserPoliciesAssociate(created, policy);
    }
    // groups
    for (const group of groups) {
      await authGroupUserAssociate(group, created);
    }
    return created
  };

  const authUserEdit = async (user) => {
    const userUuid = user.uuid;
    try {
      const res = await apiClient.client.put(`auth/0.1/users/${userUuid}`, user);
      return res
    } catch (e) {
      return e
    }
  };

  const authUserDelete = async (user) => {
    const userUuid = user.uuid;
    try {
      const res = await apiClient.client.delete(`auth/0.1/users/${userUuid}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const authUserEmailEdit = async (user, emails) => {
    const userUuid = user.uuid;
    try {
      const res = await apiClient.client.put(`auth/0.1/users/${userUuid}/emails`, emails);
      return res
    } catch (e) {
      return e
    }
  };

  const authUserUpdate = async (user, policies, initialPolicies, groups, initialGroups) => {
    const res = await authUserEdit(user);

    // email
    const mail = await authUserEmailEdit(user, user);
    if (mail.error) {
      return mail
    }

    // Policies
    for (const initialPolicy of initialPolicies) {
      if (!policies.some((item) => item.uuid === initialPolicy.uuid)) {
        await authUserPoliciesDissociate(user, initialPolicy);
      }
    }

    for (const policy of policies) {
      if (!initialPolicies.some((item) => item.uuid === policy.uuid)) {
        await authUserPoliciesAssociate(user, policy);
      }
    }

    // groups
    for (const initialGroup of initialGroups) {
      if (!groups.some((item) => item.uuid === initialGroup.uuid)) {
        await authGroupUserDissociate(initialGroup, user);
      }
    }

    for (const group of groups) {
      if (!initialGroups.some((item) => item.uuid === group.uuid)) {
        await authGroupUserAssociate(group, user);
      }
    }

    return res;
  };

  const authUserEmailConfirmGet = async (user, email) => {
    const userUuid = user.uuid;
    const emailUuid = email.uuid;
    try {
      const res = await apiClient.client.get(`auth/0.1/users/${userUuid}/emails/${emailUuid}/confirm`);
      return res;
    } catch (e) {
      return e
    }
  };

  const authUserExternalGet = async (user) => {
    const userUuid = user.uuid;
    try {
      const res = await apiClient.client.get(`auth/0.1/users/${userUuid}/external`);
      return res;
    } catch (e) {
      return e
    }
  };

  const authUserExternalGoogleGet = async (user) => {
    const userUuid = user.uuid;
    try {
      const res = await apiClient.client.get(`auth/0.1/users/${userUuid}/external/google`);
      return res;
    } catch (e) {
      return e
    }
  };

  const authUserExternalGoogleAdd = async (user, scope) => {
    const userUuid = user.uuid;
    try {
      const res = await apiClient.client.post(`auth/0.1/users/${userUuid}/external/google`, scope);
      return res;
    } catch (e) {
      return e
    }
  };

  const authUserExternalGoogleDelete = async (user) => {
    const userUuid = user.uuid;
    try {
      const res = await apiClient.client.delete(`auth/0.1/users/${userUuid}/external/google`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const authUserExternalMicrosoftGet = async (user) => {
    const userUuid = user.uuid;
    try {
      const res = await apiClient.client.get(`auth/0.1/users/${userUuid}/external/microsoft`);
      return res;
    } catch (e) {
      return e
    }
  };

  const authUserExternalMicrosoftAdd = async (user, scope) => {
    const userUuid = user.uuid;
    try {
      const res = await apiClient.client.post(`auth/0.1/users/${userUuid}/external/microsoft`, scope);
      return res;
    } catch (e) {
      return e
    }
  };

  const authUserExternalMicrosoftDelete = async (user) => {
    const userUuid = user.uuid;
    try {
      const res = await apiClient.client.delete(`auth/0.1/users/${userUuid}/external/microsoft`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const authUserExternalMobileGet = async (user) => {
    const userUuid = user.uuid;
    try {
      const res = await apiClient.client.get(`auth/0.1/users/${userUuid}/external/mobile`);
      return res;
    } catch (e) {
      return e
    }
  };

  const authUserExternalMobileAdd = async (user, scope) => {
    const userUuid = user.uuid;
    try {
      const res = await apiClient.client.post(`auth/0.1/users/${userUuid}/external/mobile`, scope);
      return res;
    } catch (e) {
      return e
    }
  };

  const authUserExternalMobileDelete = async (user) => {
    const userUuid = user.uuid;
    try {
      const res = await apiClient.client.delete(`auth/0.1/users/${userUuid}/external/mobile`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const authUserExternalMobileSenderIdGet = async (user) => {
    const userUuid = user.uuid;
    try {
      const res = await apiClient.client.get(`auth/0.1/users/${userUuid}/external/mobile/sender_id`);
      return res;
    } catch (e) {
      return e
    }
  };

  const authUserGroupsGet = async (user) => {
    const userUuid = user.uuid;
    try {
      const res = await apiClient.client.get(`auth/0.1/users/${userUuid}/groups`);
      return res;
    } catch (e) {
      return e
    }
  };

  const authUserPasswordEdit = async (user, password) => {
    const userUuid = user.uuid;
    try {
      const res = await apiClient.client.put(`auth/0.1/users/${userUuid}/password`, password);
      return res
    } catch (e) {
      return e
    }
  };

  const authUserPoliciesGet = async (user) => {
    const userUuid = user.uuid;
    try {
      const res = await apiClient.client.get(`auth/0.1/users/${userUuid}/policies`);
      return res;
    } catch (e) {
      return e
    }
  };

  const authUserPoliciesAssociate = async (user, policy) => {
    const userUuid = user.uuid;
    const policyUuid = policy.uuid;
    try {
      const res = await apiClient.client.put(`auth/0.1/users/${userUuid}/policies/${policyUuid}`);
      return res
    } catch (e) {
      return e
    }
  };

  const authUserPoliciesDissociate = async (user, policy) => {
    const userUuid = user.uuid;
    const policyUuid = policy.uuid;
    try {
      const res = await apiClient.client.delete(`auth/0.1/users/${userUuid}/policies/${policyUuid}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const authUserSessionsGet = async (user) => {
    const userUuid = user.uuid;
    try {
      const res = await apiClient.client.get(`auth/0.1/users/${userUuid}/sessions`);
      return res;
    } catch (e) {
      return e
    }
  };

  const authUserSessionDelete = async (user, session) => {
    const userUuid = user.uuid;
    const sessionUuid = session.uuid;
    try {
      const res = await apiClient.client.delete(`auth/0.1/users/${userUuid}/sessions/${sessionUuid}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const authUserTokenGet = async (user) => {
    const userUuid = user.uuid;
    try {
      const res = await apiClient.client.get(`auth/0.1/users/${userUuid}/tokens`);
      return res;
    } catch (e) {
      return e
    }
  };

  const authUserTokenDelete = async (user, client) => {
    const userUuid = user.uuid;
    const clientId = client.id;
    try {
      const res = await apiClient.client.delete(`auth/0.1/users/${userUuid}/tokens/${clientId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const authUserPasswordResetGet = async (user) => {
    /* must be 
    { type: 'username or email or login',
     value: 'the value for the type'
    }
    */
   try {
     const res = await apiClient.client.get(`auth/0.1/users/password/reset?${user.type}=${user.value}`)
     return res
   } catch (e) {
    return e
   }
  }

  const authUserPasswordReset = async (user, password) => {
    const userUuid = user.uuid;
    try {
      const res = await apiClient.client.post(`auth/0.1/users/password/reset?${userUuid}=${password}`);
      return res;
    } catch (e) {
      return e
    }
  }

  const authUserRegister = async (user) => {
    try {
      const res = await apiClient.client.post(`auth/0.1/users/register`, user);
      return res;
    } catch (e) {
      return e
    }
  }

  return {
    authUsers,
    setAuthUsers,
    authUserSelected,
    setAuthUserSelected,
    authUsersGet,
    authUsersPageGet,
    authUserSearch,
    authUserGet,
    authUserAdd,
    authUserCreate,
    authUserEdit,
    authUserUpdate,
    authUserDelete,
    authUserEmailEdit,
    authUserEmailConfirmGet,
    authUserExternalGet,
    authUserExternalGoogleGet,
    authUserExternalGoogleAdd,
    authUserExternalGoogleDelete,
    authUserExternalMicrosoftGet,
    authUserExternalMicrosoftAdd,
    authUserExternalMicrosoftDelete,
    authUserExternalMobileGet,
    authUserExternalMobileAdd,
    authUserExternalMobileDelete,
    authUserExternalMobileSenderIdGet,
    authUserGroupsGet,
    authUserPasswordEdit,
    authUserPoliciesGet,
    authUserPoliciesAssociate,
    authUserPoliciesDissociate,
    authUserSessionsGet,
    authUserSessionDelete,
    authUserTokenGet,
    authUserTokenDelete,
    authUserPasswordResetGet,
    authUserPasswordReset,
    authUserRegister
  };
};
