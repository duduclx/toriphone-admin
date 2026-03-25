import { useState } from "react";
import { useExtensions } from "./Extensions";

export const useConferences = ({ apiClient }) => {

  // dependencies
  const { extensionCreate, extensionDelete } = useExtensions({ apiClient });

  // values
  const [conferencesAll, setConferencesAll] = useState({});
  const [conferences, setConferences] = useState({});
  const [conferenceSelected, setConferenceSelected] = useState({});

  // functions
  const conferencesGet = async () => {
    try {
      const res = await apiClient.client.get(`confd/1.1/conferences?recurse=false`);
      setConferencesAll(res);
      return res;
    } catch (e) {
      return e;
    }
  };

  const conferencesPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const res = await apiClient.client.get(`confd/1.1/conferences?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setConferences(res);
      return res
    } else {
      const res = await apiClient.client.get(`confd/1.1/conferences?recurse=false&limit=${limit}&offset=${offset}`);
      setConferences(res);
      return res
    }
  }

  const conferenceGet = async (conference) => {
    const conferenceId = conference.id;
    try {
      const res = await apiClient.client.get(`confd/1.1/conferences/${conferenceId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const conferenceAdd = async (conference) => {
    try {
      const res = await apiClient.client.post(`confd/1.1/conferences`, conference);
      return res;
    } catch (e) {
      return e;
    }
  };

  const conferenceCreate = async (conference, line) => {
    const createdConference = await conferenceAdd(conference);
    if (createdConference.error) {
      return createdConference;
    }
    const createdLine = await extensionCreate(line);
    if (createdLine.error) {
      return createdLine;
    }
    const res = await conferenceExtensionsAssociate(createdConference, createdLine);
    return res;
  };

  const conferenceEdit = async (conference) => {
    const conferenceId = conference.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/conferences/${conferenceId}`, conference);
      return res;
    } catch (e) {
      return e;
    }
  };

  const conferenceUpdate = async (conference, line) => {
    const res = await conferenceEdit(conference);
    if (res.error) {
      return res;
    }

    // extension
    if (conference.extensions && conference.extensions.length > 0) {
      if (line.exten !== conference.extensions[0].exten) {
        const diss = await conferenceExtensionsDissociate(conference, conference.extensions[0]);
        if (diss.error) {
          return diss;
        }
        const remove = await extensionDelete(conference.extensions[0]);
        if (remove.error) {
          return remove;
        }
        const createdLine = await extensionCreate(line);
        if (createdLine.error) {
          return createdLine;
        }
        await conferenceExtensionsAssociate(conference, createdLine);
      }
    } else {
      const createdLine = await extensionCreate(line);
      if (createdLine.error) {
        return createdLine;
      }
      const asso = await conferenceExtensionsAssociate(conference, createdLine);
      if (asso.error) {
        return asso;
      }
    }

    return res;
  };

  const conferenceDelete = async (conference) => {
    const conferenceId = conference.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/conferences/${conferenceId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const conferenceRemove = async (conference) => {
    if (conference.extensions[0]) {
      const diss = await conferenceExtensionsDissociate(conference, conference.extensions[0]);
      if (diss.error) {
        return diss;
      }
      const del = await extensionDelete(conference.extensions[0]);
      if (del.error) {
        return del;
      }
    }
    const res = await conferenceDelete(conference);
    return res;
  };

  const conferenceExtensionsAssociate = async (conference, extension) => {
    const conferenceId = conference.id;
    const extensionId = extension.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/conferences/${conferenceId}/extensions/${extensionId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const conferenceExtensionsDissociate = async (conference, extension) => {
    const conferenceId = conference.id;
    const extensionId = extension.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/conferences/${conferenceId}/extensions/${extensionId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    conferencesAll,
    setConferencesAll,
    conferences,
    setConferences,
    conferenceSelected,
    setConferenceSelected,
    conferencesGet,
    conferencesPageGet,
    conferenceGet,
    conferenceAdd,
    conferenceCreate,
    conferenceEdit,
    conferenceUpdate,
    conferenceDelete,
    conferenceRemove,
    conferenceExtensionsAssociate,
    conferenceExtensionsDissociate,
  };
};
