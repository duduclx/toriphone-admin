const funcKeyEvents = () => {
  // func_key_template_created
  const OnFuncKeyTemplateCreated = async (data) => {
    console.log("func_key_template_created", data);
  };

  // func_key_template_deleted
  const OnFuncKeyTemplateDeleted = async (data) => {
    console.log("func_key_template_deleted", data);
  };

  // func_key_template_edited
  const OnFuncKeyTemplateEdited = async (data) => {
    console.log("func_key_template_edited", data);
  };

  return {
    OnFuncKeyTemplateCreated,
    OnFuncKeyTemplateDeleted,
    OnFuncKeyTemplateEdited,
  };
};

export default funcKeyEvents;
