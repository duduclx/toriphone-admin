import { useState } from "react";

export const useBackendsSources = ({ apiClient }) => {

  // values
  const [backendsSources, setBackendsSources] = useState({});
  const [backendSourcesSelected, setBackendSourcesSelected] = useState({})

  // functions
  const backendsDirdGet = async () => {
    const res = await apiClient.client.get("dird/0.1/backends");
    setSources(res);
    return res;
  };

  const backendsSourcesGet = async (backend) => {
    try {
        const res = await apiClient.client.get(`dird/0.1/backends/${backend}/sources`);
        return res
    } catch (e) {
        return e
    }
  }

  const backendsSourceGet = async (backend, source) => {
    const sourceUuid = source.uuid
    try {
        const res = await apiClient.client.get(`dird/0.1/backends/${backend}/sources/${sourceUuid}`);
        return res
    } catch (e) {
        return e
    }
  }

  const backendsSourceAdd = async (backend, source) => {
    try {
        const res = await apiClient.client.post(`dird/0.1/backends/${backend}/sources`, source);
        return res
    } catch (e) {
        return e
    }
  }

  const backendsSourceEdit = async (backend, source) => {
    const sourceUuid = source.uuid
    try {
        const res = await apiClient.client.post(`dird/0.1/backends/${backend}/sources/${sourceUuid}`, source);
        return res
    } catch (e) {
        return e
    }
  }

  const backendsSourceDelete = async (backend, source) => {
    const sourceUuid = source.uuid
    try {
        const res = await apiClient.client.delete(`dird/0.1/backends/${backend}/sources/${sourceUuid}`);
        return res
    } catch (e) {
        return e
    }
  }

  return {
    backendsSources,
    setBackendsSources,
    backendSourcesSelected,
    setBackendSourcesSelected,
    backendsDirdGet,
    backendsSourcesGet,
    backendsSourceGet,
    backendsSourceAdd,
    backendsSourceEdit,
    backendsSourceDelete
  }
}