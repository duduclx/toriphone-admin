import { useState } from "react";

export const useSubscriptions = ({ apiClient }) => {

  // values
  const [subscriptions, setSubcriptions] = useState({});
  const [subscriptionSelected, setSubscriptionSelected] = useState({});
  const [subscriptionLogs, setSubscriptionLogs] = useState({})

  // functions
  const subscriptionsGet = async () => {
    const res = await apiClient.client.get("webhookd/1.0/subscriptions?recurse=false");
    setSubcriptions(res);
    return res;
  };

  const subscriptionsGetByName = async (term) => {
    const res = await apiClient.client.get(`webhookd/1.0/subscriptions?recurse=false&search_metadata=name%3A${term}`);
    setSubcriptions(res);
    return res;
  }
  
  const subscriptionsPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const res = await apiClient.client.get(`webhookd/1.0/subscriptions?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setSubcriptions(res);
      return res;
    } else {
      const res = await apiClient.client.get(`webhookd/1.0/subscriptions?recurse=false&limit=${limit}&offset=${offset}`);
      setSubcriptions(res);
      return res;
    }
  }

  const subscriptionGet = async (subscription) => {
    const subscriptionUuid = subscription.uuid
    try {
      const res = await apiClient.client.get(`webhookd/1.0/subscriptions/${subscriptionUuid}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const subscriptionAdd = async (subscription) => {
    try {
      const res = await apiClient.client.post("webhookd/1.0/subscriptions", subscription);
      return res;
    } catch (e) {
      return e;
    }
  };

  const subscriptionEdit = async (subscription) => {
    const subscriptionUuid = subscription.uuid
    try {
      const res = await apiClient.client.put(`webhookd/1.0/subscriptions/${subscriptionUuid}`, subscription);
      return res;
    } catch (e) {
      return e;
    }
  };

  const subscriptionDelete = async (subscription) => {
    const subscriptionUuid = subscription.uuid
    try {
      const res = await apiClient.client.delete(`webhookd/1.0/subscriptions/${subscriptionUuid}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const subscriptionLogsGet = async (subscription) => {
    const subscriptionUuid = subscription.uuid
    try {
      const res = await apiClient.client.get(`webhookd/1.0/subscriptions/${subscriptionUuid}/logs`);
      setSubscriptionLogs(res)
      return res;
    } catch (e) {
      return e;
    }
  };

  const subscriptionServicesGet = async () => {
    try {
      const res = await apiClient.client.get(`webhookd/1.0/subscriptions/services`);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    subscriptions,
    setSubcriptions,
    subscriptionSelected,
    setSubscriptionSelected,
    subscriptionLogs,
    setSubscriptionLogs,
    subscriptionsGet,
    subscriptionsPageGet,
    subscriptionGet,
    subscriptionAdd,
    subscriptionEdit,
    subscriptionDelete,
    subscriptionLogsGet,
    subscriptionServicesGet
  };
};
