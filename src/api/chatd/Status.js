import { useState } from "react";

export const useChatdStatus = ({ apiClient }) => {
  // values
  const [chatdStatus, setChatdStatus] = useState({
    name: "chatd",
    bus_consumer: {status: ""},
    master_tenant: {status: ""},
    presence_initialization: {status: ""},
    rest_api: {status: ""}
  });

  const chatdStatusGet = async () => {
    try {
      const res = await apiClient.client.get(`chatd/1.0/status`);
      const withName = { ...res, name: "chatd" };
      setChatdStatus(withName);
      return withName;
    } catch (e) {
      return e;
    }
  };

  return { chatdStatus, setChatdStatus, chatdStatusGet };
};