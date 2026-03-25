import { useState } from "react";

export const useProvdStatus = ({ apiClient }) => {
  // values
  const [provdStatus, setProvdStatus] = useState({
    name: "provd",
    bus_consumer: {
      status: "",
    },
    rest_api: {
      status: "",
    },
  });

  const provdStatusGet = async () => {
    apiClient.client.setFetchOptions({ headers: { Accept: "application/vnd.proformatique.provd+json" } });
    try {
      const res = await apiClient.client.get(`provd/0.2/status`);
      const withName = {
        ...res,
        name: "provd",
        rest_api: { status: res.rest_api },
      };
      setProvdStatus(withName);
      return withName;
    } catch (e) {
      return e;
    }
  };

  return { provdStatus, setProvdStatus, provdStatusGet };
};
