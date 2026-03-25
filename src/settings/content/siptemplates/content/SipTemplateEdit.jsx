import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";
import SiptemplateForm from "../forms/SiptemplateForm";

const SipTemplateEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { endpointSipTemplateSelected, endpointSipTemplatesEdit } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [template, setTemplate] = useState(endpointSipTemplateSelected);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await endpointSipTemplatesEdit(template);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("sipTemplates");
    }
  };

  return (
    <TemplatePage
      title={t("sipTemplates.edit.title", { name: endpointSipTemplateSelected.name })}
      setSelectedComponent={setSelectedComponent}
      route={"sipTemplates"}
      submit={submit}
      isEdit
      hasTabs
      errors={errors}
      loading={loading}
    >
      <SiptemplateForm template={template} setTemplate={setTemplate}/>
    </TemplatePage>
  );
};

export default SipTemplateEdit;
