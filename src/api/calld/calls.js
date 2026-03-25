import { useState } from "react";

export const useCalls = ({ apiClient }) => {
  // values
  const [calls, setCalls] = useState({});
  const [callSelected, setCallSelected] = useState({});

  // functions
  const callsGet = async () => {
    const res = await apiClient.client.get("calld/1.0/calls?recurse=false");
    setCalls(res);
    return res;
  };

  const callsPageGet = async (search = null, offset = 0, limit = 10) => {
    if (search) {
      const res = await apiClient.client.get(`calld/1.0/calls?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setCalls(res);
      return res;
    } else {
      const res = await apiClient.client.get(`calld/1.0/calls?recurse=false&limit=${limit}&offset=${offset}`);
      setCalls(res);
      return res;
    }
  };

  const callGet = async (call) => {
    const callId = call.call_id;
    try {
      const res = await apiClient.client.get(`calld/1.0/calls/${callId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const callDelete = async (call) => {
    const callId = call.call_id;
    try {
      const res = await apiClient.client.delete(`calld/1.0/calls/${callId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const callRecordStart = async (call) => {
    const callId = call.call_id;
    try {
      const res = await apiClient.client.put(`calld/1.0/calls/${callId}/record/start`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const callRecordStop = async (call) => {
    const callId = call.call_id;
    try {
      const res = await apiClient.client.put(`calld/1.0/calls/${callId}/record/stop`);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    calls,
    setCalls,
    callSelected,
    setCallSelected,
    callsGet,
    callsPageGet,
    callGet,
    callDelete,
    callRecordStart,
    callRecordStop,
  };
};
