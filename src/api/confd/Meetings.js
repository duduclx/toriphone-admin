import { useState } from "react";

export const useMeetings = ({ apiClient }) => {

  // values
  const [meetings, setMeetings] = useState({});
  const [meetingSelected, setMeetingSelected] = useState({})

  // functions
  const meetingsGet = async () => {
    try {
      const res = await apiClient.client.get(`confd/1.1/meetings?recurse=false`);
      setMeetings(res)
      return res;
    } catch (e) {
      return e;
    }
  };

  const meetingsPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const res = await apiClient.client.get(`confd/1.1/meetings?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setMeetings(res)
      return res;
    } else {
      const res = await apiClient.client.get(`confd/1.1/meetings?recurse=false&limit=${limit}&offset=${offset}`);
      setMeetings(res)
      return res;
    }
  }

  const meetingGet = async (meeting) => {
    const meetingUuid = meeting.uuid
    try {
      const res = await apiClient.client.get(`confd/1.1/meetings/${meetingUuid}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const meetingCreate = async (meeting) => {
    try {
      const res = await apiClient.client.post(`confd/1.1/meetings`, meeting);
      return res;
    } catch (e) {
      return e;
    }
  };

  const meetingUpdate = async (meeting) => {
    const meetingUuid = meeting.uuid
    try {
      const res = await apiClient.client.put(`confd/1.1/meetings/${meetingUuid}`, meeting);
      return res;
    } catch (e) {
      return e;
    }
  };

  const meetingDelete = async (meeting) => {
    const meetingUuid = meeting.uuid
    try {
      const res = await apiClient.client.delete(`confd/1.1/meetings/${meetingUuid}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    meetings,
    setMeetings,
    meetingSelected,
    setMeetingSelected,
    meetingsGet,
    meetingsPageGet,
    meetingGet,
    meetingCreate,
    meetingUpdate,
    meetingDelete
  }
}