import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";
import PoliciesGroupForm from "../forms/PoliciesGroupForm";

const PolicyGroupEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { t: tErrors } = useTranslation("errors");

  // api
  const { authGroupSelected, authGroupPoliciesGet, authGroupUsersGet, authGroupUpdate } = useApis();

  // errors
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [authgroup, setAuthgroup] = useState(authGroupSelected);

  // sub resources
  const [initialMembers, setInitialMembers] = useState([]);
  const [initialPolicies, setInitialPolicies] = useState([]);

  // members form
  const [members, setMembers] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      const res = await authGroupUsersGet(authGroupSelected);
      const updated = res.items.map((user) => ({
        ...user,
        label: `${user.firstname} ${user.lastname}`,
      }));
      setInitialMembers(updated);
      setMembers(updated);
    };
    fetchdata();
  }, []);

  // policy form
  const [policies, setPolicies] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      const res = await authGroupPoliciesGet(authGroupSelected);
      const updated = res.items.map((policy) => ({
        ...policy,
        label: policy.name,
        value: policy.uuid,
      }));
      setInitialPolicies(updated);
      setPolicies(updated);
    };
    fetchdata();
  }, []);

  // submit
  const submit = async () => {
    setError(null);
    setErrors(null);
    setLoading(true);
    if (!authgroup.name) {
      setLoading(false);
      setError(tErrors("name_required"));
      return
    }

    const res = await authGroupUpdate(authgroup, members, initialMembers, policies, initialPolicies);
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
      title={t("policyGroups.edit.title", { name: authGroupSelected.name })}
      setSelectedComponent={setSelectedComponent}
      route={"policiesGroups"}
      submit={submit}
      isEdit
      errors={errors}
      loading={loading}
    >
      <PoliciesGroupForm authgroup={authgroup} setAuthgroup={setAuthgroup} members={members} setMembers={setMembers} policies={policies} setPolicies={setPolicies} error={error} />
    </TemplatePage>
  );
};

export default PolicyGroupEdit;
