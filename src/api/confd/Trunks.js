import { useState } from "react";
import { useEndpoints } from "./Endpoints";
import { useRegisters } from "./Registers";

export const useTrunks = ({ apiClient }) => {
  
  // dependencies
  const { endpointTypeAdd, endpointTypeEdit } = useEndpoints({ apiClient });
  const { registersIaxAdd, registersIaxEdit, registersIaxDelete } = useRegisters({ apiClient });

  // values
  const [trunks, setTrunks] = useState({});
  const [trunkSelected, setTrunkSelected] = useState({});

  // functions
  const trunksGet = async () => {
    const res = await apiClient.client.get("confd/1.1/trunks?recurse=false");
    setTrunks(res);
    return res;
  };

  const trunksPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const res = await apiClient.client.get(`confd/1.1/trunks?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setTrunks(res);
      return res;
    } else {
      const res = await apiClient.client.get(`confd/1.1/trunks?recurse=false&limit=${limit}&offset=${offset}`);
      setTrunks(res);
      return res;
    }
  }

  const trunkGet = async (trunkId) => {
    try {
      const res = await apiClient.client.get(`confd/1.1/trunks/${trunkId}`);
      return res;
    } catch (e) {
      return e
    }
  };

  const trunkAdd = async (trunk) => {
    try {
      const res = await apiClient.client.post("confd/1.1/trunks", trunk);
      return res;
    } catch (e) {
      return e
    }
  };

  const trunkCreate = async (trunk) => {
    if (trunk.endpoint_sip) {
      const endpoint = await endpointTypeAdd("sip", trunk.endpoint_sip);
      if (endpoint.error) {
        return endpoint;
      }
      const tr = await trunkAdd(trunk);
      if (tr.error) {
        return tr;
      }
      await trunkEndpointTypeAssociate("sip", tr, endpoint);
      return tr;

    } else if (trunk.endpoint_custom) {
      const endpoint = await endpointTypeAdd("custom", trunk.endpoint_custom);
      if (endpoint.error) {
        return endpoint;
      }
      const tr = await trunkAdd(trunk);
      if (tr.error) {
        return tr;
      }
      await trunkEndpointTypeAssociate("custom", tr, endpoint);
      return tr;

    } else if (trunk.endpoint_iax) {
      const endpoint = await endpointTypeAdd("iax", trunk.endpoint_iax);
      if (endpoint.error) {
        return endpoint;
      }
      const tr = await trunkAdd(trunk);
      if (tr.error) {
        return tr;
      }
      await trunkEndpointTypeAssociate("iax", tr, endpoint);
      // register
      if (trunk.register_iax) {
        const iax = await registersIaxAdd(trunk.register);
        await trunkRegisterIaxAssociate(tr, iax);
      }
      return tr;
    }
  };

  const trunkEdit = async (trunk) => {
    const trunkId = trunk.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/trunks/${trunkId}`, trunk);
      return res
    } catch (e) {
      return e
    }
  };

  const trunkUpdate = async (trunk, originalTrunk) => {
    const tr = await trunkEdit(trunk)
    if (trunk.endpoint_sip) {
      const endpoint = await endpointTypeEdit("sip", trunk.endpoint_sip);
      if (endpoint.error) {
        return endpoint;
      }

    } else if (trunk.endpoint_custom) {
      const endpoint = await endpointTypeEdit("custom", trunk.endpoint_custom);
      if (endpoint.error) {
        return endpoint;
      }

    } else if (trunk.endpoint_iax) {
      const endpoint = await endpointTypeEdit("iax", trunk.endpoint_iax);
      if (endpoint.error) {
        return endpoint;
      }
      // if trunk.register_iax and !originalTrunk.register_iax
      if (trunk.register_iax && !originalTrunk.register_iax) {
        const iax = await registersIaxAdd(trunk.register);
        if(iax.error) {
          return iax
        }
        await trunkRegisterIaxAssociate(tr, iax);
      }
      // trunk.register_iax and originalTrunk.register_iax
      if (trunk.register_iax && originalTrunk.register_iax) {
        await registersIaxEdit(trunk.register);
      }
      // !trunk.register_iax and originalTrunk.register_iax
      if (!trunk.register_iax && originalTrunk.register_iax) {
        await registersIaxDelete(trunk.register);
      }
    }
    return tr;
  };

  const trunkDelete = async (trunk) => {
    const trunkId = trunk.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/trunks/${trunkId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const trunkEndpointCustomAssociate = async (trunk, custom) => {
    const trunkId = trunk.id;
    const customId = custom.id
    try {
      const res = await apiClient.client.put(`confd/1.1/trunks/${trunkId}/endpoints/custom/${customId}`);
      return res
    } catch (e) {
      return e
    }
  }

  const trunkEndpointCustomDissociate = async (trunk, custom) => {
    const trunkId = trunk.id;
    const customId = custom.id
    try {
        const res = await apiClient.client.delete(`confd/1.1/trunks/${trunkId}/endpoints/custom/${customId}`);
        return res;
      } catch (e) {
        return e;
      }
  }

  const trunkEndpointIaxAssociate = async (trunk, iax) => {
    const trunkId = trunk.id;
    const iaxId = iax.id
    try {
      const res = await apiClient.client.put(`confd/1.1/trunks/${trunkId}/endpoints/iax/${iaxId}`);
      return res
    } catch (e) {
      return e
    }
  }

  const trunkEndpointIaxDissociate = async (trunk, iax) => {
    const trunkId = trunk.id;
    const iaxId = iax.id
    try {
        const res = await apiClient.client.delete(`confd/1.1/trunks/${trunkId}/endpoints/iax/${iaxId}`);
        return res;
      } catch (e) {
        return e;
      }
  }

  const trunkEndpointSipAssociate = async (trunk, sip) => {
    const trunkId = trunk.id;
    const sipUuid = sip.uuid
    try {
      const res = await apiClient.client.put(`confd/1.1/trunks/${trunkId}/endpoints/sip/${sipUuid}`);
      return res
    } catch (e) {
      return e
    }
  }

  const trunkEndpointSipDissociate = async (trunk, sip) => {
    const trunkId = trunk.id;
    const sipUuid = sip.uuid
    try {
        const res = await apiClient.client.delete(`confd/1.1/trunks/${trunkId}/endpoints/sip/${sipUuid}`);
        return res;
      } catch (e) {
        return e;
      }
  }

  const trunkEndpointTypeAssociate = async (type, trunk, endpoint) => {
    const endpointId = endpoint.id ? endpoint.id : endpoint.uuid;
    const trunkId = trunk.id;
    try {
        const res = await apiClient.client.put(`confd/1.1/trunks/${trunkId}/endpoints/${type}/${endpointId}`);
        return res;
      } catch (e) {
        return e;
      }
  }

  const trunkEndpointTypeDissociate = async (type, trunk, endpoint) => {
    const endpointId = endpoint.id ? endpoint.id : endpoint.uuid;
    const trunkId = trunk.id;
    try {
        const res = await apiClient.client.delete(`confd/1.1/trunks/${trunkId}/endpoints/${type}/${endpointId}`);
        return res;
      } catch (e) {
        return e;
      }
  }

  const trunkRegisterIaxAssociate = async (trunk, iax) => {
    const trunkId = trunk.id;
    const iaxId = iax.id
    try {
      const res = await apiClient.client.put(`confd/1.1/trunks/${trunkId}/registers/iax/${iaxId}`);
      return res
    } catch (e) {
      return e
    }
  }

  const trunkRegisterIaxDissociate = async (trunk, iax) => {
    const trunkId = trunk.id;
    const iaxId = iax.id
    try {
        const res = await apiClient.client.delete(`confd/1.1/trunks/${trunkId}/registers/iax/${iaxId}`);
        return res;
      } catch (e) {
        return e;
      }
  }

  

  return {
    trunks,
    setTrunks,
    trunkSelected,
    setTrunkSelected,
    trunksGet,
    trunksPageGet,
    trunkGet,
    trunkAdd,
    trunkCreate,
    trunkEdit,
    trunkUpdate,
    trunkDelete,
    trunkEndpointCustomAssociate,
    trunkEndpointCustomDissociate,
    trunkEndpointIaxAssociate,
    trunkEndpointIaxDissociate,
    trunkEndpointSipAssociate,
    trunkEndpointSipDissociate,
    trunkEndpointTypeAssociate,
    trunkEndpointTypeDissociate,
    trunkRegisterIaxAssociate,
    trunkRegisterIaxDissociate
  };
};
