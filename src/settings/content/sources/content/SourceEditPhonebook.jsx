import { useState } from "react";
import { Tabs, Field } from "@chakra-ui/react";
import { AsyncSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import SourceName from "../helper/SourceName";
import SourceSearch from "../helper/SourceSearch";
import SourceFormat from "../helper/SourceFormat";
import SourceMatched from "../helper/SourceMatched";

import { useApis } from "../../../../ApiProvider";
import FormContainer from "../../../templates/forms/FormContainer";

const SourceEditPhonebook = ({ source, setSource }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { phonebooksGet } = useApis();

  // resource
  const [phonebook, setPhonebook] = useState({
    label: source.phonebook_name,
    value: source.phonebook_uuid,
  });

  // load values
  const load = () => {
    return new Promise(async (resolve) => {
      const res = await phonebooksGet();
      const filtered = res.items.map((item) => ({
        label: item.name,
        value: item.uuid,
      }));
      resolve(filtered);
    });
  };

  // onchange
  const handleChange = (item) => {
    if (item) {
      setSource({
        ...source,
        phonebook_uuid: item.value,
        phonebook_name: item.label,
      });
      setPhonebook(item);
    } else {
      setSource({
        ...source,
        phonebook_uuid: null,
        phonebook_name: null,
      });
      setPhonebook(null);
    }
  };

  return (
    <Tabs.Root defaultValue="phonebook">
      <Tabs.List>
        <Tabs.Trigger value="phonebook">{t("sources.phonebook")}</Tabs.Trigger>
        <Tabs.Trigger value="file">{t("sources.phonebook_file")}</Tabs.Trigger>
        <Tabs.Trigger value="first">{t("sources.first_matched_columns")}</Tabs.Trigger>
        <Tabs.Trigger value="format">{t("sources.format_columns")}</Tabs.Trigger>
        <Tabs.Trigger value="search">{t("sources.search_columns")}</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content width="50%" m="auto" value="phonebook">
        <SourceName source={source} setSource={setSource} />
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="file">
        <FormContainer alignSelf="center" justifyContent="center">
          <Field.Root>
            <Field.Label>{t("sources.phonebook")}</Field.Label>
            <AsyncSelectUi
              cacheOptions
              loadOptions={load}
              defaultOptions
              isClearable
              onChange={handleChange}
              value={phonebook}
              placeholder={t("sources.phonebook_select")}
            />
          </Field.Root>
        </FormContainer>
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="first">
        <SourceMatched source={source} setSource={setSource} />
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="format">
        <SourceFormat source={source} setSource={setSource} />
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="search">
        <SourceSearch source={source} setSource={setSource} />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default SourceEditPhonebook;
