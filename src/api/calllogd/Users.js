import { useState } from "react";

export const useUsers = ({ apiClient }) => {

  // values
  const [userCdr, setUserCdr] = useState({});
  const [userMeCdr, setUserMeCdr] = useState({});

  // functions
  const userCdrGet = async (user) => {
    const userUuid = user.uuid;
    const cdr = await apiClient.client.get(`call-logd/1.0/users/${userUuid}/cdr`);
    setUserCdr(cdr)
    return cdr;
  };

  const userMeCdrGet = async () => {
    const cdr = await apiClient.client.get(`call-logd/1.0/users/me/cdr`);
    setUserMeCdr(cdr)
    return cdr;
  };

  return {
    userCdr,
    setUserCdr,
    userCdrGet,
    userMeCdr,
    setUserMeCdr,
    userMeCdrGet
  }
}