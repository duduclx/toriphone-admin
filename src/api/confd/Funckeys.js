import { useState } from "react";

export const useFunckeys = ({ apiClient }) => {

  // values
  const [funckeysTemplates, setFunckeysTemplates] = useState({});
  const [funckeyTemplateSelected, setFunckeyTemplateSelected] = useState({});
  const [funckeysDestinations, setFunckeysDestinations] = useState({});

  // functions
  const funckeysDestinationsGet = async () => {
    try {
      const res = await apiClient.client.get(`confd/1.1/funckeys/destinations`);
      setFunckeysDestinations(res);
      return res;
    } catch (e) {
      return e;
    }
  };

  const funckeysTemplatesGet = async () => {
    try {
      const res = await apiClient.client.get(`confd/1.1/funckeys/templates`);
      setFunckeysTemplates(res);
      return res;
    } catch (e) {
      return e;
    }
  };

  const funckeysTemplatesPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const res = await apiClient.client.get(`confd/1.1/funckeys/templates?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setFunckeysTemplates(res);
      return res;
    } else {
      const res = await apiClient.client.get(`confd/1.1/funckeys/templates?recurse=false&limit=${limit}&offset=${offset}`);
      setFunckeysTemplates(res);
      return res;
    }
  }

  const funckeysTemplateGet = async (template) => {
    const templateId = template.id;
    try {
      const res = await apiClient.client.get(`confd/1.1/funckeys/templates/${templateId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const funckeysTemplateCreate = async (template) => {
    try {
      const res = await apiClient.client.post(`confd/1.1/funckeys/templates`, template);
      return res;
    } catch (e) {
      return e;
    }
  };

  const funckeysTemplateEdit = async (template) => {
    const templateId = template.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/funckeys/templates/${templateId}`, template);
      return res;
    } catch (e) {
      return e;
    }
  };

  const funckeysTemplateDelete = async (template) => {
    const templateId = template.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/funckeys/templates/${templateId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const funckeysTemplatePositionGet = async (template, position) => {
    const templateId = template.id;
    try {
      const res = await apiClient.client.get(`confd/1.1/funckeys/templates/${templateId}/${position}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const funckeysTemplatePositionUpdate = async (template, position, funckey) => {
    const templateId = template.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/funckeys/templates/${templateId}/${position}`, funckey);
      return res;
    } catch (e) {
      return e;
    }
  };

  const funckeysTemplatePositionDelete = async (template, position) => {
    const templateId = template.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/funckeys/templates/${templateId}/${position}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const funckeysTemplateUsersGet = async (template) => {
    const templateId = template.id;
    try {
      const res = await apiClient.client.get(`confd/1.1/funckeys/templates/${templateId}/users`);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    funckeysTemplates,
    setFunckeysTemplates,
    funckeyTemplateSelected,
    setFunckeyTemplateSelected,
    funckeysDestinations,
    setFunckeysDestinations,
    funckeysDestinationsGet,
    funckeysTemplatesGet,
    funckeysTemplatesPageGet,
    funckeysTemplateGet,
    funckeysTemplateCreate,
    funckeysTemplateEdit,
    funckeysTemplateDelete,
    funckeysTemplatePositionGet,
    funckeysTemplatePositionUpdate,
    funckeysTemplatePositionDelete,
    funckeysTemplateUsersGet,
  };
};
