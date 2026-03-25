import { useState } from "react";

export const useProvdDevices = ({ apiClient }) => {

  // values
  const [provdDevmgr, setProvdDevmgr] = useState({});
  const [provdDevmgrDevices, setProvdDevmgrDevices] = useState({});

  // functions
  const provdDevmgrGet = async () => {
    const res = await apiClient.client.get(`provd/0.2/dev_mgr`);
    setProvdDevmgr(res);
    return res;
  };

  const provdDevmgrDevicesGet = async () => {
    const res = await apiClient.client.get(`provd/0.2/dev_mgr/devices?recurse=false`);
    setProvdDevmgrDevices(res);
    return res;
  };

  const provdDevmgrDeviceGet = async (device) => {
    const deviceId = device.id;
    try {
      const res = await apiClient.client.get(`provd/0.2/dev_mgr/devices/${deviceId}`)
      return res
    } catch (e) {
      return e
    }
  };

  const provdDevmgrDeviceAdd = async (device) => {
    try {
      const res = await apiClient.client.post(`provd/0.2/dev_mgr/devices`, device)
      return res
    } catch (e) {
      return e
    }
  };

  const provdDevmgrDeviceEdit = async (device) => {
    const deviceId = device.id;
    try {
      const res = await apiClient.client.put(`provd/0.2/dev_mgr/devices/${deviceId}`, device)
      return res
    } catch (e) {
      return e
    }
  };

  const provdDevmgrDeviceDelete = async (device) => {
    const deviceId = device.id;
    try {
      const res = await apiClient.client.delete(`provd/0.2/dev_mgr/devices/${deviceId}`)
      return res
    } catch (e) {
      return e
    }
  };

  const provdDevmgrDhcpInfo = async (dhcpinfo) => {
    try {
      const res = await apiClient.client.post(`provd/0.2/dev_mgr/dhcpinfo`, dhcpinfo)
      return res
    } catch (e) {
      return e
    }
  }

  const provdDevmgrReconfigure = async (device) => {
    try {
      const res = await apiClient.client.post(`provd/0.2/dev_mgr/reconfigure`, device)
      return res
    } catch (e) {
      return e
    }
  }

  const provdDevmgrSynchronize = async (device) => {
    try {
      const res = await apiClient.client.post(`provd/0.2/dev_mgr/synchronize`, device)
      return res
    } catch (e) {
      return e
    }
  }

  const provdDevmgrSynchronizeGet = async (operation) => {
    const operationId = operation.id
    try {
      const res = await apiClient.client.get(`provd/0.2/dev_mgr/synchronize/${operationId}`)
      return res
    } catch (e) {
      return e
    }
  }

  const provdDevmgrSynchronizeStop = async (operation) => {
    const operationId = operation.id
    try {
      const res = await apiClient.client.delete(`provd/0.2/dev_mgr/synchronize/${operationId}`)
      return res
    } catch (e) {
      return e
    }
  }

  return {
    provdDevmgr,
    setProvdDevmgr,
    provdDevmgrDevices,
    setProvdDevmgrDevices,
    provdDevmgrGet,
    provdDevmgrDevicesGet,
    provdDevmgrDeviceGet,
    provdDevmgrDeviceAdd,
    provdDevmgrDeviceEdit,
    provdDevmgrDeviceDelete,
    provdDevmgrDhcpInfo,
    provdDevmgrReconfigure,
    provdDevmgrSynchronize,
    provdDevmgrSynchronizeGet,
    provdDevmgrSynchronizeStop
  };
};
