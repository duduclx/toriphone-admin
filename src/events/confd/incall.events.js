const incallEvents = () => {
  // incall_created
  const OnIncallCreated = async (data) => {
    console.log("incall_created", data);
  };

  // incall_deleted
  const OnIncallDeleted = async (data) => {
    console.log("incall_deleted", data);
  };

  // incall_edited
  const OnIncallEdited = async (data) => {
    console.log("incall_edited", data);
  };

  // incall_extension_associated
  const OnIncallExtensionAssociated = async (data) => {
    console.log("incall_extension_associated", data);
  };

  // incall_extension_dissociated
  const OnIncallExtensionDissociated = async (data) => {
    console.log("incall_extension_dissociated", data);
  };

  // incall_schedule_associated
  const OnIncallScheduleAssociated = async (data) => {
    console.log("incall_schedule_associated", data);
  };

  // incall_schedule_dissociated
  const OnIncallScheduleDissociated = async (data) => {
    console.log("incall_schedule_dissociated", data);
  };

  return {
    OnIncallCreated,
    OnIncallDeleted,
    OnIncallEdited,
    OnIncallExtensionAssociated,
    OnIncallExtensionDissociated,
    OnIncallScheduleAssociated,
    OnIncallScheduleDissociated,
  };
};

export default incallEvents;
