import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";
import PoliciesGroupForm from "../forms/PoliciesGroupForm";

const PolicyGroupCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { t: tErrors } = useTranslation("errors");

  // api
  const { authGroupCreate } = useApis();

  // errors
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [authgroup, setAuthgroup] = useState({
    name: "",
  });

  // members form
  const [members, setMembers] = useState([]);

  // policy form
  const [policies, setPolicies] = useState([]);

  // submit
  const submit = async () => {
    setError(null);
    setErrors(null);
    setLoading(true);
    if (authgroup.name.length == 0) {
      setLoading(false);
      setError(tErrors("name_required"));
      return
    }
    const res = await authGroupCreate(authgroup, members, policies);
    if (res.error) {
      setLoading(false);
      setErrors({title: res.status, description: res.message});
    } else {
      setLoading(false);
      setSelectedComponent("policiesGroups");
    }
  };

  return (
    <TemplatePage
      title={t("policyGroups.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"policiesGroups"}
      submit={submit}
      isCreate
      errors={errors}
      loading={loading}
    >
      <PoliciesGroupForm authgroup={authgroup} setAuthgroup={setAuthgroup} members={members} setMembers={setMembers} policies={policies} setPolicies={setPolicies} error={error} />
    </TemplatePage>
  );
};

export default PolicyGroupCreate;
