import { useState } from "react";
import { useAuth } from "toriphone-auth";

export const useConferences = () => {
  // requirements
  const { apiClient } = useAuth();

  // values
  const [conferencesSources, setConferencesSources] = useState({});
  const [conferences, setConferences] = useState({});
  const [conferencesList, setConferencesList] = useState({});
  const [conferencesContactsList, setConferencesContactsList] = useState({});
  const [conferenceWazoDefaultBridge, setConferenceWazoDefaultBridge] = useState({});
  const [conferenceWazoDefaultUser, setConferenceWazoDefaultUser] = useState({});

  // functions
  /*
    il y a un endpoint
    confd/1.1/conferences?recurse=false
    https://10.94.101.195/api/#!/conferences/list_conferences
    cela devrait m'éviter de chercher les sources, et boucler dessus !!
  */
  const conferencesSourcesGet = async () => {
    const conferencesSourcesList = await apiClient.client.get("dird/0.1/backends/conference/sources?recurse=false");
    setConferencesSources(conferencesSourcesList);
    return conferencesSourcesList;
  };

  const conferencesGet = async (sourceUuid) => {
    const conferencesList = await apiClient.client.get(`dird/0.1/backends/conference/sources/${sourceUuid}`);
    setConferences(conferencesList);
    return conferencesList;
  };

  const conferenceContactGet = async (sourceUuid) => {
    const contactsList = await apiClient.client.get(`dird/0.1/backends/conference/sources/${sourceUuid}/contacts`);
    setConferences(contactsList);
    return contactsList;
  };

  const conferencesContactsListGet = async () => {
    try {
      const sources = await conferencesSourcesGet();
      const conferencesContacts = [];
      for (const source of sources.items) {
        const contact = await conferenceContactGet(source.uuid);
        conferencesContacts.push(...contact.items);
      }
      const contactsObject = {
        total: conferencesContacts.length,
        items: conferencesContacts,
      };
      setConferencesContactsList(contactsObject);
    } catch (error) {
      //
    }
  };

  const conferencesListGet = async () => {
    try {
      const sources = await conferencesSourcesGet();
      const conferencesList = [];

      for (const source of sources.items) {
        const conferences = await conferencesGet(source.uuid);
        conferencesList.push(...conferences.items);
      }
      const conferencesObject = {
        total: conferencesList.length,
        items: conferencesList,
      };

      setConferencesList(conferencesObject);
    } catch (error) {
      console.error("Error fetching external config list:", error);
    }
  };

  const conferenceWazoDefaultBridgeGet = async () => {
    const defaultBridge = await apiClient.client.get(`confd/1.1/asterisk/confbridge/wazo_default_bridge`);
    setConferenceWazoDefaultBridge(defaultBridge);
    return defaultBridge;
  };

  const conferenceWazoDefaultUserGet = async () => {
    const defaultUser = await apiClient.client.get(`confd/1.1/asterisk/confbridge/wazo_default_user`);
    setConferenceWazoDefaultUser(defaultUser);
    return defaultUser;
  };

  return {
    conferencesSources,
    conferencesSourcesGet,
    conferences,
    conferencesGet,
    conferencesList,
    conferencesListGet,
    conferencesContactsList,
    conferencesContactsListGet,
    conferenceWazoDefaultBridge,
    conferenceWazoDefaultBridgeGet,
    conferenceWazoDefaultUser,
    conferenceWazoDefaultUserGet
  };
};
