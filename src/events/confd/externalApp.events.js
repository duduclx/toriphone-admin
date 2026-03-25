const externalAppEvents = () => {
  // external_app_created
  const OnExternalAppCreated = async (data) => {
    console.log("external_app_created", data);
  };

  // external_app_deleted
  const OnExternalAppDeleted = async (data) => {
    console.log("external_app_deleted", data);
  };

  // external_app_edited
  const OnExternalAppEdited = async (data) => {
    console.log("external_app_edited", data);
  };

  return {
    OnExternalAppCreated,
    OnExternalAppDeleted,
    OnExternalAppEdited,
  };
};

export default externalAppEvents;
