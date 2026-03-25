import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";

import AuthUserForm from "../forms/AuthUserForm";

const AuthUserEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { authUserSelected, authUserGroupsGet, authUserPoliciesGet, authUserUpdate } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [authUser, setAuthUser] = useState(authUserSelected);

  // policy form
  const [policies, setPolicies] = useState([]);
  const [initialPolicies, setInitialPolicies] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await authUserPoliciesGet(authUserSelected);

      const formatted = res.items.map((item) => ({
        ...item,
        label: item.name,
        value: item.uuid,
      }));

      setPolicies(formatted);
      setInitialPolicies(formatted);
    };
    fetchData();
  }, []);

  // policyGroup form
  const [policyGroups, setPolicyGroups] = useState([]);
  const [initialPolicyGroups, setInitialPolicyGroups] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await authUserGroupsGet(authUserSelected);

      const formatted = res.items.map((item) => ({
        ...item,
        label: item.name,
        value: item.uuid,
      }));

      setPolicyGroups(formatted);
      setInitialPolicyGroups(formatted);
    };
    fetchData();
  }, []);

  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await authUserUpdate(authUser, policies, initialPolicies, policyGroups, initialPolicyGroups);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.error.error_id, description: res.error.resource });
    } else {
      setLoading(false);
      setSelectedComponent("authUsers");
    }
  };

  return (
    <TemplatePage
      title={t("authUsers.edit.title", { name: authUser.username })}
      setSelectedComponent={setSelectedComponent}
      route={"authUsers"}
      submit={submit}
      isEdit
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

export default AuthUserEdit;
