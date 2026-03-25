import { Field } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../ApiProvider";
import { AsyncSelectUi } from "../../ui";

/*
usage in
PolicyGroupEdit / create
authUserForm
*/

const PolicyForm = ({ label, policies, setPolicies }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { policiesGet } = useApis();

  // load
  const load = () => {
    return new Promise(async (resolve) => {
      const res = await policiesGet();
      const filtered = res.items.map((policy) => ({
        ...policy,
        label: policy.name,
        value: policy.uuid,
      }));
      resolve(filtered);
    });
  };

  // change
  const change = (selectedOptions) => {
    const transformed = (selectedOptions || []).map((item) => ({
      uuid: item.value,
      name: item.label,
      label: item.label,
    }));
    setPolicies(transformed);
  };

  return (
    <Field.Root>
      <Field.Label>{label || `${t("common.policy")}`} :</Field.Label>
      <AsyncSelectUi
        cacheOptions
        loadOptions={load}
        defaultOptions
        isClearable
        isMulti
        onChange={change}
        value={
          policies
            ? policies.map((policy) => ({
                label: policy.name,
                value: policy.uuid,
              }))
            : []
        }
        placeholder={t("common.policy_select")}
      />
    </Field.Root>
  );
};

export default PolicyForm;
