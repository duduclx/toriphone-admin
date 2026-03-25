import { useState } from "react";

export const useEndpoints = ({ apiClient }) => {

  // values
  const [endpointsCustom, setEndpointsCustom] = useState({});
  const [endpointsIax, setEndpointsIax] = useState({});
  const [endpointsSccp, setEndpointsSccp] = useState({});
  const [endpointsSip, setEndpointsSip] = useState({});
  const [endpointsSipTemplatesAll, setEndpointsSipTemplatesAll] = useState({ items: [] });
  const [endpointsSipTemplates, setEndpointsSipTemplates] = useState({});
  const [endpointSipTemplateSelected, setEndpointSipTemplateSelected] = useState({})

  // functions
  const endpointsCustomGet = async () => {
    const res = await apiClient.client.get("confd/1.1/endpoints/custom?recurse=false");
    setEndpointsCustom(res);
    return res;
  };

  const endpointCustomGet = async (endpoint) => {
    const endpointId = endpoint.id;
    try {
      const res = await apiClient.client.get(`confd/1.1/endpoints/custom/${endpointId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const endpointCustomAdd = async (endpoint) => {
    try {
      const res = await apiClient.client.post(`confd/1.1/endpoints/custom`, endpoint);
      return res;
    } catch (e) {
      return e;
    }
  };

  const endpointCustomEdit = async (endpoint) => {
    const endpointId = endpoint.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/endpoints/custom/${endpointId}`, endpoint);
      return res;
    } catch (e) {
      return e;
    }
  };

  const endpointCustomDelete = async (endpoint) => {
    const endpointId = endpoint.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/endpoints/custom/${endpointId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const endpointsIaxGet = async () => {
    const res = await apiClient.client.get("confd/1.1/endpoints/iax?recurse=false");
    setEndpointsIax(res);
    return res;
  };

  const endpointIaxGet = async (endpoint) => {
    const endpointId = endpoint.id;
    try {
      const res = await apiClient.client.get(`confd/1.1/endpoints/iax/${endpointId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const endpointIaxAdd = async (endpoint) => {
    try {
      const res = await apiClient.client.post(`confd/1.1/endpoints/iax`, endpoint);
      return res;
    } catch (e) {
      return e;
    }
  };

  const endpointIaxEdit = async (endpoint) => {
    const endpointId = endpoint.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/endpoints/iax/${endpointId}`, endpoint);
      return res;
    } catch (e) {
      return e;
    }
  };

  const endpointIaxDelete = async (endpoint) => {
    const endpointId = endpoint.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/endpoints/iax/${endpointId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const endpointsSccpGet = async () => {
    const res = await apiClient.client.get("confd/1.1/endpoints/sccp?recurse=false");
    setEndpointsSccp(res);
    return res;
  };

  const endpointSccpGet = async (endpoint) => {
    const endpointId = endpoint.id;
    try {
      const res = await apiClient.client.get(`confd/1.1/endpoints/sccp/${endpointId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const endpointSccpAdd = async (endpoint) => {
    try {
      const res = await apiClient.client.post(`confd/1.1/endpoints/sccp`, endpoint);
      return res;
    } catch (e) {
      return e;
    }
  };

  const endpointSccpEdit = async (endpoint) => {
    const endpointId = endpoint.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/endpoints/sccp/${endpointId}`, endpoint);
      return res;
    } catch (e) {
      return e;
    }
  };

  const endpointSccpDelete = async (endpoint) => {
    const endpointId = endpoint.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/endpoints/sccp/${endpointId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const endpointsSipGet = async () => {
    const res = await apiClient.client.get("confd/1.1/endpoints/sip?recurse=false");
    setEndpointsSip(res);
    return res;
  };

  const endpointSipGet = async (endpoint) => {
    const endpointUuid = endpoint.uuid;
    try {
      const res = await apiClient.client.get(`confd/1.1/endpoints/sip/${endpointUuid}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const endpointSipAdd = async (endpoint) => {
    try {
      const res = await apiClient.client.post(`confd/1.1/endpoints/sip`, endpoint);
      return res;
    } catch (e) {
      return e;
    }
  };

  const endpointSipEdit = async (endpoint) => {
    const endpointUuid = endpoint.uuid;
    try {
      const res = await apiClient.client.put(`confd/1.1/endpoints/sip/${endpointUuid}`, endpoint);
      return res;
    } catch (e) {
      return e;
    }
  };

  const endpointSipDelete = async (endpoint) => {
    const endpointId = endpoint.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/endpoints/sip/${endpointId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const endpointsTypeGet = async (type) => {
    const res = await apiClient.client.get(`confd/1.1/endpoints/${type}?recurse=false`);
    if (type == "custom") {
        setEndpointsCustom(res)
    } else if ( type == "iax") {
        setEndpointsIax(res)
    }
    else if ( type == "sccp") {
        setEndpointsSccp(res)
    }
    else if ( type == "sip") {
        setEndpointsSip(res)
    }
    return res;
  };

  const endpointTypeGet = async (type, endpoint) => {
    const endpointId = endpoint.id ? endpoint.id : endpoint.uuid;
    try {
      const res = await apiClient.client.get(`confd/1.1/endpoints/${type}/${endpointId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const endpointTypeAdd = async (type, endpoint) => {
    try {
      const res = await apiClient.client.post(`confd/1.1/endpoints/${type}`, endpoint);
      return res;
    } catch (e) {
      return e;
    }
  };

  const endpointTypeEdit = async (type, endpoint) => {
    const endpointId = endpoint.id ? endpoint.id : endpoint.uuid;
    try {
      const res = await apiClient.client.put(`confd/1.1/endpoints/${type}/${endpointId}`, endpoint);
      return res;
    } catch (e) {
      return e;
    }
  };

  const endpointTypeDelete = async (type, endpoint) => {
    const endpointId = endpoint.id ? endpoint.id : endpoint.uuid;
    try {
      const res = await apiClient.client.delete(`confd/1.1/endpoints/${type}/${endpointId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const endpointsSipTemplatesGet = async () => {
    const res = await apiClient.client.get(`confd/1.1/endpoints/sip/templates?recurse=false`);
    setEndpointsSipTemplatesAll(res);
    return res;
  };

  const endpointsSipTemplatesPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const res = await apiClient.client.get(`confd/1.1/endpoints/sip/templates?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setEndpointsSipTemplates(res);
      return res;
    } else {
      const res = await apiClient.client.get(`confd/1.1/endpoints/sip/templates?recurse=false&limit=${limit}&offset=${offset}`);
      setEndpointsSipTemplates(res);
      return res;
    }
  }

  const endpointSipTemplatesGet = async (template) => {
    const templateUuid = template.uuid;
    try {
      const res = await apiClient.client.get(`confd/1.1/endpoints/sip/templates/${templateUuid}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const endpointSipTemplatesAdd = async (template) => {
    try {
      const res = await apiClient.client.post(`confd/1.1/endpoints/sip/templates`, template);
      return res;
    } catch (e) {
      return e;
    }
  };

  const endpointSipTemplatesEdit = async (template) => {
    const templateUuid = template.uuid;
    try {
      const res = await apiClient.client.put(`confd/1.1/endpoints/sip/templates/${templateUuid}`, template);
      return res;
    } catch (e) {
      return e;
    }
  };

  const endpointSipTemplatesDelete = async (template) => {
    const templateUuid = template.uuid;
    try {
      const res = await apiClient.client.delete(`confd/1.1/endpoints/sip/templates/${templateUuid}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    endpointsCustom,
    setEndpointsCustom,
    endpointsCustomGet,
    endpointCustomGet,
    endpointCustomAdd,
    endpointCustomEdit,
    endpointCustomDelete,
    endpointsIax,
    setEndpointsIax,
    endpointsIaxGet,
    endpointIaxGet,
    endpointIaxAdd,
    endpointIaxEdit,
    endpointIaxDelete,
    endpointsSccp,
    setEndpointsSccp,
    endpointsSccpGet,
    endpointSccpGet,
    endpointSccpAdd,
    endpointSccpEdit,
    endpointSccpDelete,
    endpointsSip,
    setEndpointsSip,
    endpointsSipGet,
    endpointSipGet,
    endpointSipAdd,
    endpointSipEdit,
    endpointSipDelete,
    endpointsTypeGet,
    endpointTypeGet,
    endpointTypeAdd,
    endpointTypeEdit,
    endpointTypeDelete,
    endpointsSipTemplatesAll,
    setEndpointsSipTemplatesAll,
    endpointsSipTemplates,
    setEndpointsSipTemplates,
    endpointSipTemplateSelected,
    setEndpointSipTemplateSelected,
    endpointsSipTemplatesGet,
    endpointsSipTemplatesPageGet,
    endpointSipTemplatesGet,
    endpointSipTemplatesAdd,
    endpointSipTemplatesEdit,
    endpointSipTemplatesDelete
  };
};