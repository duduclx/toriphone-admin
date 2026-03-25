import { useState } from "react";

export const useCallfilters = ({ apiClient }) => {

  // values
  const [callfilters, setCallfilters] = useState({});
  const [callfilterSelected, setCallfilterSelected] = useState({});

  // functions
  const callfiltersGet = async () => {
    const res = await apiClient.client.get("confd/1.1/callfilters?recurse=false");
    setCallfilters(res);
    return res;
  };

  const callfiltersPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const res = await apiClient.client.get(`confd/1.1/callfilters?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setCallfilters(res);
      return res;
    } else {
      const res = await apiClient.client.get(`confd/1.1/callfilters?recurse=false&limit=${limit}&offset=${offset}`);
      setCallfilters(res);
      return res;
    }
  }

  const callfilterGet = async (callfilterId) => {
    try {
      const res = await apiClient.client.get(`confd/1.1/callfilters/${callfilterId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const callfilterAdd = async (callfilter) => {
    try {
      const res = await apiClient.client.post("confd/1.1/callfilters", callfilter);
      return res;
    } catch (e) {
      return e;
    }
  };

  const callfilterCreate = async (callfilter) => {
    const created = await callfilterAdd(callfilter);
    await callfilterRecipientsEdit(created, callfilter.recipients);
    await callfilterSurrogatesEdit(created, callfilter.surrogates);
    if (callfilter.fallbacks) {
      await callfilterFallbacksEdit(created, callfilter.fallbacks);
    }
    return created;
  };

  const callfilterEdit = async (callfilter) => {
    const callfilterId = callfilter.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/callfilters/${callfilterId}`, callfilter);
      return res;
    } catch (e) {
      return e;
    }
  };

  const callfilterUpdate = async (callfilter) => {
    const updated = await callfilterEdit(callfilter);
    if (updated.error) {
      return updated;
    }

    const recip = await callfilterRecipientsEdit(callfilter, callfilter.recipients);
    if (recip.error) {
      return recip;
    }

    const surro = await callfilterSurrogatesEdit(callfilter, callfilter.surrogates);
    if (surro.error) {
      return surro;
    }

    if (callfilter.fallbacks) {
      const falls = await callfilterFallbacksEdit(callfilter, callfilter.fallbacks);
      if (falls.error) {
        return falls;
      }
    }
    return updated;
  };

  const callfilterDelete = async (callfilter) => {
    const callfilterId = callfilter.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/callfilters/${callfilterId}`);
      return res;
    } catch (e) {
      return false;
    }
  };

  const callfilterFallbacksGet = async (callfilter) => {
    const callfilterId = callfilter.id;
    try {
      const callfilterFallbacks = await apiClient.client.get(`confd/1.1/callfilters/${callfilterId}/fallbacks`);
      return callfilterFallbacks;
    } catch (e) {
      return e;
    }
  };

  const callfilterFallbacksEdit = async (callfilter, fallbacks) => {
    const callfilterId = callfilter.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/callfilters/${callfilterId}/fallbacks`, fallbacks);
      return res;
    } catch (e) {
      return e;
    }
  };

  const callfilterRecipientsEdit = async (callfilter, recipients) => {
    const callfilterId = callfilter.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/callfilters/${callfilterId}/recipients/users`, recipients);
      return res;
    } catch (e) {
      return e;
    }
  };

  const callfilterSurrogatesEdit = async (callfilter, surrogates) => {
    const callfilterId = callfilter.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/callfilters/${callfilterId}/surrogates/users`, surrogates);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    callfilters,
    setCallfilters,
    callfilterSelected,
    setCallfilterSelected,
    callfiltersGet,
    callfiltersPageGet,
    callfilterGet,
    callfilterAdd,
    callfilterCreate,
    callfilterEdit,
    callfilterUpdate,
    callfilterDelete,
    callfilterFallbacksGet,
    callfilterFallbacksEdit,
    callfilterRecipientsEdit,
    callfilterSurrogatesEdit,
  };
};
