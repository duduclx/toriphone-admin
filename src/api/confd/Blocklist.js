import { useState } from "react";

export const useBlocklist = ({ apiClient }) => {
  // values
  const [blocklistNumbers, setBlocklistNumbers] = useState({});
  const [blocklistNumber, setBlocklistNumber] = useState({});

  // functions
  const blocklistnumbersGet = async () => {
    try {
      const res = await apiClient.client.get(`confd/1.1/users/blocklist/numbers?recurse=false`);
      setBlocklistNumbers(res);
      return res;
    } catch (e) {
      return e;
    }
  };

  const blocklistnumbersPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const res = await apiClient.client.get(`confd/1.1/users/blocklist/numbers?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setBlocklistNumbers(res);
      return res;
    } else {
      const res = await apiClient.client.get(`confd/1.1/users/blocklist/numbers?recurse=false&limit=${limit}&offset=${offset}`);
      setBlocklistNumbers(res);
      return res;
    }
  }

  const blocklistnumberGet = async (number) => {
    const numberUuid = number.uuid;
    try {
      const res = await apiClient.client.get(`confd/1.1/users/blocklist/numbers/${numberUuid}`);
      setBlocklistNumber(res);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    blocklistNumbers,
    setBlocklistNumbers,
    blocklistNumber,
    setBlocklistNumber,
    blocklistnumbersGet,
    blocklistnumbersPageGet,
    blocklistnumberGet,
  };
};