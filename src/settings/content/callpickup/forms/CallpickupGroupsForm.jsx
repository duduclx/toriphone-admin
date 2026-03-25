import { Field } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import { AsyncSelectUi } from "../../../ui";

const CallpickupGroupsForm = ({ label = "Groupes", groups, setGroups }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { groupsGet } = useApis();

  // load
  const load = () => {
    return new Promise(async (resolve) => {
      const res = await groupsGet();
      const filteredgroups = res.items.map((group) => ({
        label: group.label,
        value: group.id,
      }));
      resolve(filteredgroups);
    });
  };

  // change
  const handleGroupChange = (selectedGroup) => {
    const transformedDestination = (selectedGroup || []).map((group) => ({
      id: group.value,
      value: group.value,
      label: group.label,
    }));
    setGroups(transformedDestination);
  };
  return (
    <Field.Root>
      <Field.Label>{label} :</Field.Label>
      <AsyncSelectUi
        loadOptions={load}
        defaultOptions
        isMulti
        onChange={handleGroupChange}
        value={groups || ""}
        placeholder={t("common.group_select")}
      />
    </Field.Root>
  );
};

export default CallpickupGroupsForm;
