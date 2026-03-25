const callFilterEvents = () => {
    // call_filter_created
    const OnCallFilterCreated = async (data) => {
        console.log("call_filter_created", data);
    }

    // call_filter_deleted
    const OnCallFilterDeleted = async (data) => {
        console.log("call_filter_deleted", data);
    }

    // call_filter_edited
    const OnCallFilterEdited = async (data) => {
        console.log("call_filter_edited", data);
    }

    // call_filter_fallback_edited
    const OnCallFilterFallbackEdited = async (data) => {
        console.log("call_filter_fallback_edited", data);
    }

    // call_filter_recipient_users_associated
    const OnCallFilterRecipientUsersAssociated = async (data) => {
        console.log("call_filter_recipient_users_associated", data);
    }

    // call_filter_surrogate_users_associated
    const OnCallFilterSurrogateUsersAssociated = async (data) => {
        console.log("call_filter_surrogate_users_associated", data);
    }

  return {
    OnCallFilterCreated,
    OnCallFilterDeleted,
    OnCallFilterEdited,
    OnCallFilterFallbackEdited,
    OnCallFilterRecipientUsersAssociated,
    OnCallFilterSurrogateUsersAssociated
  }
}

export default callFilterEvents
