import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";
import SiptemplateForm from "../forms/SiptemplateForm";

const SipTemplateCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { endpointSipTemplatesAdd } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource helper
  const initialOptions = {
    aor_section_options: [],
    auth_section_options: [],
    endpoint_section_options: [],
    identify_section_options: [],
    outbound_auth_section_options: [],
    registration_outbound_auth_section_options: [],
    registration_section_options: [],
  };

  // resource
  const [template, setTemplate] = useState({ label: "", ...initialOptions });

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await endpointSipTemplatesAdd(template);
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
      title={t("sipTemplates.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"sipTemplates"}
      submit={submit}
      isCreate
      hasTabs
      errors={errors}
      loading={loading}
    >
      <SiptemplateForm template={template} setTemplate={setTemplate} />
    </TemplatePage>
  );
};

export default SipTemplateCreate;
