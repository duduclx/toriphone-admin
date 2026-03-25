import { useState } from "react";

export const useSip = ({ apiClient }) => {

  // values
  const [sipTransportsAll, setSipTransportAll] = useState({});
  const [sipTransports, setSipTransports] = useState({});
  const [sipTransportSelected, setSipTransportSelected] = useState({})

  // functions
  const sipTransportsGet = async () => {
    const res = await apiClient.client.get("confd/1.1/sip/transports");
    setSipTransportAll(res);
    return res;
  };

  const sipTransportsPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const res = await apiClient.client.get(`confd/1.1/sip/transports?limit=${limit}&offset=${offset}&search=${search}`);
      setSipTransports(res);
      return res;
    } else {
      const res = await apiClient.client.get(`confd/1.1/sip/transports?limit=${limit}&offset=${offset}`);
      setSipTransports(res);
      return res;
    }
  }

  const sipTransportGet = async (transport) => {
    const transportUuid = transport.uuid;
    try {
      const res = await apiClient.client.get(`confd/1.1/sip/transports/${transportUuid}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const sipTransportAdd = async (transport) => {
    try {
      const res = await apiClient.client.post(`confd/1.1/sip/transports`, transport);
      return res;
    } catch (e) {
      return e;
    }
  };

  const sipTransportEdit = async (transport) => {
    const transportUuid = transport.uuid;
    try {
      const res = await apiClient.client.put(`confd/1.1/sip/transports/${transportUuid}`, transport);
      return res;
    } catch (e) {
      return e;
    }
  };

  const sipTransportDelete = async (transport) => {
    const transportUuid = transport.uuid;
    try {
      const res = await apiClient.client.delete(`confd/1.1/sip/transports/${transportUuid}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    sipTransportsAll,
    setSipTransportAll,
    sipTransports,
    setSipTransports,
    sipTransportSelected,
    setSipTransportSelected,
    sipTransportsGet,
    sipTransportsPageGet,
    sipTransportGet,
    sipTransportAdd,
    sipTransportEdit,
    sipTransportDelete
  }
}