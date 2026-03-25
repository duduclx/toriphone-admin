import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplatePage from "../../../templates/TemplatePage";

import PolicyForm from "../forms/PolicyForm";

const PolicyCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { t: tErrors } = useTranslation("errors");

  // api
  const { policyAdd } = useApis();

  // errors
  const [errors, setErrors] = useState(null);
  const [error, setError] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [policy, setPolicy] = useState({
    shared: false,
    name: null,
    description: null,
    acl: []
  });

  // submit
  const submit = async () => {
    setError(null);
    setErrors(null);
    setLoading(true);
    if(!policy.name) {
      setLoading(false);
      setError(tErrors("name_required"));
      return
    }
    const res = await policyAdd(policy);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.error.error_id, description: res.error.resource });
    } else {
      setLoading(false);
      setSelectedComponent("policies");
    }
  };

  return (
    <TemplatePage
      title={t("policies.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"policies"}
      submit={submit}
      isCreate
      hasTabs
      errors={errors}
      loading={loading}
    >
      <PolicyForm policy={policy} setPolicy={setPolicy} error={error} setError={setError} />
    </TemplatePage>
  );
};

export default PolicyCreate;
