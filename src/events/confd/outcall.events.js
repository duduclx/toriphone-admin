const outcallEvents = () => {
  // outcall_call_permission_associated
  const onOutcallCallPermissionAssociated = (data) => {
    console.log("outcall_call_permission_associated", data);
  };

  // outcall_call_permission_dissociated
  const onOutcallCallPermissionDissociated = (data) => {
    console.log("outcall_call_permission_dissociated", data);
  };

  // outcall_created
  const onOutcallCreated = (data) => {
    console.log("outcall_created", data);
  };

  // outcall_deleted
  const onOutcallDeleted = (data) => {
    console.log("outcall_deleted", data);
  };

  // outcall_edited
  const onOutcallEdited = (data) => {
    console.log("outcall_edited", data);
  };

  // outcall_extension_associated
  const onOutcallExtensionAssociated = (data) => {
    console.log("outcall_extension_associated", data);
  };

  // outcall_extension_dissociated
  const onOutcallExtensionDissociated = (data) => {
    console.log("outcall_extension_dissociated", data);
  };

  // outcall_schedule_associated
  const onOutcallScheduleAssociated = (data) => {
    console.log("outcall_schedule_associated", data);
  };

  // outcall_schedule_dissociated
  const onOutcallScheduleDissociated = (data) => {
    console.log("outcall_schedule_dissociated", data);
  };

  // outcall_trunks_associated
  const onOutcallTrunksAssociated = (data) => {
    console.log("outcall_trunks_associated", data);
  };

  return {
    onOutcallCallPermissionAssociated,
    onOutcallCallPermissionDissociated,
    onOutcallCreated,
    onOutcallDeleted,
    onOutcallEdited,
    onOutcallExtensionAssociated,
    onOutcallExtensionDissociated,
    onOutcallScheduleAssociated,
    onOutcallScheduleDissociated,
    onOutcallTrunksAssociated,
  };
};

export default outcallEvents;
