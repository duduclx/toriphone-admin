const featuresEvents = () => {
  // features_applicationmap_edited
  const OnFeaturesApplicationMapEdited = async (data) => {
    console.log("features_applicationmap_edited", data);
  };

  // features_featuremap_edited
  const OnFeaturesFeatureMapEdited = async (data) => {
    console.log("features_featuremap_edited", data);
  };

  // features_general_edited
  const OnFeaturesGeneralEdited = async (data) => {
    console.log("features_general_edited", data);
  };

  return {
    OnFeaturesApplicationMapEdited,
    OnFeaturesFeatureMapEdited,
    OnFeaturesGeneralEdited,
  };
};

export default featuresEvents;
