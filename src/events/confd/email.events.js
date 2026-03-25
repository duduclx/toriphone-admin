const emailEvents = () => {
  // email_config_updated
  const OnEmailConfigUpdated = async (data) => {
    console.log("email_config_updated", data);
  };

  return {
    OnEmailConfigUpdated,
  };
};

export default emailEvents;
