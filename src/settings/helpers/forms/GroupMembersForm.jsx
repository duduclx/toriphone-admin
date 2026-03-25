import { useState } from "react";
import { Field } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../ApiProvider";

import { AsyncSelectUi } from "../../ui";

/*
usage in 
callpickupForm
GroupCreate
GroupEdit
SwitchboardForm
PagingCreate
PagingEdit
PolicyGroupEdit
PolicyGroupform
ExternalAppForm
MeetingForm
*/

const GroupMembersForm = ({ label, groupMembers, setGroupMembers, helpertext = null }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { usersSearchByName } = useApis();

  // states
  const [searchResult, setSearchResult] = useState([]);

  // load value
  const loadMembers = (inputValue) => {
    const options = searchResult.map((result) => ({
      label: result.name,
      value: result.uuid,
    }));
    return new Promise((resolve) => {
      const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()));
      resolve(filteredOptions);
    });
  };

  // onchange
  const handleMembersChange = (selectedUsers) => {
    const transformedUsers = (selectedUsers || []).map((user) => ({
      uuid: user.value,
      name: user.label,
      label: user.label,
    }));
    setGroupMembers(transformedUsers);
  };

  return (
    <Field.Root>
      <Field.Label>{label || `${t("common.members")}`} :</Field.Label>
      <AsyncSelectUi
        cacheOptions
        loadOptions={loadMembers}
        defaultOptions
        isClearable
        isMulti
        onInputChange={(inputValue) => {
          usersSearchByName(inputValue, setSearchResult);
        }}
        onChange={handleMembersChange}
        value={groupMembers.map((user) => ({
          label: user.label,
          value: user.uuid,
        }))}
        placeholder={t("common.members_select")}
      />
      {helpertext && <Field.HelperText>{helpertext}</Field.HelperText>}
    </Field.Root>
  );
};

export default GroupMembersForm;
