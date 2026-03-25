import { useState } from "react";

export const useMoh = ({ apiClient, Wazo }) => {

  // values
  const [mohs, setMohs] = useState({});
  const [mohSelected, setMohSelected] = useState({});

  // functions
  const mohsGet = async () => {
    const res = await apiClient.client.get("confd/1.1/moh?recurse=false");
    setMohs(res);
    return res;
  };

  const mohsPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const res = await apiClient.client.get(`confd/1.1/moh?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setMohs(res);
      return res;
    } else {
      const res = await apiClient.client.get(`confd/1.1/moh?recurse=false&limit=${limit}&offset=${offset}`);
      setMohs(res);
      return res;
    }
  }

  const mohGet = async (moh) => {
    const mohUuid = moh.uuid;
    try {
      const res = await apiClient.client.get(`confd/1.1/moh/${mohUuid}`)
      return res
    } catch (e) {
      return e
    }
  }

  const mohAdd = async (moh) => {
    try {
      const res = await apiClient.client.post("confd/1.1/moh", moh);
      return res;
    } catch (e) {
      return e
    }
  };

  const mohEdit = async (moh) => {
    const mohUuid = moh.uuid;
    try {
      const res = await apiClient.client.put(`confd/1.1/moh/${mohUuid}`, moh);
      return res
    } catch (e) {
      return e
    }
  };

  const mohDelete = async (moh) => {
    const mohUuid = moh.uuid;
    try {
      const res = await apiClient.client.delete(`confd/1.1/moh/${mohUuid}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  /*
  const mohFilesGet = async (moh) => {
    const mohUuid = moh.uuid;
    try {
      const res = await apiClient.client.get(`confd/1.1/moh/${mohUuid}/files/${filename}`);
      return res;
    } catch (e) {
      return e
    }
  };
  */

  const mohFileGet = async (moh, file) => {
    const mohUuid = moh.uuid;
    const filename = file.name
    const response = await fetch(
      `https://${apiClient.client.server}/api/confd/1.1/moh/${mohUuid}/files/${filename}`,
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
  }

  /*
  const mohFileEdit = async (moh, file) => {
    const mohUuid = moh.uuid;
    const filename = file.name
    try {
      const res = await apiClient.client.put(`confd/1.1/moh/${mohUuid}/files/${filename}`, filename);
      return res
    } catch (e) {
      return e
    }
  };
  */

  const mohFileUpload = async (moh, file) => {
    const mohUuid = moh.uuid;
    const filename = file.name
      const response = await fetch(
        `https://${apiClient.client.server}/api/confd/1.1/moh/${mohUuid}/files/${filename}`,
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
  
      if (!response.ok) {
        const errorData = await response.json(); // Extraction du message d'erreur en JSON
        return { ok: false, message: errorData }
      }
  
      return response;
  }

  const mohFileDelete = async (moh, file) => {
    const mohUuid = moh.uuid;
    const filename = file.name
    try {
      const res = await apiClient.client.delete(`confd/1.1/moh/${mohUuid}/files/${filename}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    mohs,
    setMohs,
    mohSelected,
    setMohSelected,
    mohsGet,
    mohsPageGet,
    mohGet,
    mohAdd,
    mohEdit,
    mohDelete,
    mohFileGet,
    mohFileUpload,
    mohFileDelete,
  };
};
