const lineEvents = () => {
  // line_application_associated
  const OnLineApplicationAssociated = (data) => {
    console.log("line_application_associated", data);
  };

  // line_application_dissociated
  const OnLineApplicationDissociated = (data) => {
    console.log("line_application_dissociated", data);
  };

  // line_created
  const OnLineCreated = (data) => {
    console.log("line_created", data);
  };

  // line_deleted
  const OnLineDeleted = (data) => {
    console.log("line_deleted", data);
  };

  // line_device_associated
  const OnLineDeviceAssociated = (data) => {
    console.log("line_device_associated", data);
  };

  // line_device_dissociated
  const OnLineDeviceDissociated = (data) => {
    console.log("line_device_dissociated", data);
  };

  // line_edited
  const OnLineEdited = (data) => {
    console.log("line_edited", data);
  };

  // line_endpoint_custom_associated
  const OnLineEndpointCustomAssociated = (data) => {
    console.log("line_endpoint_custom_associated", data);
  };

  // line_endpoint_custom_dissociated
  const OnLineEndpointCustomDissociated = (data) => {
    console.log("line_endpoint_custom_dissociated", data);
  };

  // line_endpoint_sccp_associated
  const OnLineEndpointSccpAssociated = (data) => {
    console.log("line_endpoint_sccp_associated", data);
  };

  // line_endpoint_sccp_dissociated
  const OnLineEndpointSccpDissociated = (data) => {
    console.log("line_endpoint_sccp_dissociated", data);
  };

  // line_endpoint_sip_associated
  const OnLineEndpointSipAssociated = (data) => {
    console.log("line_endpoint_sip_associated", data);
  };

  // line_endpoint_sip_dissociated
  const OnLineEndpointSipDissociated = (data) => {
    console.log("line_endpoint_sip_dissociated", data);
  };

  // line_extension_associated
  const OnLineExtensionAssociated = (data) => {
    console.log("line_extension_associated", data);
  };

  // line_extension_dissociated
  const OnLineExtensionDissociated = (data) => {
    console.log("line_extension_dissociated", data);
  };

  return {
    OnLineApplicationAssociated,
    OnLineApplicationDissociated,
    OnLineCreated,
    OnLineDeleted,
    OnLineDeviceAssociated,
    OnLineDeviceDissociated,
    OnLineEdited,
    OnLineEndpointCustomAssociated,
    OnLineEndpointCustomDissociated,
    OnLineEndpointSccpAssociated,
    OnLineEndpointSccpDissociated,
    OnLineEndpointSipAssociated,
    OnLineEndpointSipDissociated,
    OnLineExtensionAssociated,
    OnLineExtensionDissociated
  };
};

export default lineEvents;
