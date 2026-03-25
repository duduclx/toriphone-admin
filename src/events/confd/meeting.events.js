const meetingEvents = () => {
  // meeting_created
  const onMeetingCreated = (data) => {
    console.log("meeting_created", data);
  };

  // meeting_deleted
  const onMeetingDeleted = (data) => {
    console.log("meeting_deleted", data);
  };

  // meeting_guest_authorization_created
  const onMeetingGuestAuthorizationCreated = (data) => {
    console.log("meeting_guest_authorization_created", data);
  };

  // meeting_guest_authorization_deleted
  const onMeetingGuestAuthorizationDeleted = (data) => {
    console.log("meeting_guest_authorization_deleted", data);
  };

  // meeting_guest_authorization_updated
  const onMeetingGuestAuthorizationUpdated = (data) => {
    console.log("meeting_guest_authorization_updated", data);
  };

  // meeting_progress
  const onMeetingProgress = (data) => {
    console.log("meeting_progress", data);
  };

  // meeting_updated
  const onMeetingUpdated = (data) => {
    console.log("meeting_updated", data);
  };

  // meeting_user_guest_authorization_created
  const onMeetingUserGuestAuthorizationCreated = (data) => {
    console.log("meeting_user_guest_authorization_created", data);
  };

  // meeting_user_guest_authorization_deleted
  const onMeetingUserGuestAuthorizationDeleted = (data) => {
    console.log("meeting_user_guest_authorization_deleted", data);
  };

  // meeting_user_guest_authorization_updated
  const onMeetingUserGuestAuthorizationUpdated = (data) => {
    console.log("meeting_user_guest_authorization_updated", data);
  };

  // meeting_user_progress
  const onMeetingUserProgress = (data) => {
    console.log("meeting_user_progress", data);
  };

  return {
    onMeetingCreated,
    onMeetingDeleted,
    onMeetingGuestAuthorizationCreated,
    onMeetingGuestAuthorizationDeleted,
    onMeetingGuestAuthorizationUpdated,
    onMeetingProgress,
    onMeetingUpdated,
    onMeetingUserGuestAuthorizationCreated,
    onMeetingUserGuestAuthorizationDeleted,
    onMeetingUserGuestAuthorizationUpdated,
    onMeetingUserProgress,
  };
};

export default meetingEvents;
