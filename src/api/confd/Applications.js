import { useState } from "react";

export const useApplications = ({ apiClient }) => {
  
  // values
  const [applications, setApplications] = useState({});
  const [applicationSelected, setApplicationSelected] = useState({});

  // functions
  const applicationsGet = async () => {
    const res = await apiClient.client.get(`confd/1.1/applications?recurse=false`);
    setApplications(res);
    return res;
  };

  const applicationsPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const res = await apiClient.client.get(`confd/1.1/applications?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setApplications(res);
      return res;
    } else {
      const res = await apiClient.client.get(`confd/1.1/applications?recurse=false&limit=${limit}&offset=${offset}`);
      setApplications(res);
      return res;
    }
  }

  const applicationGet = async (application) => {
    const applicationUuid = application.uuid;
    try {
      const res = await apiClient.client.get(`confd/1.1/applications/${applicationUuid}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const applicationCreate = async (application) => {
    try {
      const res = await apiClient.client.post(`confd/1.1/applications`, application);
      return res;
    } catch (e) {
      return e;
    }
  };

  const applicationEdit = async (application) => {
    const applicationUuid = application.uuid;
    try {
      const res = await apiClient.client.put(`confd/1.1/applications/${applicationUuid}`, application);
      return res;
    } catch (e) {
      return e;
    }
  };

  const applicationDelete = async (application) => {
    const applicationUuid = application.uuid;
    try {
      const res = await apiClient.client.delete(`confd/1.1/applications/${applicationUuid}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    applications,
    setApplications,
    applicationSelected,
    setApplicationSelected,
    applicationsGet,
    applicationsPageGet,
    applicationGet,
    applicationCreate,
    applicationEdit,
    applicationDelete,
  };
};