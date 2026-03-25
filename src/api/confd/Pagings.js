import { useState } from "react";

export const usePagings = ({ apiClient }) => {

  // values
  const [pagings, setPagings] = useState({});
  const [pagingSelected, setPagingSelected] = useState({});

  // functions
  const pagingsGet = async () => {
    const res = await apiClient.client.get("confd/1.1/pagings?recurse=false");
    setPagings(res);
    return res;
  };

  const pagingPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const res = await apiClient.client.get(`confd/1.1/pagings?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setPagings(res);
      return res;
    } else {
      const res = await apiClient.client.get(`confd/1.1/pagings?recurse=false&limit=${limit}&offset=${offset}`);
      setPagings(res);
      return res;
    }
  }

  const pagingGet = async (pagingId) => {
    try {
      const res = await apiClient.client.get(`confd/1.1/pagings/${pagingId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const pagingAdd = async (paging) => {
    try {
      const res = await apiClient.client.post("confd/1.1/pagings", paging);
      return res;
    } catch (e) {
      return e;
    }
  };

  const pagingCreate = async (paging) => {
    const res = await pagingAdd(paging);
    if (res.error) {
      return res;
    }
    const callers = await pagingCallersEdit(res, paging.callers);
    if (callers.error) {
      return callers;
    }
    const members = await pagingMembersEdit(res, paging.members);
    if (members.error) {
      return members;
    }
    return res;
  };

  const pagingEdit = async (paging) => {
    const pagingId = paging.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/pagings/${pagingId}`, paging);
      return res;
    } catch (e) {
      return e;
    }
  };

  const pagingUpdate = async (paging) => {
    const res = await pagingEdit(paging);
    if (res.error) {
      return res;
    }
    const callers = await pagingCallersEdit(paging, paging.callers);
    if (callers.error) {
      return callers;
    }
    const members = await pagingMembersEdit(paging, paging.members);
    if (members.error) {
      return members;
    }
    return res;
  };

  const pagingDelete = async (paging) => {
    const pagingId = paging.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/pagings/${pagingId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const pagingCallersEdit = async (paging, callers) => {
    const pagingId = paging.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/pagings/${pagingId}/callers/users`, callers);
      return res;
    } catch (e) {
      return e;
    }
  };

  const pagingMembersEdit = async (paging, members) => {
    const pagingId = paging.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/pagings/${pagingId}/members/users`, members);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    pagings,
    setPagings,
    pagingSelected,
    setPagingSelected,
    pagingsGet,
    pagingPageGet,
    pagingGet,
    pagingAdd,
    pagingCreate,
    pagingEdit,
    pagingUpdate,
    pagingDelete,
    pagingCallersEdit,
    pagingMembersEdit,
  };
};
