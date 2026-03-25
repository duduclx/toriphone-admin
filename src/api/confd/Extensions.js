import { useState } from "react";

export const useExtensions = ({ apiClient }) => {

  // values
  const [extensions, setExtensions] = useState({});
  const [extensionSelected, setExtensionSelected] = useState({});
  const [extensionsFeature, setExtensionsFeature] = useState({})

  // functions
  const extensionsGet = async () => {
    const res = await apiClient.client.get("confd/1.1/extensions?recurse=false");
    setExtensions(res);
    return res;
  };

  const extensionsPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const res = await apiClient.client.get(`confd/1.1/extensions?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setExtensions(res);
      return res;
    } else {
      const res = await apiClient.client.get(`confd/1.1/extensions?recurse=false&limit=${limit}&offset=${offset}`);
      setExtensions(res);
      return res;
    }
  }

  const extensionGet = async (extension) => {
    const extensionId = extension.id;
    try {
      const res = await apiClient.client.get(`confd/1.1/extensions/${extensionId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const extensionCreate = async (extension) => {
    const newExtension = {
      context: extension.context,
      exten: extension.exten.toString(),
    };
    try {
      const res = await apiClient.client.post("confd/1.1/extensions", newExtension);
      return res;
    } catch (e) {
      return e;
    }
  };

  const extensionUpdate = async (extension) => {
    const extensionId = extension.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/extensions/${extensionId}`, extension);
      return res;
    } catch (e) {
      return e;
    }
  };

  const extensionDelete = async (extension) => {
    const extensionId = extension.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/extensions/${extensionId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const extensionsFeaturesGet = async () => {
    const res = await apiClient.client.get("confd/1.1/extensions/features");
    setExtensionsFeature(res);
    return res;
  }

  const extensionsFeatureGet = async (extension) => {
    const extensionUuid = extension.uuid;
    try {
      const res = await apiClient.client.get(`confd/1.1/extensions/features/${extensionUuid}`);
      return res
    } catch (e) {
      return res
    }
  }

  const extensionsFeatureEdit = async (extension) => {
    const extensionUuid = extension.uuid;
    try {
      const res = await apiClient.client.put(`confd/1.1/extensions/features/${extensionUuid}`, extension);
      return res
    } catch (e) {
      return e
    }
  }

  return {
    extensions,
    setExtensions,
    extensionSelected,
    setExtensionSelected,
    extensionsFeature,
    setExtensionsFeature,
    extensionsGet,
    extensionsPageGet,
    extensionGet,
    extensionCreate,
    extensionUpdate,
    extensionDelete,
    extensionsFeaturesGet,
    extensionsFeatureGet,
    extensionsFeatureEdit
  };
};
