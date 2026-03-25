import { useState } from "react";

export const useIvrs = ({ apiClient }) => {
  // values
  const [ivrs, setIvrs] = useState({});
  const [ivrSelected, setIvrSelected] = useState({});

  // functions
  const ivrsGet = async () => {
    const res = await apiClient.client.get("confd/1.1/ivr?recurse=false");
    setIvrs(res);
    return res;
  };

  const ivrsPageGet = async (search = null, offset = 0, limit = 10) => {
    if (search) {
      const res = await apiClient.client.get(
        `confd/1.1/ivr?recurse=false&limit=${limit}&offset=${offset}&search=${search}`
      );
      setIvrs(res);
      return res;
    } else {
      const res = await apiClient.client.get(`confd/1.1/ivr?recurse=false&limit=${limit}&offset=${offset}`);
      setIvrs(res);
      return res;
    }
  };

  const ivrGet = async (ivrId) => {
    try {
      const res = await apiClient.client.get(`confd/1.1/ivr/${ivrId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const ivrAdd = async (ivr) => {
    try {
      const res = await apiClient.client.post("confd/1.1/ivr", ivr);
      return res;
    } catch (e) {
      return e;
    }
  };

  const ivrEdit = async (ivr) => {
    const ivrId = ivr.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/ivr/${ivrId}`, ivr);
      return res;
    } catch (e) {
      return e;
    }
  };

  const ivrDelete = async (ivr) => {
    const ivrId = ivr.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/ivr/${ivrId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  return { ivrs, setIvrs, ivrSelected, setIvrSelected, ivrsGet, ivrsPageGet, ivrGet, ivrAdd, ivrEdit, ivrDelete };
};
