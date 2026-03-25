import { useEffect } from "react";
import { Field } from "@chakra-ui/react";
import { AsyncSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

const UserEditGroup = ({ user, setUser }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { groupsAll, groupsGet } = useApis();

  useEffect(() => {
    if (groupsAll.items.length > 0) {
      const updatedGroups = user.groups.map((userGroup) => {
        const matchedGroup = groupsAll.items.find((group) => group.id === userGroup.id);
        return matchedGroup
          ? { ...userGroup, label: matchedGroup.label } 
          : userGroup;
      });
      setUser((prevUser) => ({
        ...prevUser,
        groups: updatedGroups,
      }));
    }
  }, [groupsAll]);

  const load = () => {
    return new Promise(async (resolve) => {
      const groups = await groupsGet();
      const filtered = groups.items.map((group) => ({
        label: group.label,
        value: group.id,
      }));
      resolve(filtered);
    });
  };

  const onchange = (selectedOptions) => {
    const transformed = (selectedOptions || []).map((item) => ({
      id: item.value,
      name: item.label,
      label: item.label,
    }));
    setUser((prev) => ({
      ...prev,
      groups: transformed,
    }));
  };

  return (
    <Field.Root>
      <Field.Label>{t("common.groups")} :</Field.Label>
      <AsyncSelectUi
          cacheOptions
          loadOptions={load}
          defaultOptions
          isClearable
          isMulti
          onChange={onchange}
          value={
            user.groups
              ? user.groups.map((item) => ({
                  label: item.label,
                  value: item.id,
                }))
              : []
          }
          placeholder={t("common.group_select")}
        />
    </Field.Root>
  );
};

export default UserEditGroup;
