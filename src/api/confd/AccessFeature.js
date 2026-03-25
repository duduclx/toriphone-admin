import { useState } from "react";

export const useAccessFeature = ({ apiClient }) => {

  // values
  const [accessFeatures, setAccessFeatures] = useState({});
  const [accessFeatureSelected, setAccessFeatureSelected] = useState({});

  // functions
  const accessFeaturesGet = async () => {
    const res = await apiClient.client.get("confd/1.1/access_features");
    setAccessFeatures(res);
    return res;
  };

  const accessFeaturesPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const res = await apiClient.client.get(`confd/1.1/access_features?limit=${limit}&offset=${offset}&search=${search}`);
      setAccessFeatures(res);
      return res;
    } else {
      const res = await apiClient.client.get(`confd/1.1/access_features?limit=${limit}&offset=${offset}`);
      setAccessFeatures(res);
      return res;
    }
  }

  const accessFeatureGet = async (accessFeature) => {
    const accessfeatureId = accessFeature.id;
    try {
      const res = await apiClient.client.get(`confd/1.1/access_features/${accessfeatureId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const accessFeatureAdd = async (accessFeature) => {
    try {
      const res = await apiClient.client.post(`confd/1.1/access_features`, accessFeature);
      return res;
    } catch (e) {
      return e;
    }
  };

  const accessFeatureEdit = async (accessFeature) => {
    const accessfeatureId = accessFeature.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/access_features/${accessfeatureId}`, accessFeature);
      return res;
    } catch (e) {
      return e;
    }
  };

  const accessFeatureDelete = async (accessFeature) => {
    const accessfeatureId = accessFeature.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/access_features/${accessfeatureId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    accessFeatures,
    setAccessFeatures,
    accessFeatureSelected,
    setAccessFeatureSelected,
    accessFeaturesGet,
    accessFeaturesPageGet,
    accessFeatureGet,
    accessFeatureAdd,
    accessFeatureEdit,
    accessFeatureDelete,
  };
};
