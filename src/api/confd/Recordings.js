import { useState } from "react";

export const useRecordings = ({ apiClient }) => {
    
  // values
  const [recordingsAnnouncements, setRecordingsAnnouncements] = useState({});

  /**
   *
   * @returns
   */
  const recordingsAnnouncementsGet = async () => {
    const res = await apiClient.client.get(`confd/1.1/recordings/announcements`);
    setRecordingsAnnouncements(res);
    return res;
  };

  /**
   *
   * @param {*} announcements
   * @returns
   */
  const recordingsAnnouncementsEdit = async (announcements) => {
    try {
      const res = await apiClient.client.put(`confd/1.1/recordings/announcements`, announcements);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    recordingsAnnouncements,
    setRecordingsAnnouncements,
    recordingsAnnouncementsGet,
    recordingsAnnouncementsEdit,
  };
};
