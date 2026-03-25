import { useState } from "react";

export const useDhcp = ({ apiClient }) => {

  // values
  const [dhcp, setDhcp] = useState({});

  // functions
  const dhcpGet = async () => {
    const res = await apiClient.client.get("confd/1.1/dhcp");
    setDhcp(res);
    return res;
  };

  const dhcpEdit = async (dhcp) => {
    try {
      const res = await apiClient.client.put(`confd/1.1/dhcp`, dhcp);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    dhcp,
    setDhcp,
    dhcpGet,
    dhcpEdit,
  };
};
