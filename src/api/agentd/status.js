import { useState } from "react";

export const useAgentdStatus = ({ apiClient }) => {
  // values
  const [agentdStatus, setAgentdStatus] = useState({
    name: "agentd",
    bus_consumer: {status: ""},
    service_token: {status: ""}
  });

  const agentdStatusGet = async () => {
    try {
      const res = await apiClient.client.get(`agentd/1.0/status`);
      const withName = { ...res, name: "agentd" };
      setAgentdStatus(withName);
      return withName;
    } catch (e) {
      return e;
    }
  };

  return { agentdStatus, setAgentdStatus, agentdStatusGet };
};