import { Field } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../ApiProvider";

import { AsyncSelectUi } from "../../ui";

/*
usage in
authUserForm
*/

const PolicyGroupForm = ({ label, policyGroups, setPolicyGroups }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { authGroupsGet } = useApis();

  // load
  const load = () => {
    return new Promise(async (resolve) => {
      const res = await authGroupsGet();
      const filtered = res.items.map((policy) => ({
        ...policy,
        label: policy.name,
        value: policy.uuid,
      }));
      resolve(filtered);
    });
  };

  // change
  const change = (items) => {
    const transformed = (items || []).map((item) => ({
      uuid: item.value,
      name: item.label,
      label: item.label,
    }));
    setPolicyGroups(transformed);
  };

  return (
    <Field.Root>
      <Field.Label>{label || `${t("common.policyGroup")}`} :</Field.Label>
      <AsyncSelectUi
        cacheOptions
        loadOptions={load}
        defaultOptions
        isClearable
        isMulti
        onChange={change}
        value={
          policyGroups
            ? policyGroups.map((policy) => ({
                label: policy.name,
                value: policy.uuid,
              }))
            : []
        }
        placeholder={t("common.policyGroup_select")}
      />
    </Field.Root>
  );
};

export default PolicyGroupForm;
