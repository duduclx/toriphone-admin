const customEndpointEvents = () => {
  // custom_endpoint_created
  const OnCustomEndpointCreated = async (data) => {
    console.log("custom_endpoint_created", data);
  };

  // custom_endpoint_deleted
  const OnCustomEndpointDeleted = async (data) => {
    console.log("custom_endpoint_deleted", data);
  };

  // custom_endpoint_edited
  const OnCustomEndpointEdited = async (data) => {
    console.log("custom_endpoint_edited", data);
  };

  return {
    OnCustomEndpointCreated,
    OnCustomEndpointDeleted,
    OnCustomEndpointEdited,
  };
};

export default customEndpointEvents;
