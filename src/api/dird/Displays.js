import { useState } from "react";

export const useDisplays = ({ apiClient }) => {

  // values
  const [displays, setDisplays] = useState({});
  const [displaySelected, setDisplaySelected] = useState({})

  // functions
  const displaysGet = async () => {
    const res = await apiClient.client.get("dird/0.1/displays?recurse=false");
    setDisplays(res);
    return res;
  };

  const displayGet = async (display) => {
    const displayUuid = display.uuid
    try {
        const res = await apiClient.client.get(`dird/0.1/displays/${displayUuid}`)
        return res
    } catch(e) {
        return e
    }
  }

  const displayAdd = async (display) => {
    try {
        const res = await apiClient.client.post(`dird/0.1/displays`, display)
        return res
    } catch(e) {
        return e
    }
  }

  const displayEdit = async (display) => {
    const displayUuid = display.uuid
    try {
        const res = await apiClient.client.put(`dird/0.1/displays/${displayUuid}`, display)
        return res
    } catch(e) {
        return e
    }
  }

  const displayDelete = async (display) => {
    const displayUuid = display.uuid
    try {
        const res = await apiClient.client.delete(`dird/0.1/displays/${displayUuid}`)
        return res
    } catch(e) {
        return e
    }
  }

  return {
    displays,
    setDisplays,
    displaySelected,
    setDisplaySelected,
    displaysGet,
    displayGet,
    displayAdd,
    displayEdit,
    displayDelete
  }
}