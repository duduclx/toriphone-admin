import { useState } from "react";

export const useRegisters = ({ apiClient }) => {
    
  // values
  const [registersIaxs, setRegistersIaxs] = useState({});

  // functions
  const registersIaxsGet = async () => {
    const res = await apiClient.client.get("confd/1.1/registers/iax");
    setRegistersIaxs(res);
    return res;
  };

  const registersIaxGet = async (iax) => {
    const iaxId = iax.id;
    try {
      const res = await apiClient.client.get(`confd/1.1/registers/iax/${iaxId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const registersIaxAdd = async (iax) => {
    try {
      const res = await apiClient.client.post(`confd/1.1/registers/iax`, iax);
      return res;
    } catch (e) {
      return e;
    }
  };

  const registersIaxEdit = async (iax) => {
    const iaxId = iax.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/registers/iax/${iaxId}`, iax);
      return res;
    } catch (e) {
      return e;
    }
  };

  const registersIaxDelete = async (iax) => {
    const iaxId = iax.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/registers/iax/${iaxId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    registersIaxs,
    setRegistersIaxs,
    registersIaxsGet,
    registersIaxGet,
    registersIaxAdd,
    registersIaxEdit,
    registersIaxDelete,
  };
};
