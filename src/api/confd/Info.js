import { useState } from "react";

export const useInfos = ({ apiClient }) => {
    
  // values
  const [serverInfos, setServerInfos] = useState({});

  // functions
  const serverInfosGet = async () => {
    const infos = await apiClient.client.get("confd/1.1/infos");
    setServerInfos(infos);
    return infos;
  };

  return { serverInfos, serverInfosGet };
};
