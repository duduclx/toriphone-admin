const groupEvents = () => {
  // group_call_permission_associated
  const OnGroupCallPermissionAssociated = async (data) => {
    console.log("group_call_permission_associated", data);
  };

  // group_call_permission_dissociated
  const OnGroupCallPermissionDissociated = async (data) => {
    console.log("group_call_permission_dissociated", data);
  };

  // group_created
  const OnGroupCreated = async (data) => {
    console.log("group_created", data);
  };

  // group_deleted
  const OnGroupDeleted = async (data) => {
    console.log("group_deleted", data);
  };

  // group_edited
  const OnGroupEdited = async (data) => {
    console.log("group_edited", data);
  };

  // group_extension_associated
  const OnGroupExtensionAssociated = async (data) => {
    console.log("group_extension_associated", data);
  };

  // group_extension_dissociated
  const OnGroupExtensionDissociated = async (data) => {
    console.log("group_extension_dissociated", data);
  };

  // group_fallback_edited
  const OnGroupFallbackEdited = async (data) => {
    console.log("group_fallback_edited", data);
  };

  // group_member_extensions_associated
  const OnGroupMemberExtensionsAssociated = async (data) => {
    console.log("group_member_extensions_associated", data);
  };

  // group_member_users_associated
  const OnGroupMemberUsersAssociated = async (data) => {
    console.log("group_member_users_associated", data);
  };

  // group_schedule_associated
  const OnGroupScheduleAssociated = async (data) => {
    console.log("group_schedule_associated", data);
  };

  // group_schedule_dissociated
  const OnGroupScheduleDissociated = async (data) => {
    console.log("group_schedule_dissociated", data);
  };

  return {
    OnGroupCallPermissionAssociated,
    OnGroupCallPermissionDissociated,
    OnGroupCreated,
    OnGroupDeleted,
    OnGroupEdited,
    OnGroupExtensionAssociated,
    OnGroupExtensionDissociated,
    OnGroupFallbackEdited,
    OnGroupMemberExtensionsAssociated,
    OnGroupMemberUsersAssociated,
    OnGroupScheduleAssociated,
    OnGroupScheduleDissociated,
  };
};

export default groupEvents;
