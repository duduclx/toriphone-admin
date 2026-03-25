const callPickupEvents = () => {
  // call_pickup_created
  const OnCallPickupCreated = async (data) => {
    console.log("call_pickup_created", data);
  };

  // call_pickup_deleted
  const OnCallPickupDeleted = async (data) => {
    console.log("call_pickup_deleted", data);
  };

  // call_pickup_edited
  const OnCallPickupEdited = async (data) => {
    console.log("call_pickup_edited", data);
  };

  // call_pickup_interceptor_groups_associated
  const OnCallPickupInterceptorGroupsAssociated = async (data) => {
    console.log("call_pickup_interceptor_groups_associated", data);
  };

  // call_pickup_interceptor_users_associated
  const OnCallPickupInterceptorUsersAssociated = async (data) => {
    console.log("call_pickup_interceptor_users_associated", data);
  };

  // call_pickup_target_groups_associated
  const OnCallPickupTargetGroupsAssociated = async (data) => {
    console.log("call_pickup_target_groups_associated", data);
  };

  // call_pickup_target_users_associated
  const OnCallPickupTargetUsersAssociated = async (data) => {
    console.log("call_pickup_target_users_associated", data);
  };

  return {
    OnCallPickupCreated,
    OnCallPickupDeleted,
    OnCallPickupEdited,
    OnCallPickupInterceptorGroupsAssociated,
    OnCallPickupInterceptorUsersAssociated,
    OnCallPickupTargetGroupsAssociated,
    OnCallPickupTargetUsersAssociated,
  };
};

export default callPickupEvents;
