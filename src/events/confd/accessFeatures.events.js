const accessFeaturesEvents = ({ accessFeaturesGet, user, tenantCurrent }) => {

    // access_feature_created
    const onAccessFeatureCreated = async (data) => {
        console.log("access_feature_created", data);
    }

    // access_feature_deleted
    const OnAccessFeatureDeleted = async (data) => {
        console.log("access_feature_deleted", data);
    }

    // access_feature_edited
    const OnAccessFeatureEdited = async (data) => {
        console.log("access_feature_edited", data);
    }

  return {
    onAccessFeatureCreated,
    OnAccessFeatureDeleted,
    OnAccessFeatureEdited
  }
}

export default accessFeaturesEvents
