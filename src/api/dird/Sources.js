import { useState } from "react";

export const useSources = ({ apiClient }) => {

  // values
  const [sources, setSources] = useState({});
  const [sourceSelected, setSourceSelected] = useState({})

  // functions
  const sourcesGet = async () => {
    const res = await apiClient.client.get("dird/0.1/sources?recurse=false");
    setSources(res);
    return res;
  };

  const sourcesPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const res = await apiClient.client.get(`dird/0.1/sources?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setSources(res);
      return res;
    } else {
      const res = await apiClient.client.get(`dird/0.1/sources?recurse=false&limit=${limit}&offset=${offset}`);
      setSources(res);
      return res;
    }
  }

  return {
    sources,
    setSources,
    sourceSelected,
    setSourceSelected,
    sourcesGet,
    sourcesPageGet
  }
}