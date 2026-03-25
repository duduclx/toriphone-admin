import { useState } from "react";

export const useIngresses = ({ apiClient }) => {

  // values
  const [ingresses, setIngresses] = useState({});
  const [ingressSelected, setIgressSelected] = useState({});

  // functions
  const ingressesGet = async () => {
    const ingresses = await apiClient.client.get("confd/1.1/ingresses/http?recurse=false");
    setIngresses(ingresses);
    return ingresses;
  };

  const ingressGet = async (ingress) => {
    const ingressUuid = ingress.uuid;
    try {
      const res = await apiClient.client.get(`confd/1.1/ingresses/http/${ingressUuid}`);
      return res;
    } catch (e) {
      return e
    }
  };

  const ingressAdd = async (ingress) => {
    try {
      const res = await apiClient.client.post("confd/1.1/ingresses/http", ingress);
      return res;
    } catch (e) {
      return e
    }
  };

  const ingressEdit = async (ingress) => {
    const ingressUuid = ingress.uuid;
    try {
      const res = await apiClient.client.put(`confd/1.1/ingresses/http/${ingressUuid}`, ingress);
      return res
    } catch (e) {
      return e
    }
  };

  const ingressDelete = async (ingress) => {
    const ingressUuid = ingress.uuid;
    try {
      const res = await apiClient.client.delete(`confd/1.1/ingresses/http/${ingressUuid}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    ingresses,
    setIngresses,
    ingressSelected,
    setIgressSelected,
    ingressesGet,
    ingressGet,
    ingressAdd,
    ingressEdit,
    ingressDelete
  };
};
