import { useState } from "react";

export const useQueuesStatistics = ({ apiClient }) => {

  // values
  const [queuesStatistics, setQueuesStastistics] = useState({});
  const [queueStatistics, setQueueStastistics] = useState({});

  // functions
  const queuesStatisticsGet = async () => {
    const stats = await apiClient.client.get(
      "call-logd/1.0/queues/statistics?week_days=1%2C2%2C3%2C4%2C5%2C6%2C7&timezone=UTC"
    );
    setQueuesStastistics(stats);
    return stats;
  };

  const queueStatisticsGet = async (queue) => {
    const queueId = queue.id;
    const stats = await apiClient.client.get(
      `call-logd/1.0/queues/${queueId}/statistics?week_days=1%2C2%2C3%2C4%2C5%2C6%2C7&timezone=UTC`
    );
    setQueueStastistics(stats);
    return stats;
  };

  const queueStatisticsQosGet = async (queue) => {
    const queueId = queue.id;
    const stats = await apiClient.client.get(
      `call-logd/1.0/queues/${queueId}/statistics/qos?week_days=1%2C2%2C3%2C4%2C5%2C6%2C7&timezone=UTC`
    );
    return stats;
  };

  return {
    queuesStatistics,
    setQueuesStastistics,
    queuesStatisticsGet,
    queueStatistics,
    setQueueStastistics,
    queueStatisticsGet,
    queueStatisticsQosGet
  }
}