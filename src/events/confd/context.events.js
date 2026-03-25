const contextEvents = () => {
  // context_created
  const OnContextCreated = async (data) => {
    console.log("context_created", data);
  };

  // context_deleted
  const OnContextDeleted = async (data) => {
    console.log("context_deleted", data);
  };

  // context_edited
  const OnContextEdited = async (data) => {
    console.log("context_edited", data);
  };

  // contexts_associated
  const OnContextsAssociated = async (data) => {
    console.log("contexts_associated", data);
  };

  return {
    OnContextCreated,
    OnContextDeleted,
    OnContextEdited,
    OnContextsAssociated,
  };
};

export default contextEvents;
