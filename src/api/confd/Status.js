import { useState } from "react";

export const useConfdStatus = ({ apiClient }) => {
  // values
  const [confdStatus, setConfdStatus] = useState({
    name: "confd",
    master_tenant: {
      status: ""
    },
    service_token: {
      status: ""
    },
    bus_consumer: {
      status: ""
    },
    rest_api: {
      status: ""
    }
  });

  const confdStatusGet = async () => {
    try {
      const res = await apiClient.client.get(`confd/1.1/status`);
      const withName = { ...res, name: "confd" };
      setConfdStatus(withName);
      return withName;
    } catch (e) {
      return e;
    }
  };

  return { confdStatus, setConfdStatus, confdStatusGet };
};