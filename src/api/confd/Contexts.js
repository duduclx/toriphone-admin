import { useState } from "react";

export const useContexts = ({ apiClient }) => {

  // values
  const [contexts, setContexts] = useState({});
  const [contextSelected, setContextSelected] = useState({});

  // functions
  const contextsGet = async () => {
    const contexts = await apiClient.client.get("confd/1.1/contexts?recurse=false");
    setContexts(contexts);
    return contexts
  };

  const contextsPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const contexts = await apiClient.client.get(`confd/1.1/contexts?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setContexts(contexts);
      return contexts
    } else {
      const contexts = await apiClient.client.get(`confd/1.1/contexts?recurse=false&limit=${limit}&offset=${offset}`);
      setContexts(contexts);
      return contexts
    }
  }

  const contextGet = async (contextId) => {
    try {
      const res = await apiClient.client.get(`confd/1.1/contexts/${contextId}`);
      return res;
    } catch (e) {
      return e
    }
  };

  const contextAdd = async (context) => {
    try {
      const res = await apiClient.client.post("confd/1.1/contexts", context);
      return res;
    } catch (e) {
      return e
    }
  };

  const contextEdit = async (context) => {
    const contextId = context.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/contexts/${contextId}`, context);
      return res
    } catch (e) {
      return e
    }
  };

  const contextUpdate = async (context) => {
    const res = await contextEdit(context)
    const asso = await contextAssociateContexts(context, context)
    if(asso.error) {
      return asso
    }
    return res
}

  const contextDelete = async (context) => {
    const contextId = context.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/contexts/${contextId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const contextAssociateContexts = async (context, contexts) => {
    const contextId = context.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/contexts/${contextId}/contexts`, contexts);
      return res
    } catch (e) {
      return e
    }
  };

  const contextRangeGet = async (contextId) => {
    try {
      const res = await apiClient.client.get(`confd/1.1/contexts/${contextId}/ranges/user?availability=available`);
      return res;
    } catch (e) {
      return e
    }
  };

  const contextRangeGroupGet = async (contextId) => {
    try {
      const res = await apiClient.client.get(`confd/1.1/contexts/${contextId}/ranges/group?availability=available`);
      return res;
    } catch (e) {
      return e
    }
  };

  const contextRangeQueueGet = async (contextId) => {
    try {
      const res = await apiClient.client.get(`confd/1.1/contexts/${contextId}/ranges/queue?availability=available`);
      return res;
    } catch (e) {
      return e
    }
  };

  const contextRangeConferenceGet = async (contextId) => {
    try {
      const res = await apiClient.client.get(`confd/1.1/contexts/${contextId}/ranges/conference?availability=available`);
      return res;
    } catch (e) {
      return e
    }
  };

  const contextRangeIncallGet = async (contextId) => {
    try {
      const res = await apiClient.client.get(`confd/1.1/contexts/${contextId}/ranges/incall?availability=available`);
      return res;
    } catch (e) {
      return e
    }
  };

  return {
    contexts,
    setContexts,
    contextSelected,
    setContextSelected,
    contextsGet,
    contextsPageGet,
    contextGet,
    contextAdd,
    contextEdit,
    contextUpdate,
    contextDelete,
    contextAssociateContexts,
    contextRangeGet,
    contextRangeGroupGet,
    contextRangeQueueGet,
    contextRangeConferenceGet,
    contextRangeIncallGet,
  };
};
