import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";
import AuthUserForm from "../forms/AuthUserForm";

const AuthUserCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { authUserCreate } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [authUser, setAuthUser] = useState({
    emails: [],
  });

  // policy form
  const [policies, setPolicies] = useState([]);

  // policyGroup form
  const [policyGroups, setPolicyGroups] = useState([]);

  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await authUserCreate(authUser, policies, policyGroups);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.error_id, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("authUsers");
    }
  };

  return (
    <TemplatePage
      title={t("authUsers.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"authUsers"}
      submit={submit}
      isCreate
      errors={errors}
      loading={loading}
    >
      <AuthUserForm
        authUser={authUser}
        setAuthUser={setAuthUser}
        policies={policies}
        setPolicies={setPolicies}
        policyGroups={policyGroups}
        setPolicyGroups={setPolicyGroups}
      />
    </TemplatePage>
  );
};

export default AuthUserCreate;
