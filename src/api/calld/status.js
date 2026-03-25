import { useState } from "react";

export const useCalldStatus = ({ apiClient }) => {
  // values
  const [calldStatus, setCalldStatus] = useState({
    name: "calld",
    ari: {status: ""},
    bus_consumer: {status: ""},
    plugins:{
      endpoints: {status: ""},
      voicemails: {status: ""}
    },
    service_token: {status: ""}
  });

  const calldStatusGet = async () => {
    try {
      const res = await apiClient.client.get(`calld/1.0/status`);
      const withName = { ...res, name: "calld" };
      setCalldStatus(withName);
      return withName;
    } catch (e) {
      return e;
    }
  };

  return { calldStatus, setCalldStatus, calldStatusGet };
};