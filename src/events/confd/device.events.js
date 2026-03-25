const deviceEvents = () => {
  // device_created
  const OnDeviceCreated = async (data) => {
    console.log("device_created", data);
  };

  // device_deleted
  const OnDeviceDeleted = async (data) => {
    console.log("device_deleted", data);
  };

  // device_edited
  const OnDeviceEdited = async (data) => {
    console.log("device_edited", data);
  };

  return {
    OnDeviceCreated,
    OnDeviceDeleted,
    OnDeviceEdited,
  };
};

export default deviceEvents;
