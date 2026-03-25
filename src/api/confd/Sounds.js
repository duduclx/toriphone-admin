import { useState } from "react";

export const useSounds = ({ apiClient, Wazo }) => {

  // values
  const [sounds, setSounds] = useState({});
  const [soundSelected, setSoundSelected] = useState({});

  // functions
  const soundsGet = async () => {
    const soundsList = await apiClient.client.get("confd/1.1/sounds?recurse=false");
    setSounds(soundsList);
    return soundsList;
  };

  const soundsPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const soundsList = await apiClient.client.get(`confd/1.1/sounds?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setSounds(soundsList);
      return soundsList;
    } else {
      const soundsList = await apiClient.client.get(`confd/1.1/sounds?recurse=false&limit=${limit}&offset=${offset}`);
      setSounds(soundsList);
      return soundsList;
    }
  }

  const soundCategoryGet = async (category) => {
    try {
      const res = await apiClient.client.get(`confd/1.1/sounds/${category}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const soundCategoryAdd = async (category) => {
    try {
      const res = await apiClient.client.post(`confd/1.1/sounds`, category);
      return res;
    } catch (e) {
      return e;
    }
  };

  const soundCategoryDelete = async (category) => {
    try {
      const res = await apiClient.client.delete(`confd/1.1/sounds/${category}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const soundCategoryFileGet = async (category, sound) => {
    const response = await fetch(
      `https://${apiClient.client.server}/api/confd/1.1/sounds/${category}/files/${sound}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/octet-stream",
          "Wazo-Tenant": Wazo.Auth.session.tenantUuid,
          "X-Auth-Token": apiClient.client.token,
        }
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch audio file");
    }
  
    const blob = await response.blob();
    return blob;
  };

  const soundCategoryFilePut = async (category, fileName, file, format, language) => {
    const response = await fetch(
      `https://${apiClient.client.server}/api/confd/1.1/sounds/${category}/files/${fileName}?format=${format}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/octet-stream",
          "Wazo-Tenant": Wazo.Auth.session.tenantUuid,
          "X-Auth-Token": apiClient.client.token,
        },
        body: file,
      }
    );

    return response;
  };

  /*
  const soundCategoryFilePut = async (category, sound, language, format, file) => {
    try {
      let url = `confd/1.1/sounds/${category}/files/${sound}`;

      const queryParams = new URLSearchParams();
      if (language) {
        queryParams.append("language", language);
      }
      if (format) {
        queryParams.append("format", format);
      }

      if (queryParams.toString()) {
        url += `?${queryParams.toString()}`;
      }

      const res = await apiClient.client.put(url, file);
      return res;
    } catch (e) {
      return e
    }
  };
  */

  const soundCategoryFileDelete = async (category, sound) => {
    try {
      const res = await apiClient.client.delete(`confd/1.1/sounds/${category}/files/${sound}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const soundsLanguagesGet = async () => {
    try {
      const res = await apiClient.client.get(`confd/1.1/sounds/languages`);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    sounds,
    setSounds,
    soundSelected,
    setSoundSelected,
    soundsGet,
    soundsPageGet,
    soundCategoryGet,
    soundCategoryAdd,
    soundCategoryDelete,
    soundCategoryFileGet,
    soundCategoryFilePut,
    soundCategoryFileDelete,
    soundsLanguagesGet,
  };
};
