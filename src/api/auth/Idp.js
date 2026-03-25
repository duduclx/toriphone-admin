import { useState } from "react";

export const useIdp = ({ apiClient }) => {
  // values
  const [idp, setIdp] = useState({});

  // functions
  const idpGet = async () => {
    const res = await apiClient.client.get("auth/0.1/idp");
    setIdp(res);
    return res;
  };

  const idpUsersAssociate = async (idp_type, users) => {
    try {
      const res = await apiClient.client.put(`auth/0.1/idp/${idp_type}/users`, users);
      return res;
    } catch (e) {
      return e;
    }
  };

  const idpUserAssociate = async (idp_type, user) => {
    const userUuid = user.uuid;
    try {
      const res = await apiClient.client.put(`auth/0.1/idp/${idp_type}/users/${userUuid}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const idpUserDissociate = async (idp_type, user) => {
    const userUuid = user.uuid;
    try {
      const res = await apiClient.client.delete(`auth/0.1/idp/${idp_type}/users/${userUuid}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    idp,
    setIdp,
    idpGet,
    idpUsersAssociate,
    idpUserAssociate,
    idpUserDissociate,
  };
};
