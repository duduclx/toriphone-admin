import { useState } from "react";

export const useProvdConfigs = ({ apiClient }) => {

  // values
  const [provdCfgmgr, setProvdCgfmgr] = useState({});
  const [provdCfgmgrConfig, setProvdCfmgrConfig] = useState({});

  // functions
  const provdConfigMgrGet = async () => {
    const res = await apiClient.client.get("provd/0.2/cfg_mgr");
    setProvdCgfmgr(res);
    return res;
  };

  const provdConfigMgrAutocreate = async (config) => {
    try {
      const res = await apiClient.client.post(`provd/0.2/cfg_mgr/autocreate`, config);
      return res;
    } catch (e) {
      return e;
    }
  };

  const provdConfigMgrConfigsGet = async () => {
    apiClient.client.setFetchOptions({
      headers: {
        "Accept": "application/vnd.proformatique.provd+json",
      },
    })
    const res = await apiClient.client.get("provd/0.2/cfg_mgr/configs");
    setProvdCfmgrConfig(res);
    return res;
  };

  const provdConfigMgrConfigGet = async (config) => {
    //const configId = config.id;
    apiClient.client.setFetchOptions({ headers: { Accept: "application/vnd.proformatique.provd+json" } });
    try {
      const res = await apiClient.client.get(`provd/0.2/cfg_mgr/configs/${config}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const provdConfigMgrConfigGetRaw = async (config) => {
    //const configId = config.id;
    apiClient.client.setFetchOptions({ headers: { Accept: "application/vnd.proformatique.provd+json" } });
    try {
      const res = await apiClient.client.get(`provd/0.2/cfg_mgr/configs/${config}/raw`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const provdConfigMgrConfigAdd = async (config) => {
    try {
      const res = await apiClient.client.post(`provd/0.2/cfg_mgr/configs`, config);
      return res;
    } catch (e) {
      return e;
    }
  };

  const provdConfigMgrConfigEdit = async (config) => {
    const configId = config.config.id;
    apiClient.client.setFetchOptions({
      headers: {
        "Accept": "application/vnd.proformatique.provd+json",
        "Content-Type": "application/vnd.proformatique.provd+json",
      },
    });
    try {
      const res = await apiClient.client.put(`provd/0.2/cfg_mgr/configs/${configId}`, config);
      return res;
    } catch (e) {
      return e;
    }
  };

  const provdConfigMgrConfigDelete = async (config) => {
    const configId = config.id;
    try {
      const res = await apiClient.client.delete(`provd/0.2/cfg_mgr/configs/${configId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    provdCfgmgr,
    setProvdCgfmgr,
    provdCfgmgrConfig,
    setProvdCfmgrConfig,
    provdConfigMgrGet,
    provdConfigMgrAutocreate,
    provdConfigMgrConfigsGet,
    provdConfigMgrConfigGet,
    provdConfigMgrConfigGetRaw,
    provdConfigMgrConfigAdd,
    provdConfigMgrConfigEdit,
    provdConfigMgrConfigDelete,
  };
};
