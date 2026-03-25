import { useState } from "react";
import { Field } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../ApiProvider";
import { AsyncSelectUi } from "../../ui";

/*
usage in
AgentForm
VoicemailForm
WebhooksCreate
WebhooksEdit
*/

const UserForm = ({user, setUser}) => {
    // requirements
  const { t } = useTranslation("admin");

  // api
  const { usersSearchByName } = useApis();

  // states
  const [searchResult, setSearchResult] = useState([]);

  // load
  const load = (inputValue) => {
    const options = searchResult.map((result) => ({
      ...result,
      label: result.name,
      value: result.uuid,
    }));
    return new Promise((resolve) => {
      const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()));
      resolve(filteredOptions);
    });
  };

  // change
  const change = (item) => {
    if (item === null) {
        setUser(null);
    } else {
      const transformed = {
        ...item,
        uuid: item.value,
        name: item.label,
        label: item.label,
      };
      setUser(transformed);
    }
  };

  return (
    <Field.Root>
      <Field.Label>{t('common.user')} :</Field.Label>
      <AsyncSelectUi
        cacheOptions
        loadOptions={load}
        defaultOptions
        isClearable
        onInputChange={(inputValue) => {
          usersSearchByName(inputValue, setSearchResult);
        }}
        onChange={change}
        value={user}
        placeholder={t('common.user')}
      />
    </Field.Root>
  )
}

export default UserForm
