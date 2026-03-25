import { useState } from "react";

export const useCallPermissions = ({ apiClient }) => {

  // values
  const [callPermissions, setCallPermissions] = useState({});
  const [callPermissionSelected, setCallPermissionSelected] = useState({});

  // function
  const callPermissionsGet = async () => {
    const callPermissionsList = await apiClient.client.get("confd/1.1/callpermissions?recurse=false");
    setCallPermissions(callPermissionsList);
    return callPermissionsList;
  };

  const callPermissionsPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const callPermissionsList = await apiClient.client.get(`confd/1.1/callpermissions?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setCallPermissions(callPermissionsList);
      return callPermissionsList;
    } else {
      const callPermissionsList = await apiClient.client.get(`confd/1.1/callpermissions?recurse=false&limit=${limit}&offset=${offset}`);
      setCallPermissions(callPermissionsList);
      return callPermissionsList;
    }
  }

  const callPermissionAdd = async (callpermission) => {
    try {
      const res = await apiClient.client.post("confd/1.1/callpermissions", callpermission);
      return res;
    } catch (e) {
      return e;
    }
  };

  const callPermissionEdit = async (callpermission) => {
    const callpermissionId = callpermission.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/callpermissions/${callpermissionId}`, callpermission);
      return res;
    } catch (e) {
      return e;
    }
  };

  const callPermissionDelete = async (callpermission) => {
    const callpermissionId = callpermission.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/callpermissions/${callpermissionId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    callPermissions,
    setCallPermissions,
    callPermissionSelected,
    setCallPermissionSelected,
    callPermissionsGet,
    callPermissionsPageGet,
    callPermissionAdd,
    callPermissionEdit,
    callPermissionDelete,
  };
};
