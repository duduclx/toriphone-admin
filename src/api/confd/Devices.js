import { useState } from "react";

export const useDevices = ({ apiClient }) => {

  // values
  const [devices, setDevices] = useState({});
  const [deviceSelected, setDeviceSelected] = useState({});
  const [devicesUnallocated, setDevicesUnallocated] = useState({})

  /**
   * Devices Get
   * @returns 
   */
  const devicesGet = async () => {
    const res = await apiClient.client.get("confd/1.1/devices?recurse=false");
    setDevices(res);
    return res;
  };

  /**
   * Devices Page Get
   * @param {*} limit 
   * @param {*} offset 
   * @returns 
   */
  const devicesPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const res = await apiClient.client.get(`confd/1.1/devices?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setDevices(res);
    return res;
    } else {
      const res = await apiClient.client.get(`confd/1.1/devices?recurse=false&limit=${limit}&offset=${offset}`);
      setDevices(res);
    return res;
    }
  }

  /**
   * Devices Unallocated Get
   * @returns 
   */
  const devicesUnallocatedGet = async () => {
    try {
      const res = await apiClient.client.get(`confd/1.1/devices/unallocated`);
      setDevicesUnallocated(res)
      return res;
    } catch (e) {
      return e;
    }
  }

  /**
   * Devices Unallocated Add
   * @param {*} device 
   * @returns 
   */
  const devicesUnallocatedAdd = async (device) => {
    const deviceId = device.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/devices/unallocated/${deviceId}`);
      return res;
    } catch (e) {
      return e;
    }
  }

  /**
   * Device Add
   * @param {*} device 
   * @returns 
   */
  const deviceAdd = async (device) => {
    try {
      const res = await apiClient.client.post(`confd/1.1/devices`, device);
      return res;
    } catch (e) {
      return e;
    }
  };

  /**
   * Device Get
   * @param {*} device 
   * @returns 
   */
  const deviceGet = async (device) => {
    const deviceId = device.id;
    try {
      const res = await apiClient.client.get(`confd/1.1/devices/${deviceId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  /**
   * Device Edit
   * @param {*} device 
   * @returns 
   */
  const deviceEdit = async (device) => {
    const deviceId = device.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/devices/${deviceId}`, device);
      return res;
    } catch (e) {
      return e;
    }
  };

  /**
   * Device Delete
   * @param {*} device 
   * @returns 
   */
  const deviceDelete = async (device) => {
    const deviceId = device.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/devices/${deviceId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  /**
   * Device Reset Autoprov
   * @param {*} device 
   * @returns 
   */
  const deviceResetAutoprov = async (device) => {
    const deviceId = device.id;
    try {
      const res = await apiClient.client.get(`confd/1.1/devices/${deviceId}/autoprov`);
      return res;
    } catch (e) {
      return e;
    }
  }

  /**
   * Device Lines Get
   * @param {*} device 
   * @returns 
   */
  const deviceLinesGet = async (device) => {
    const deviceId = device.id;
    try {
      const res = await apiClient.client.get(`confd/1.1/devices/${deviceId}/lines`);
      return res;
    } catch (e) {
      return e;
    }
  }

  /**
   * Device Synchronize
   * @param {*} device 
   * @returns 
   */
  const deviceSynchronize = async (device) => {
    const deviceId = device.id;
    try {
      const res = await apiClient.client.get(`confd/1.1/devices/${deviceId}/synchronize`);
      return res;
    } catch (e) {
      return e;
    }
  }

  return {
    devices,
    setDevices,
    deviceSelected,
    setDeviceSelected,
    devicesUnallocated,
    setDevicesUnallocated,
    devicesGet,
    devicesPageGet,
    devicesUnallocatedGet,
    devicesUnallocatedAdd,
    deviceAdd,
    deviceGet,
    deviceEdit,
    deviceDelete,
    deviceResetAutoprov,
    deviceLinesGet,
    deviceSynchronize
  };
};
