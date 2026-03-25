import { useState } from "react";

export const useExternal = ({ apiClient }) => {

  // values
  const [externals, setExternals] = useState({});
  const [externalSelected, setExternalSelected] = useState({});
  const [externalServices, setExternalServices] = useState([]);

  // functions
  const externalsGet = async () => {
    const services = ["google", "microsoft", "mobile"];
    const configList = [];
    const externalServicesSet = new Set();

    for (const service of services) {
      const config = await externalGet(service);
      if (config.error) {
        externalServicesSet.add(service);
      } else {
        configList.push({ ...config, type: service });
      }
    }
    const configObject = {
      total: configList.length,
      items: configList,
    };

    setExternals(configObject);
    setExternalServices(Array.from(externalServicesSet));
    return configObject;
  };

  const externalGet = async (auth_type) => {
    try {
      const res = await apiClient.client.get(`auth/0.1/external/${auth_type}/config`);
      return res;
    } catch (e) {
      return { error: e.message || "An error occurred" };
    }
  };

  const externalAdd = async (auth_type, config) => {
    try {
      const res = await apiClient.client.post(`auth/0.1/external/${auth_type}/config`, config);
      return res;
    } catch (e) {
      return e;
    }
  };

  const externalEdit = async (auth_type, config) => {
    try {
      const res = await apiClient.client.put(`auth/0.1/external/${auth_type}/config`, config);
      return res;
    } catch (e) {
      return e;
    }
  };

  const externalDelete = async (external) => {
    const auth_type = external.type;
    try {
      const res = await apiClient.client.delete(`auth/0.1/external/${auth_type}/config`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const externalUsersGet = async (auth_type) => {
    const res = await apiClient.client.get(`auth/0.1/external/${auth_type}/users?recurse=false`);
    return res;
  };

  return {
    externals,
    setExternals,
    externalSelected,
    setExternalSelected,
    externalServices,
    setExternalServices,
    externalsGet,
    externalGet,
    externalAdd,
    externalEdit,
    externalDelete,
    externalUsersGet,
  };
};
