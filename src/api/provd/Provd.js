import { useState } from "react";

export const useProvdConfig = ({ apiClient }) => {

  // values
  const [provdConfigs, setProvdConfigs] = useState({});
  const [provdConfigSelected, setProvdConfigSelected] = useState({}); // unused ?

  // functions
  const provdConfigGet = async () => {
    apiClient.client.setFetchOptions({ headers: { Accept: "application/vnd.proformatique.provd+json" } });
    const res = await apiClient.client.get(`provd/0.2/configure`);
    setProvdConfigs(res);
    return res;
  };

  const provdConfigParamGet = async (param) => {
    const paramId = param.id;
    try {
      const res = await apiClient.client.get(`provd/0.2/configure/${paramId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const provdConfigParamEdit = async (param) => {
    apiClient.client.setFetchOptions({
      headers: {
        "Accept": "application/vnd.proformatique.provd+json",
        "Content-Type": "application/vnd.proformatique.provd+json",
      },
    });
    const paramId = param.id;
    try {
      const res = await apiClient.client.put(`provd/0.2/configure/${paramId}`, {param: param});
      return res
    } catch (e) {
      return e;
    }
  };

  const provdConfigFtpProxyUpdate = async (param) => {
    try {
      const res = await apiClient.client.put(`provd/0.2/configure/ftp_proxy`, param);
      return res;
    } catch (e) {
      return e;
    }
  };

  const provdConfigHttpProxyUpdate = async (param) => {
    try {
      const res = await apiClient.client.put(`provd/0.2/configure/http_proxy`, param);
      return res;
    } catch (e) {
      return e;
    }
  };

  const provdConfigHttpsProxyUpdate = async (param) => {
    try {
      const res = await apiClient.client.put(`provd/0.2/configure/https_proxy`, param);
      return res;
    } catch (e) {
      return e;
    }
  };

  const provdConfigLocaleUpdate = async (param) => {
    try {
      const res = await apiClient.client.put(`provd/0.2/configure/locale`, param);
      return res;
    } catch (e) {
      return e;
    }
  };

  const provdConfigNatUpdate = async (param) => {
    try {
      const res = await apiClient.client.put(`provd/0.2/configure/NAT`, param);
      return res;
    } catch (e) {
      return e;
    }
  };

  const provdConfigPluginServerUpdate = async (param) => {
    try {
      const res = await apiClient.client.put(`provd/0.2/configure/plugin_server`, param);
      return res;
    } catch (e) {
      return e;
    }
  };

  const provdConfigProvisioningKeyUpdate = async (param) => {
    try {
      const res = await apiClient.client.put(`provd/0.2/configure/provisioning_key`, param);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    provdConfigs,
    setProvdConfigs,
    provdConfigSelected,
    setProvdConfigSelected,
    provdConfigGet,
    provdConfigParamGet,
    provdConfigParamEdit,
    provdConfigFtpProxyUpdate,
    provdConfigHttpProxyUpdate,
    provdConfigHttpsProxyUpdate,
    provdConfigLocaleUpdate,
    provdConfigNatUpdate,
    provdConfigPluginServerUpdate,
    provdConfigProvisioningKeyUpdate,
  };
};
