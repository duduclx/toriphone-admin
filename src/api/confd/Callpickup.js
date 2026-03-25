import { useState } from "react";

export const useCallpickup = ({ apiClient }) => {

  // values
  const [callpickups, setCallpickups] = useState({});
  const [callpickupSelected, setCallpickupSelected] = useState({});

  // function
  const callpickupsGet = async () => {
    const res = await apiClient.client.get("confd/1.1/callpickups?recurse=false");
    setCallpickups(res);
    return res
  };

  const callpickupPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const res = await apiClient.client.get(`confd/1.1/callpickups?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setCallpickups(res);
      return res
    } else {
      const res = await apiClient.client.get(`confd/1.1/callpickups?recurse=false&limit=${limit}&offset=${offset}`);
      setCallpickups(res);
      return res
    }
  }

  const callpickupGet = async (callpickupId) => {
    try {
      const res = await apiClient.client.get(`confd/1.1/callpickups/${callpickupId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const callpickupAdd = async (callpickup) => {
    try {
      const res = await apiClient.client.post("confd/1.1/callpickups", callpickup);
      return res;
    } catch (e) {
      return e;
    }
  };

  const callpickupCreate = async (callpickup) => {
    const res = await callpickupAdd(callpickup);
    if (callpickup.interceptors.groups.length > 0) {
      const intgrp = await callpickupInterceptorsGroupsEdit(res, callpickup.interceptors);
      if (intgrp.error) {
        return intgrp;
      }
    }
    if (callpickup.interceptors.users.length > 0) {
      const intUsers = await callpickupInterceptorsUsersEdit(res, callpickup.interceptors);
      if (intUsers.error) {
        return intUsers;
      }
    }
    if (callpickup.targets.groups.length > 0) {
      const trgtgrp = await callpickupTargetsGroupsEdit(res, callpickup.targets);
      if (trgtgrp.error) {
        return trgtgrp;
      }
    }
    if (callpickup.targets.users.length > 0) {
      const trgtUsers = await callpickupTargetsUsersEdit(res, callpickup.targets);
      if (trgtUsers.error) {
        return trgtUsers;
      }
    }
    return res;
  };

  const callpickupEdit = async (callpickup) => {
    const callpickupId = callpickup.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/callpickups/${callpickupId}`, callpickup);
      return res;
    } catch (e) {
      return e;
    }
  };

  const callpickupUpdate = async (callpickup) => {
    const res = await callpickupEdit(callpickup);
    if(res.error) {
      return res
    }
    const intgrp = await callpickupInterceptorsGroupsEdit(callpickup, callpickup.interceptors);
    if (intgrp.error) {
      return intgrp;
    }
    const intUsers = await callpickupInterceptorsUsersEdit(callpickup, callpickup.interceptors);
    if (intUsers.error) {
      return intUsers;
    }
    const trgtgrp = await callpickupTargetsGroupsEdit(callpickup, callpickup.targets);
    if (trgtgrp.error) {
      return trgtgrp;
    }
    const trgtUsers = await callpickupTargetsUsersEdit(callpickup, callpickup.targets);
    if (trgtUsers.error) {
      return trgtUsers;
    }
    return callpickup;
  };

  const callpickupDelete = async (callpickup) => {
    const callpickupId = callpickup.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/callpickups/${callpickupId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const callpickupInterceptorsGroupsEdit = async (callpickup, groups) => {
    const callpickupId = callpickup.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/callpickups/${callpickupId}/interceptors/groups`, groups);
      return res;
    } catch (e) {
      return e;
    }
  };

  const callpickupInterceptorsUsersEdit = async (callpickup, users) => {
    const callpickupId = callpickup.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/callpickups/${callpickupId}/interceptors/users`, users);
      return res;
    } catch (e) {
      return e;
    }
  };

  const callpickupTargetsGroupsEdit = async (callpickup, groups) => {
    const callpickupId = callpickup.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/callpickups/${callpickupId}/targets/groups`, groups);
      return res;
    } catch (e) {
      return e;
    }
  };

  const callpickupTargetsUsersEdit = async (callpickup, users) => {
    const callpickupId = callpickup.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/callpickups/${callpickupId}/targets/users`, users);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    callpickups,
    setCallpickups,
    callpickupSelected,
    setCallpickupSelected,
    callpickupsGet,
    callpickupPageGet,
    callpickupGet,
    callpickupAdd,
    callpickupCreate,
    callpickupEdit,
    callpickupUpdate,
    callpickupDelete,
    callpickupInterceptorsGroupsEdit,
    callpickupInterceptorsUsersEdit,
    callpickupTargetsGroupsEdit,
    callpickupTargetsUsersEdit,
  };
};
