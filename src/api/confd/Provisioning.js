import { useState } from "react";

export const useProvisioning = ({ apiClient }) => {

  // values
  const [provisioningNetworking, setProvisioningNetworking] = useState({});

  // functions
  const provisioningNetworkingGet = async () => {
    const res = await apiClient.client.get("confd/1.1/provisioning/networking");
    setProvisioningNetworking(res);
    return res;
  };

  const provisioningNetworkingEdit = async (networking) => {
    try {
      const res = await apiClient.client.put(`confd/1.1/provisioning/networking`, networking);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    provisioningNetworking,
    setProvisioningNetworking,
    provisioningNetworkingGet,
    provisioningNetworkingEdit,
  };
};
