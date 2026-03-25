import { useState } from "react";

export const useSwitchboards = ({ apiClient }) => {

  // values
  const [switchboards, setSwitchboards] = useState({});
  const [switchboardSelected, setSwitchboardSelected] = useState({});

  // functions
  const switchboardsGet = async () => {
    const switchboardsList = await apiClient.client.get("confd/1.1/switchboards?recurse=false");
    setSwitchboards(switchboardsList);
    return switchboardsList;
  };

  const switchboardsPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const switchboardsList = await apiClient.client.get(`confd/1.1/switchboards?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setSwitchboards(switchboardsList);
      return switchboardsList;
    } else {
      const switchboardsList = await apiClient.client.get(`confd/1.1/switchboards?recurse=false&limit=${limit}&offset=${offset}`);
      setSwitchboards(switchboardsList);
      return switchboardsList;
    }
  }

  const switchboardGet = async (switchboardUuid) => {
    try {
      const res = await apiClient.client.get(`confd/1.1/switchboards/${switchboardUuid}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const switchboardAdd = async (switchboard) => {
    try {
      const res = await apiClient.client.post("confd/1.1/switchboards", switchboard);
      return res;
    } catch (e) {
      return e;
    }
  };

  const switchboardCreate = async (switchboard) => {
    const res = await switchboardAdd(switchboard);
    if (res.error) {
      return res;
    }
    const falls = await switchboardFallbacksEdit(res, switchboard.fallbacks);
    if (falls.error) {
      return falls;
    }
    const members = await switchboardMembersEdit(res, switchboard.members);
    if (members.error) {
      return members;
    }
    return res;
  };

  const switchboardEdit = async (switchboard) => {
    const switchboardUuid = switchboard.uuid;
    try {
      const res = await apiClient.client.put(`confd/1.1/switchboards/${switchboardUuid}`, switchboard);
      return res;
    } catch (e) {
      return e;
    }
  };

  const switchboardUpdate = async (switchboard) => {
    const res = await switchboardEdit(switchboard);
    if (res.error) {
      return res;
    }
    const falls = await switchboardFallbacksEdit(switchboard, switchboard.fallbacks);
    if (falls.error) {
      return falls;
    }
    const members = await switchboardMembersEdit(switchboard, switchboard.members);
    if (members.error) {
      return members;
    }
    return res;
  };

  const switchboardDelete = async (switchboard) => {
    const switchboardUuid = switchboard.uuid;
    try {
      const res = await apiClient.client.delete(`confd/1.1/switchboards/${switchboardUuid}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const switchboardFallbacksGet = async (switchboard) => {
    const switchboardUuid = switchboard.uuid;
    try {
      const res = await apiClient.client.get(`confd/1.1/switchboards/${switchboardUuid}/fallbacks`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const switchboardFallbacksEdit = async (switchboard, fallbacks) => {
    const switchboardUuid = switchboard.uuid;
    try {
      const res = await apiClient.client.put(`confd/1.1/switchboards/${switchboardUuid}/fallbacks`, fallbacks);
      return res;
    } catch (e) {
      return e;
    }
  };

  const switchboardMembersEdit = async (switchboard, members) => {
    const switchboardUuid = switchboard.uuid;
    try {
      const res = await apiClient.client.put(`confd/1.1/switchboards/${switchboardUuid}/members/users`, members);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    switchboards,
    setSwitchboards,
    switchboardSelected,
    setSwitchboardSelected,
    switchboardsGet,
    switchboardsPageGet,
    switchboardGet,
    switchboardAdd,
    switchboardCreate,
    switchboardEdit,
    switchboardUpdate,
    switchboardDelete,
    switchboardFallbacksGet,
    switchboardFallbacksEdit,
    switchboardMembersEdit,
  };
};
