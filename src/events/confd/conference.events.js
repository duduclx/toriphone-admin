const conferenceEvents = () => {
  // conference_created
  const OnConferenceCreated = async (data) => {
    console.log("conference_created", data);
  };

  // conference_deleted
  const OnConferenceDeleted = async (data) => {
    console.log("conference_deleted", data);
  };

  // conference_edited
  const OnConferenceEdited = async (data) => {
    console.log("conference_edited", data);
  };

  // conference_extension_associated
  const OnConferenceExtensionAssociated = async (data) => {
    console.log("conference_extension_associated", data);
  };

  // conference_extension_dissociated
  const OnConferenceExtensionDissociated = async (data) => {
    console.log("conference_extension_dissociated", data);
  };

  return {
    OnConferenceCreated,
    OnConferenceDeleted,
    OnConferenceEdited,
    OnConferenceExtensionAssociated,
    OnConferenceExtensionDissociated,
  };
};

export default conferenceEvents;
