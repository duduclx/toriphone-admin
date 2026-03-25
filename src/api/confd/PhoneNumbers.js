import { useState } from "react";

export const usePhoneNumbers = ({ apiClient }) => {

  // values
  const [phoneNumbers, setPhoneNumbers] = useState({});
  const [phoneNumbersSelected, setPhoneNumbersSelected] = useState({});

  // functions
  const phoneNumbersGet = async () => {
    const res = await apiClient.client.get("confd/1.1/phone-numbers?recurse=false");
    setPhoneNumbers(res);
    return res;
  };

  const phoneNumbersPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const res = await apiClient.client.get(`confd/1.1/phone-numbers?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setPhoneNumbers(res);
      return res;
    } else {
      const res = await apiClient.client.get(`confd/1.1/phone-numbers?recurse=false&limit=${limit}&offset=${offset}`);
      setPhoneNumbers(res);
      return res;
    }
  }

  const phoneNumberGet = async (phoneNumber) => {
    const phoneNumberUuid = phoneNumber.uuid;
    try {
      const res = await apiClient.client.get(`confd/1.1/phone-numbers/${phoneNumberUuid}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const phoneNumberAdd = async (phoneNumber) => {
    try {
      const res = await apiClient.client.post("confd/1.1/phone-numbers", phoneNumber);
      return res;
    } catch (e) {
      return e;
    }
  };

  const phoneNumberEdit = async (phoneNumber) => {
    const phoneNumberUuid = phoneNumber.uuid;
    try {
      const res = await apiClient.client.put(`confd/1.1/phone-numbers/${phoneNumberUuid}`, phoneNumber );
      return res;
    } catch (e) {
      return e;
    }
  };

  const phoneNumberDelete = async (phoneNumber) => {
    const phoneNumberUuid = phoneNumber.uuid;
    try {
      const res = await apiClient.client.delete(`confd/1.1/phone-numbers/${phoneNumberUuid}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const phoneNumbersRangeAdd = async (range) => {
    try {
      const res = await apiClient.client.post("confd/1.1/phone-numbers/ranges", range);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    phoneNumbers,
    setPhoneNumbers,
    phoneNumbersSelected,
    setPhoneNumbersSelected,
    phoneNumbersGet,
    phoneNumbersPageGet,
    phoneNumberGet,
    phoneNumberAdd,
    phoneNumberEdit,
    phoneNumberDelete,
    phoneNumbersRangeAdd,
  };
};
