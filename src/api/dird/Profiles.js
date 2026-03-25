import { useState } from "react";

export const useProfiles = ({ apiClient }) => {

  // values
  const [profiles, setProfiles] = useState({});
  const [profileSelected, setProfileSelected] = useState({})

  // functions
  const profilesGet = async () => {
    const res = await apiClient.client.get("dird/0.1/profiles?recurse=false");
    setProfiles(res);
    return res;
  };

  const profileGet = async (profile) => {
    const profileUuid = profile.uuid
    try {
        const res = await apiClient.client.get(`dird/0.1/profiles/${profileUuid}`)
        return res
    } catch(e) {
        return e
    }
  }

  const profileAdd = async (profile) => {
    try {
        const res = await apiClient.client.post(`dird/0.1/profiles`, profile)
        return res
    } catch(e) {
        return e
    }
  }

  const profileEdit = async (profile) => {
    const profileUuid = profile.uuid
    try {
        const res = await apiClient.client.put(`dird/0.1/profiles/${profileUuid}`, profile)
        return res
    } catch(e) {
        return e
    }
  }

  const profileDelete = async (profile) => {
    const profileUuid = profile.uuid
    try {
        const res = await apiClient.client.delete(`dird/0.1/profiles/${profileUuid}`)
        return res
    } catch(e) {
        return e
    }
  }

  return {
    profiles,
    setProfiles,
    profileSelected,
    setProfileSelected,
    profilesGet,
    profileGet,
    profileAdd,
    profileEdit,
    profileDelete,
  }
}