const hepEvents = () => {
  // hep_general_edited
  const OnHepGeneralEdited = async (data) => {
    console.log("hep_general_edited", data);
  };

  return {
    OnHepGeneralEdited,
  };
};

export default hepEvents;
