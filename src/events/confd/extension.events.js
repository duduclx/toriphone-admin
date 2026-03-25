const extensionEvents = () => {
  // extension_created
  const OnExtensionCreated = async (data) => {
    console.log("extension_created", data);
  };

  // extension_deleted
  const OnExtensionDeleted = async (data) => {
    console.log("extension_deleted", data);
  };

  // extension_edited
  const OnExtensionEdited = async (data) => {
    console.log("extension_edited", data);
  };

  // extension_feature_edited
  const OnExtensionFeatureEdited = async (data) => {
    console.log("extension_feature_edited", data);
  };

  return {
    OnExtensionCreated,
    OnExtensionDeleted,
    OnExtensionEdited,
    OnExtensionFeatureEdited,
  };
};

export default extensionEvents;
