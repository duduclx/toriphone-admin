import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplatePage from "../../../templates/TemplatePage";

import AccessFeatureForm from "../form/AccessFeatureForm";

const AccessFeatureEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { accessFeatureSelected, accessFeatureEdit } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [accessFeature, setAccessFeature] = useState(accessFeatureSelected);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await accessFeatureEdit(accessFeature);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("accessFeatures");
    }
  };

  return (
    <TemplatePage
      title={t("accessFeatures.edit.title", {name: accessFeature.host})}
      setSelectedComponent={setSelectedComponent}
      route={"accessFeatures"}
      submit={submit}
      isEdit
      errors={errors}
      loading={loading}
    >
      <AccessFeatureForm accessFeature={accessFeature} setAccessFeature={setAccessFeature}/>
    </TemplatePage>
  );
}

export default AccessFeatureEdit
