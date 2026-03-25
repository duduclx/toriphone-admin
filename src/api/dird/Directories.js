import { useState } from "react";

export const useDirectories = ({ apiClient }) => {

  // values
  const [directoriesSources, setDirectoriesSources] = useState({});
  const profile = "default"

  // functions
  const directoriesSourcesGet = async () => {
    const res = await apiClient.client.get(`dird/0.1/directories/${profile}/sources`);
    setDirectoriesSources(res);
    return res;
  };

  const directoriesSourcesUserGet = async (limit = 1, term) => {
    const res = await apiClient.client.get(`dird/0.1/directories/${profile}/sources?limit=${limit}&search=${term}`);
    return res;
  };

  const directoriesFavoritesGet = async () => {
    try {
      const res = await apiClient.client.get(`dird/0.1/directories/favorites/${profile}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const directoriesFavoritesAdd = async (directory, contact) => {
    const contactId = contact.id
    try {
      const res = await apiClient.client.put(`dird/0.1/directories/favorites/${directory}/${contactId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const directoriesFavoritesRemove = async (directory, contact) => {
    const contactId = contact.id
    try {
      const res = await apiClient.client.delete(`dird/0.1/directories/favorites/${directory}/${contactId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const directoriesSearchContacts = async (term) => {
    try {
        const res = await apiClient.client.get(`dird/0.1/directories/lookup/${profile}?term=${term}`)
        return res
    } catch (e) {
        return e
    }
  }

  const directoriesSearchContactAsUser = async (user, term) => {
    const userUuid = user.uuid
    try {
        const res = await apiClient.client.get(`dird/0.1/directories/lookup/${profile}/${userUuid}?term=${term}`)
        return res
    } catch (e) {
        return e
    }
  }

  const directoriesHeadersGet = async () => {
    try {
        const res = await apiClient.client.get(`dird/0.1/directories/lookup/${profile}/headers`)
        return res
    } catch (e) {
        return e
    }
  }

  const directoriesPersonalsGet = async () => {
    try {
        const res = await apiClient.client.get(`dird/0.1/directories/personal/${profile}`)
        return res
    } catch (e) {
        return e
    }
  }

  const directoriesSearchReverseAsUser = async (user, exten) => {
    const userUuid = user.uuid
    try {
        const res = await apiClient.client.get(`dird/0.1/directories/reverse/${profile}/${userUuid}?exten=${exten}`)
        return res
    } catch (e) {
        return e
    }
  }

  return {
    directoriesSources,
    setDirectoriesSources,
    directoriesSourcesGet,
    directoriesSourcesUserGet,
    directoriesFavoritesGet,
    directoriesFavoritesAdd,
    directoriesFavoritesRemove,
    directoriesSearchContacts,
    directoriesSearchContactAsUser,
    directoriesHeadersGet,
    directoriesPersonalsGet,
    directoriesSearchReverseAsUser
  };
};
