import { useState } from "react";

export const useWebhookdStatus = ({ apiClient }) => {
  // values
  const [webhookdStatus, setWebhookdStatus] = useState({
    name: "webhookd",
    bus_consumer: {
      status: ""
    },
    master_tenant: {
      status: ""
    }
  });

  const webhookdStatusGet = async () => {
    try {
      const res = await apiClient.client.get(`webhookd/1.0/status`);
      const withName = { ...res, name: "webhookd" };
      setWebhookdStatus(withName);
      return withName;
    } catch (e) {
      return e;
    }
  };

  return { webhookdStatus, setWebhookdStatus, webhookdStatusGet };
};