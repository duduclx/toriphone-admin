const applicationEvents = () => {

    // application_created
    const OnApplicationCreated = async (data) => {
        console.log("application_created", data);
    }

    // application_deleted
    const OnApplicationDeleted = async (data) => {
        console.log("application_deleted", data);
    }

    // application_edited
    const OnApplicationEdited = async (data) => {
        console.log("application_edited", data);
    }

  return {
    OnApplicationCreated,
    OnApplicationDeleted,
    OnApplicationEdited
  }
}

export default applicationEvents
