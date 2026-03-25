const haEvents = () => {
  // ha_edited
  const OnHaEdited = async (data) => {
    console.log("ha_edited", data);
  };

  return {
    OnHaEdited,
  };
};

export default haEvents;
