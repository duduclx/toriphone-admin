import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplatePage from "../../../templates/TemplatePage";

import PolicyForm from "../forms/PolicyForm";

const PolicyEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { t: tErrors } = useTranslation("errors");

  // api
  const { policySelected, policyEdit } = useApis();

  // errors
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [policy, setPolicy] = useState(policySelected);

  // submit
  const submit = async () => {
    setError(null);
    setErrors(null);
    setLoading(true);
    const res = await policyEdit(policy);
    if (res.error) {
      setLoading(false);
      res.error.reason &&  setError(tErrors("name_required"));;
      res.error.reason
        ? setErrors({ title: tErrors("requiredName"), description: res.error.reason[0] })
        : setErrors({ title: tErrors("invalid_acl"), description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("policies");
    }
  };

  return (
    <TemplatePage
      title={t("policies.edit.title", { name: policySelected.name })}
      setSelectedComponent={setSelectedComponent}
      route={"policies"}
      submit={submit}
      isEdit
      errors={errors}
      loading={loading}
      hasTabs
    >
      <PolicyForm policy={policy} setPolicy={setPolicy} error={error} setError={setError} />
    </TemplatePage>
  );
};

export default PolicyEdit;
