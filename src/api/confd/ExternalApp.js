import { useState } from "react";

export const useExternalApp = ({ apiClient }) => {

  // values
  const [externalApps, setExternalApps] = useState({});
  const [externalAppSelected, setExternalAppSelected] = useState({});

  // functions
  const externalAppsGet = async () => {
    const res = await apiClient.client.get(`confd/1.1/external/apps?recurse=false`);
    setExternalApps(res);
    return res;
  };

  const externalAppsPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const res = await apiClient.client.get(`confd/1.1/external/apps?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setExternalApps(res);
      return res;
    } else {
      const res = await apiClient.client.get(`confd/1.1/external/apps?recurse=false&limit=${limit}&offset=${offset}`);
      setExternalApps(res);
      return res;
    }
  }

  const externalAppGet = async (app) => {
    const appname = app.name;
    try {
      const res = await apiClient.client.get(`confd/1.1/external/apps/${appname}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const externalAppCreate = async (app) => {
    const appname = app.name;
    try {
      const res = await apiClient.client.post(`confd/1.1/external/apps/${appname}`, app);
      return res;
    } catch (e) {
      return e;
    }
  };

  const externalAppUpdate = async (app) => {
    const appname = app.name;
    try {
      const res = await apiClient.client.put(`confd/1.1/external/apps/${appname}`, app);
      return res;
    } catch (e) {
      return e;
    }
  };

  const externalAppDelete = async (app) => {
    const appname = app.name;
    try {
      const res = await apiClient.client.delete(`confd/1.1/external/apps/${appname}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    externalApps,
    setExternalApps,
    externalAppSelected,
    setExternalAppSelected,
    externalAppsGet,
    externalAppsPageGet,
    externalAppGet,
    externalAppCreate,
    externalAppUpdate,
    externalAppDelete,
  };
};
