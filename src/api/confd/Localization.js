import { useState } from "react";

export const useLocalization = ({ apiClient }) => {
  const [localization, setLocalization] = useState({});

  const localizationGet = async () => {
    const res = await apiClient.client.get(`confd/1.1/localization`);
    setLocalization(res);
    return res;
  };

  const localizationUpdate = async (localization) => {
    try {
      const res = await apiClient.client.put(`confd/1.1/localization`, localization);
      return res;
    } catch (e) {
      return e;
    }
  };
  return { localization, setLocalization, localizationGet, localizationUpdate };
};
