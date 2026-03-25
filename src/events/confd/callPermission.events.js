const callPermissionEvents = () => {
    // call_permission_created
    const OnCallPermissionCreated = async (data) => {
        console.log("call_permission_created", data);
    }

    // call_permission_deleted
    const OnCallPermissionDeleted = async (data) => {
        console.log("call_permission_deleted", data);
    }

    // call_permission_edited
    const OnCallPermissionEdited = async (data) => {
        console.log("call_permission_edited", data);
    }
    
  return {
    OnCallPermissionCreated,
    OnCallPermissionDeleted,
    OnCallPermissionEdited
  }
}

export default callPermissionEvents
