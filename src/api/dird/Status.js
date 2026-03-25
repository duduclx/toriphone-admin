import { useState } from "react";

export const useDirdStatus = ({ apiClient }) => {
  // values
  const [dirdStatus, setDirdStatus] = useState({
    name: "dird",
    master_tenant: {
      status: ""
    },
    rest_api: {
      status: ""
    },
    bus_consumer: {
      status: ""
    }
  });

  const dirdStatusGet = async () => {
    try {
      const res = await apiClient.client.get(`dird/0.1/status`);
      const withName = { ...res, name: "dird" };
      setDirdStatus(withName);
      return withName;
    } catch (e) {
      return e;
    }
  };

  return { dirdStatus, setDirdStatus, dirdStatusGet };
};