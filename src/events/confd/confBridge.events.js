const confBridgeEvents = () => {
  // confbridge_wazo_default_bridge_edited
  const OnConfbridgeWazoDefaultBridgeEdited = async (data) => {
    console.log("confbridge_wazo_default_bridge_edited", data);
  };

  // confbridge_wazo_default_user_edited
  const OnConfbridgeWazoDefaultUserEdited = async (data) => {
    console.log("confbridge_wazo_default_user_edited", data);
  };

  return {
    OnConfbridgeWazoDefaultBridgeEdited,
    OnConfbridgeWazoDefaultUserEdited,
  };
};

export default confBridgeEvents;
