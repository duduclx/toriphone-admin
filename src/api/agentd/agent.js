import { useState } from "react";

const useAgent = ({ apiClient }) => {
  // values
  const [agent, setAgent] = useState({});

  const agentByIdGet = async (agent) => {
    const agentId = agent.id;
    try {
      const res = await apiClient.client.get(`agentd/1.0/agents/by-id/${agentId}`);
      setAgent(res);
      return res;
    } catch (e) {
      return e;
    }
  };

  const agentByIdQueueAdd = async (agent, queue) => {
    const agentId = agent.id;
    try {
      const res = await apiClient.client.post(`agentd/1.0/agents/by-id/${agentId}/add`, queue);
      return res;
    } catch (e) {
      return e;
    }
  };

  const agentByIdQueueRemove = async (agent, queue) => {
    const agentId = agent.id;
    try {
      const res = await apiClient.client.post(`agentd/1.0/agents/by-id/${agentId}/remove`, queue);
      return res;
    } catch (e) {
      return e;
    }
  };

  const agentByIdLogin = async (agent, line) => {
    const agentId = agent.id;
    /*
        line: {
            "context": "string",
            "extension": "string"
        }
        */
    try {
      const res = await apiClient.client.post(`agentd/1.0/agents/by-id/${agentId}/login`, line);
      return res;
    } catch (e) {
      return e;
    }
  };

  const agentByIdLogoff = async (agent) => {
    const agentId = agent.id;
    try {
      const res = await apiClient.client.post(`agentd/1.0/agents/by-id/${agentId}/logoff`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const agentByNumberGet = async (agent) => {
    const agentNumber = agent.number;
    try {
      const res = await apiClient.client.get(`agentd/1.0/agents/by-number/${agentNumber}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const agentByNumberLogin = async (agent, line) => {
    const agentNumber = agent.number;
    /*
        line: {
            "context": "string",
            "extension": "string"
        }
        */
    try {
      const res = await apiClient.client.post(`agentd/1.0/agents/by-number/${agentNumber}/login`, line);
      return res;
    } catch (e) {
      return e;
    }
  };

  const agentByNumberLogoff = async (agent) => {
    const agentNumber = agent.number;
    try {
      const res = await apiClient.client.post(`agentd/1.0/agents/by-number/${agentNumber}/logoff`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const agentByNumberPause = async (agent, reason) => {
    const agentNumber = agent.number;
    /*
        {
        "reason": "string"
        }
        */
    try {
      const res = await apiClient.client.post(`agentd/1.0/agents/by-number/${agentNumber}/pause`, reason);
      return res;
    } catch (e) {
      return e;
    }
  };

  const agentByNumberResume = async (agent) => {
    const agentNumber = agent.number;
    try {
      const res = await apiClient.client.post(`agentd/1.0/agents/by-number/${agentNumber}/unpause`);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    agent,
    setAgent,
    agentByIdGet,
    agentByIdQueueAdd,
    agentByIdQueueRemove,
    agentByIdLogin,
    agentByIdLogoff,
    agentByNumberGet,
    agentByNumberLogin,
    agentByNumberLogoff,
    agentByNumberPause,
    agentByNumberResume
  };
};

export default useAgent;
