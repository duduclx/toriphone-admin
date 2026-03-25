const iaxEvents = () => {
  // iax_callnumberlimits_edited
  const OnIaxCallNumberLimitsEdited = async (data) => {
    console.log("iax_callnumberlimits_edited", data);
  };

  // iax_endpoint_created
  const OnIaxEndpointCreated = async (data) => {
    console.log("iax_endpoint_created", data);
  };

  // iax_endpoint_deleted
  const OnIaxEndpointDeleted = async (data) => {
    console.log("iax_endpoint_deleted", data);
  };

  // iax_endpoint_edited
  const OnIaxEndpointEdited = async (data) => {
    console.log("iax_endpoint_edited", data);
  };

  // iax_general_edited
  const OnIaxGeneralEdited = async (data) => {
    console.log("iax_general_edited", data);
  };

  return {
    OnIaxCallNumberLimitsEdited,
    OnIaxEndpointCreated,
    OnIaxEndpointDeleted,
    OnIaxEndpointEdited,
    OnIaxGeneralEdited,
  };
};

export default iaxEvents;
