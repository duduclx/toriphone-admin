import { useState } from "react";

const useAgents = ({ apiClient }) => {
  //values
  const [agents, setAgents] = useState({});

  const agentsGet = async () => {
    try {
      const res = await apiClient.client.get(`agentd/1.0/agents?recurse=false`);
      setAgents(res);
      return res;
    } catch (e) {
      return e;
    }
  };

  const agentsLogoff = async () => {
    try {
      const res = await apiClient.client.get(`agentd/1.0/agents/logoff`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const agentsRelog = async () => {
    try {
      const res = await apiClient.client.get(`agentd/1.0/agents/relog`);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    agents,
    setAgents,
    agentsGet,
    agentsLogoff,
    agentsRelog,
  };
};

export default useAgents;
