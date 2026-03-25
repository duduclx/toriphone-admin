import { useState } from "react";

export const useSessions = ({ apiClient }) => {
  
  // values
  const [sessions, setSessions] = useState({});

  // functions
  const sessionsGet = async () => {
    const res = await apiClient.client.get("auth/0.1/sessions?recurse=false");
    setSessions(res);
    return res;
  };

  const sessionsPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const res = await apiClient.client.get(`auth/0.1/sessions?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setSessions(res);
      return res;
    } else {
      const res = await apiClient.client.get(`auth/0.1/sessions?recurse=false&limit=${limit}&offset=${offset}`);
      setSessions(res);
      return res;
    }
  }

  const sessionDelete = async (session) => {
    const sessionUuid = session.uuid;
    try {
      const res = await apiClient.client.delete(`auth/0.1/sessions/${sessionUuid}`);
      return res;
    } catch (e) {
      return false;
    }
  };

  const sessionsUserGet = async (user) => {
    const userUuid = user.uuid;
    const res = await apiClient.client.get(`auth/0.1/users/${userUuid}/sessions?offset=0`);
    return res
  }

  const sessionsUserDelete = async (sessions) => {
    if (!sessions?.items?.length) return;
    await Promise.all(sessions.items.map((item) => sessionDelete(item)));
  }

  return {
    sessions,
    setSessions,
    sessionsGet,
    sessionsPageGet,
    sessionDelete,
    sessionsUserGet,
    sessionsUserDelete
  };
};
