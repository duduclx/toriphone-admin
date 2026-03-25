import { useState } from "react";
import { Field } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import { AsyncSelectUi } from "../../../ui";

const RecipientForm = ({ recipient, setRecipient }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { usersSearchByName } = useApis();

  // states
  const [searchResult, setSearchResult] = useState([]);

  // load
  const load = (inputValue) => {
    const options = searchResult.map((result) => ({
      label: result.name,
      value: result.uuid,
    }));
    return new Promise((resolve) => {
      const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()));
      resolve(filteredOptions);
    });
  };

  // change
  const change = (selectedUsers) => {
    if (selectedUsers === null) {
      setRecipient(null);
    } else {
      const transformedUsers = {
        ...selectedUsers,
        uuid: selectedUsers.value,
        name: selectedUsers.label,
        label: selectedUsers.label,
      };
      setRecipient(transformedUsers);
    }
  };

  return (
    <Field.Root width="48%">
      <Field.Label>{t("common.boss")} :</Field.Label>
      <AsyncSelectUi
        cacheOptions
        loadOptions={load}
        defaultOptions
        isClearable
        onInputChange={(inputValue) => {
          usersSearchByName(inputValue, setSearchResult);
        }}
        onChange={change}
        value={recipient || ""}
        placeholder={t("common.boss")}
      />
    </Field.Root>
  );
};

export default RecipientForm;
