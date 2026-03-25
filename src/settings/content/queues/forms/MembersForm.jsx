import { useState } from "react";
import { Field } from "@chakra-ui/react";
import { AsyncSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

/*
usage in
QueueCreate
QueueEdit
*/

const MembersForm = ({ queuemembers, setQueuemembers }) => {
  // requirements
  const { t } = useTranslation("admin")
  
  // api
  const { usersSearchByName } = useApis();

  // states
  const [searchResult, setSearchResult] = useState([]);

  // load values
  const loadQueueMembers = (inputValue) => {
    const options = searchResult.map((result) => ({
      label: result.name,
      value: result.sourceId,
    }));
    return new Promise((resolve) => {
      const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()));
      resolve(filteredOptions);
    });
  };

  // onchange
  const handleQueueMembersChange = (selectedUsers) => {
    const transformedUsers = (selectedUsers || []).map((user) => ({
      id: user.value,
      name: user.label,
      label: user.label,
    }));
    setQueuemembers(transformedUsers);
  };

  return (
    <Field.Root>
      <Field.Label>{t("common.members")} :</Field.Label>
      <AsyncSelectUi
        cacheOptions
        loadOptions={loadQueueMembers}
        defaultOptions
        isClearable
        isMulti
        onInputChange={(inputValue) => {
          usersSearchByName(inputValue, setSearchResult);
        }}
        onChange={handleQueueMembersChange}
        value={
          queuemembers
            ? queuemembers.map((user) => ({
                label: user.label,
                value: user.id,
              }))
            : []
        }
        placeholder={t("common.members_select")}
      />
      <Field.HelperText>{t("common.members_helper")}</Field.HelperText>
    </Field.Root>
  );
};

export default MembersForm;
