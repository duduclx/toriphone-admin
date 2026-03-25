import { useState } from "react";

export const useCallLogdStatus = ({ apiClient }) => {
  // values
  const [callLogdStatus, setCallLogdStatus] = useState({
    name: "callLogd",
    bus_consumer: {
      status: ""
    },
    service_token: {
      status: ""
    },
    task_queue: {
      status: ""
    }
  });

  const callLogdStatusGet = async () => {
    try {
      const res = await apiClient.client.get(`call-logd/1.0/status`);
      const withName = { ...res, name: "callLogd" };
      setCallLogdStatus(withName);
      return withName;
    } catch (e) {
      return e;
    }
  };

  return { callLogdStatus, setCallLogdStatus, callLogdStatusGet };
};