import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../ApiProvider";
import { AsyncSelectUi } from "../../ui";

const User = ({ destination, setDestination, destinationType }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { usersSearchByName } = useApis();

  // user
  const [searchResult, setSearchResult] = useState([]);

  const load = (inputValue) => {
    const options = searchResult.map((result) => ({
      ...result,
      label: result.name,
      value: result.sourceId,
    }));
    return new Promise((resolve) => {
      const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()));
      resolve(filteredOptions);
    });
  };

  const change = (item) => {
    const res = {
      ...destination,
      user_id: item.value,
      type: destinationType,
      label: item.label,
    };
    setDestination(res);
  };

  return (
      <AsyncSelectUi
        loadOptions={load}
        defaultOptions
        onChange={change}
        onInputChange={(inputValue) => {
          usersSearchByName(inputValue, setSearchResult);
        }}
        value={destination || ""}
        placeholder={t("common.user_select")}
      />
  );
};

export default User;
