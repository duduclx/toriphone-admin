import { useState } from "react";
import { useUsers } from "./Users";

export const useVoicemails = ({ apiClient }) => {
  // dependencies
  const { userVoicemailAssociate, userVoicemailDissociate } = useUsers({ apiClient });

  // values
  const [voicemails, setVoicemails] = useState({});
  const [voicemailSelected, setVoicemailSelected] = useState({});

  /**
   * Voicemails Get
   * @returns 
   */
  const voicemailsGet = async () => {
    const res = await apiClient.client.get("confd/1.1/voicemails?recurse=false");
    setVoicemails(res);
    return res;
  };

  /**
   * Voicemails Page Get
   * @param {*} limit 
   * @param {*} offset 
   * @returns 
   */
  const voicemailsPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const res = await apiClient.client.get(`confd/1.1/voicemails?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setVoicemails(res);
      return res;
    } else {
      const res = await apiClient.client.get(`confd/1.1/voicemails?recurse=false&limit=${limit}&offset=${offset}`);
      setVoicemails(res);
      return res;
    }
  }

  /**
   * Voicemail Get
   * @param {*} voicemailId 
   * @returns 
   */
  const voicemailGet = async (voicemailId) => {
    try {
      const res = await apiClient.client.get(`confd/1.1/voicemails/${voicemailId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  /**
   * Voicemail Add
   * @param {*} voicemail 
   * @returns 
   */
  const voicemailAdd = async (voicemail) => {
    try {
      const res = await apiClient.client.post("confd/1.1/voicemails", voicemail);
      return res;
    } catch (e) {
      return e;
    }
  };

  /**
   * Voicemail Create
   * @param {*} voicemail 
   * @returns 
   */
  const voicemailCreate = async (voicemail) => {
    /*
    voicemail.ask_password = voicemail.password && voicemail.password.length > 0 ? true : false;
    // should use interface language
    voicemail.language = "fr_FR";
    // should use interface language
    voicemail.timezone = "eu-fr";
    */

    const res = await voicemailAdd(voicemail);
    if (res.error) {
      return res;
    }
    if (voicemail.users[0]) {
      const asso = await userVoicemailAssociate(voicemail.users[0], res);
      if (asso.error) {
        return asso;
      }
    }
    return res;
  };

  /**
   * Voicemail Edit
   * @param {*} voicemail 
   * @returns 
   */
  const voicemailEdit = async (voicemail) => {
    const voicemailId = voicemail.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/voicemails/${voicemailId}`, voicemail);
      return res;
    } catch (e) {
      return e;
    }
  };

  /**
   * Voicemail Update
   * @param {*} voicemail 
   * @param {*} originalVoicemail 
   * @returns 
   */
  const voicemailUpdate = async (voicemail, originalVoicemail) => {
    if (voicemail.timezone === "none") {
      voicemail.timezone = null;
    }
    if (voicemail.language === "none") {
      voicemail.language = null;
    }
    // Met à jour le voicemail
    const res = await voicemailEdit(voicemail);
    if (res.error) {
      return res;
    }

    // Récupère les utilisateurs des voicemails actuel et original
    const newUser = voicemail.users[0];
    const oldUser = originalVoicemail.users[0];

    // Cas 1: originalVoicemail.users[0] n'existe pas mais voicemail.users[0] existe
    if (!oldUser && newUser) {
      const asso = await userVoicemailAssociate(newUser, voicemail);
      if (asso.error) {
        return asso;
      }
    }

    // Cas 2: originalVoicemail.users[0] n'existe pas et voicemail.users[0] n'existe pas
    // Ne rien faire

    // Cas 3: originalVoicemail.users[0] existe et voicemail.users[0] existe
    if (oldUser && newUser) {
      // Si les UUID sont différents, dissocier l'ancien et associer le nouveau
      if (oldUser.uuid !== newUser.uuid) {
        const diss = await userVoicemailDissociate(oldUser, voicemail);
        if (diss.error) {
          return diss;
        }
        const asso = await userVoicemailAssociate(newUser, voicemail);
        if (asso.error) {
          return asso;
        }
      }
    }

    // Cas 4: originalVoicemail.users[0] existe mais voicemail.users[0] n'existe pas
    if (oldUser && !newUser) {
      const diss = await userVoicemailDissociate(oldUser, voicemail);
      if (diss.error) {
        return diss;
      }
    }

    return res;
  };

  /**
   * Voicemail Delete
   * @param {*} voicemail 
   * @returns 
   */
  const voicemailDelete = async (voicemail) => {
    const voicemailId = voicemail.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/voicemails/${voicemailId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  /**
   * Voicemail Remove
   * @param {*} voicemail 
   * @returns 
   */
  const voicemailRemove = async (voicemail) => {
    // if users remove associate
    if (voicemail.users[0]) {
      const diss = await userVoicemailDissociate(voicemail.users[0]);
      if (diss.error) {
        return diss;
      }
    }
    // then delete voicemail
    const removed = await voicemailDelete(voicemail);
    return removed;
  };

  return {
    voicemails,
    setVoicemails,
    voicemailSelected,
    setVoicemailSelected,
    voicemailsGet,
    voicemailsPageGet,
    voicemailGet,
    voicemailAdd,
    voicemailCreate,
    voicemailEdit,
    voicemailUpdate,
    voicemailDelete,
    voicemailRemove,
  };
};
