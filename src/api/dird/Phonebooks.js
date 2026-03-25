import { useState } from "react";

export const usePhonebooks = ({ apiClient }) => {

  // values
  const [phonebooks, setPhonebooks] = useState({});
  const [phonebookSelected, setPhonebookSelected] = useState({});
  const [phonebookContacts, setPhonebookContacts] = useState({});
  const [phonebookContactSelected, setPhonebookContactSelected] = useState({});

  // functions
  const phonebooksGet = async () => {
    const res = await apiClient.client.get("dird/0.1/phonebooks?recurse=false");
    setPhonebooks(res);
    return res;
  };

  const phonebooksPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const res = await apiClient.client.get(`dird/0.1/phonebooks?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setPhonebooks(res);
      return res;
    } else {
      const res = await apiClient.client.get(`dird/0.1/phonebooks?recurse=false&limit=${limit}&offset=${offset}`);
      setPhonebooks(res);
      return res;
    }
  }

  const phonebookGet = async (phonebook) => {
    const phonebookUuid = phonebook.uuid;
    try {
      const res = await apiClient.client.get(`dird/0.1/phonebooks/${phonebookUuid}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const phonebookAdd = async (phonebook) => {
    try {
      const res = await apiClient.client.post(`dird/0.1/phonebooks`, phonebook);
      return res;
    } catch (e) {
      return e;
    }
  };

  const phonebookEdit = async (phonebook, phonebookDetails) => {
    const phonebookUuid = phonebook.uuid;
    try {
      const res = await apiClient.client.put(`dird/0.1/phonebooks/${phonebookUuid}`, phonebookDetails);
      return res;
    } catch (e) {
      return e;
    }
  };

  const phonebookDelete = async (phonebook) => {
    const phonebookUuid = phonebook.uuid;
    try {
      const res = await apiClient.client.delete(`dird/0.1/phonebooks/${phonebookUuid}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const phonebookContactsGet = async (phonebook) => {
    const phonebookUuid = phonebook.uuid;
    try {
      const res = await apiClient.client.get(`dird/0.1/phonebooks/${phonebookUuid}/contacts`);
      setPhonebookContacts(res);
      return res;
    } catch (e) {
      return e;
    }
  };

  const phonebookContactsPageGet = async (search = null, offset = 0, limit = 10) => {
    const phonebookUuid = phonebookSelected.uuid;
    if(search) {
      const res = await apiClient.client.get(`dird/0.1/phonebooks/${phonebookUuid}/contacts?limit=${limit}&offset=${offset}&search=${search}`);
      setPhonebookContacts(res);
      return res;
    } else {
      const res = await apiClient.client.get(`dird/0.1/phonebooks/${phonebookUuid}/contacts?limit=${limit}&offset=${offset}`);
      setPhonebookContacts(res);
      return res;
    }
  }

  const phonebookContactAdd = async (phonebook, contact) => {
    const phonebookUuid = phonebook.uuid;
    try {
      const res = await apiClient.client.post(`dird/0.1/phonebooks/${phonebookUuid}/contacts`, contact);
      return res;
    } catch (e) {
      return e;
    }
  };

  const phonebookContactEdit = async (phonebook, contact) => {
    const phonebookUuid = phonebook.uuid;
    const contactId = contact.id;
    try {
      const res = await apiClient.client.put(
        `dird/0.1/phonebooks/${phonebookUuid}/contacts/${contactId}`,
        contact
      );
      return res;
    } catch (e) {
      return e
    }
  };

  const phonebookContactDelete = async (phonebook, contact) => {
    const phonebookUuid = phonebook.uuid;
    const contactId = contact.id;
    try {
      const res = await apiClient.client.delete(`dird/0.1/phonebooks/${phonebookUuid}/contacts/${contactId}`);
      return res;
    } catch (e) {
      return e
    }
  };

  return {
    phonebooks,
    setPhonebooks,
    phonebookSelected,
    setPhonebookSelected,
    phonebookContacts,
    setPhonebookContacts,
    phonebookContactSelected,
    setPhonebookContactSelected,
    phonebooksGet,
    phonebooksPageGet,
    phonebookGet,
    phonebookAdd,
    phonebookEdit,
    phonebookDelete,
    phonebookContactsGet,
    phonebookContactsPageGet,
    phonebookContactAdd,
    phonebookContactEdit,
    phonebookContactDelete,
  };
};
