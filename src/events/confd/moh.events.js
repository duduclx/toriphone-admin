const mohEvents = () => {
  // moh_created
  const onMohCreated = (data) => {
    console.log("moh_created", data);
  };

  // moh_deleted
  const onMohDeleted = (data) => {
    console.log("moh_deleted", data);
  };

  // moh_edited
  const onMohEdited = (data) => {
    console.log("moh_edited", data);
  };

  return {
    onMohCreated,
    onMohDeleted,
    onMohEdited,
  };
};

export default mohEvents;
