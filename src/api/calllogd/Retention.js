import { useState } from "react";

export const useRetention = ({ apiClient }) => {

  // values
  const [retention, setRetention] = useState({});

  // functions
  const retentionGet = async () => {
    const ret = await apiClient.client.get("call-logd/1.0/retention");
    setRetention(ret);
    return ret;
  };

  const retentionUpdate = async (retention) => {
    try {
      const res = await apiClient.client.put(`call-logd/1.0/retention`, retention);
      return res
    } catch (e) {
      return e
    }
  };

  return {
    retention,
    setRetention,
    retentionGet,
    retentionUpdate,
  };
};
