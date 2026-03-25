import { useState } from "react";

export const useCdr = ({ apiClient }) => {

  // values
  const [cdrs, setCdrs] = useState({});
  const [cdrSelected, setCdrSelected] = useState({});

  // functions
  const cdrsGet = async (querie ={}) => {
    /*
    querie.from
    querie.until
    querie.limit
    querie.offset // default 20
    querie.order
    querie.direction // default asc
    querie.search
    querie.call_direction
    querie.number
    querie.tags
    querie.user_uuid
    querie.from_id
    querie.recurse // default false
    querie.distinct
    querie.recorded
    querie.format
    */
    const params = new URLSearchParams();

    // Ajouter les paramètres de la querie s'ils existent
    if (querie.from) params.append("from", querie.from);
    if (querie.until) params.append("until", querie.until);
    //if (querie.limit) params.append("limit", querie.limit); 
    params.append("limit", querie.limit || 20); // default to 20
    //params.append("offset", querie.offset || 20); // default to 20
    if (querie.offset) params.append("offset", querie.offset); 
    if (querie.order) params.append("order", querie.order);
    if (querie.direction) params.append("direction", querie.direction || "asc");
    if (querie.search) params.append("search", querie.search);
    if (querie.call_direction) params.append("call_direction", querie.call_direction);
    if (querie.number) params.append("number", querie.number);
    if (querie.tags) params.append("tags", querie.tags);
    if (querie.user_uuid) params.append("user_uuid", querie.user_uuid);
    if (querie.from_id) params.append("from_id", querie.from_id);
    params.append("recurse", querie.recurse || "false"); // default to false
    if (querie.distinct) params.append("distinct", querie.distinct);
    if (querie.recorded) params.append("recorded", querie.recorded);
    if (querie.format) params.append("format", querie.format);
  
    // Construire l'URL avec les paramètres de requête
    const url = `call-logd/1.0/cdr?${params.toString()}`;

    const res = await apiClient.client.get(url);
    setCdrs(res);
    return res;
  };

  const cdrsPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const res = await apiClient.client.get(`call-logd/1.0/cdr?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setCdrs(res);
      return res;
    } else {
      const res = await apiClient.client.get(`call-logd/1.0/cdr?recurse=false&limit=${limit}&offset=${offset}`);
      setCdrs(res);
      return res;
    }
  }

  const cdrGet = async (cdrId) => {
    try {
      const res = await apiClient.client.get(`call-logd/1.0/cdr/${cdrId}`);
      setCdrSelected(res);
      return res;
    } catch (e) {
      return e
    }
  };

  const cdrRecordingGet = async (cdr, record) => {
    const cdrId = cdr.id;
    const recordUuid = record.uuid;
    try {
      const res = await apiClient.client.get(`call-logd/1.0/cdr/${cdrId}/recordings/${recordUuid}/media`);
      return res
    } catch (e) {
      return e
    }
  };

  const cdrRecordingDelete = async (cdr, record) => {
    const cdrId = cdr.id;
    const recordUuid = record.uuid;
    try {
      const res = await apiClient.client.delete(`call-logd/1.0/cdr/${cdrId}/recordings/${recordUuid}/media`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const cdrRecordsDelete = async (cdrIds) => {
    try {
      const res = await apiClient.client.delete(`call-logd/1.0/cdr/recordings/media`, cdrIds);
      return res;
    } catch (e) {
      return e;
    }
  };

  const cdrRecordsExport = async (cdrIds) => {
    const records = await apiClient.client.post("call-logd/1.0/cdr/recordings/media/export?recurse=false", cdrIds);
    return records;
  };

  return {
    cdrs,
    setCdrs,
    cdrSelected,
    setCdrSelected,
    cdrsGet,
    cdrsPageGet,
    cdrGet,
    cdrRecordingGet,
    cdrRecordingDelete,
    cdrRecordsDelete,
    cdrRecordsExport,
  };
};
