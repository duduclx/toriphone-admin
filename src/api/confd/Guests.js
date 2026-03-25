import { useState } from "react";

export const useGuests = ({ apiClient }) => {

  // values
  const [guestsMeetingsAuthorizations, setGuestsMeetingsAuthorizations] = useState({});

  // functions
  const guestsMeetingsAuthorizationsCreate = async (guest, meeting, authorization) => {
    const guestUuid = guest.uuid
    const meetingUuid = meeting.uuid
    try {
      const res = await apiClient.client.post(`confd/1.1/guests/${guestUuid}/meetings/${meetingUuid}/authorizations`, authorization);
      return res;
    } catch (e) {
      return e;
    }
  };

  const guestsMeetingsAuthorisationGet = async (guest, meeting, authorization) => {
    const guestUuid = guest.uuid
    const meetingUuid = meeting.uuid
    const authorizationUuid = authorization.uuid
    try {
      const res = await apiClient.client.get(`confd/1.1/guests/${guestUuid}/meetings/${meetingUuid}/authorizations/${authorizationUuid}`);
      return res;
    } catch (e) {
      return e;
    }
  }

  return {
    guestsMeetingsAuthorizations,
    setGuestsMeetingsAuthorizations,
    guestsMeetingsAuthorizationsCreate,
    guestsMeetingsAuthorisationGet
  }
}