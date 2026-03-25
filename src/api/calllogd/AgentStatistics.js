import { useState } from "react";

export const useAgentStatistics = ({ apiClient }) => {

  // values
  const [agentsStatistics, setAgentsStastistics] = useState({});
  const [agentStatistics, setAgentStastistics] = useState({});

  // functions
  const agentsStatisticsGet = async () => {
    const stats = await apiClient.client.get(
      "call-logd/1.0/agents/statistics?week_days=1%2C2%2C3%2C4%2C5%2C6%2C7&timezone=UTC"
    );
    setAgentsStastistics(stats);
    return stats;
  };

  const agentStatisticsGet = async (agent) => {
    const agentId = agent.id;
    const stats = await apiClient.client.get(
      `call-logd/1.0/agents/${agentId}/statistics?week_days=1%2C2%2C3%2C4%2C5%2C6%2C7&timezone=UTC`
    );
    setAgentStastistics(stats);
    return stats;
  };

  return {
    agentsStatistics,
    setAgentsStastistics,
    agentsStatisticsGet,
    agentStatistics,
    setAgentStastistics,
    agentStatisticsGet,
  };
};
