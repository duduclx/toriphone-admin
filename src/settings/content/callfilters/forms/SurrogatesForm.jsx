import { useState } from "react";
import { Field } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import { AsyncSelectUi } from "../../../ui";

const SurrogatesForm = ({ surrogates, setSurrogates }) => {
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
    const users = (selectedUsers || []).map((user) => ({
      uuid: user.value,
      name: user.label,
      label: user.label,
    }));
    setSurrogates(users);
  };

  return (
    <Field.Root width="48%">
      <Field.Label>{t("common.secretaries")} :</Field.Label>
      <AsyncSelectUi
        cacheOptions
        loadOptions={load}
        defaultOptions
        isClearable
        isMulti
        onInputChange={(inputValue) => {
          usersSearchByName(inputValue, setSearchResult);
        }}
        onChange={change}
        value={surrogates.map((user) => ({
          label: user.label,
          value: user.uuid,
        }))}
        placeholder={t("common.secretaries")}
      />
    </Field.Root>
  );
};

export default SurrogatesForm;
