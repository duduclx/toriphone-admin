import { useEffect } from "react";
import { Tabs, Field } from "@chakra-ui/react";
import { InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import SourceName from "../helper/SourceName";
import SourceSearch from "../helper/SourceSearch";
import SourceFormat from "../helper/SourceFormat";
import SourceMatched from "../helper/SourceMatched";
import FormContainer from "../../../templates/forms/FormContainer";

const SourceCreateCsv = ({ source, setSource }) => {
  // requirements
  const { t } = useTranslation("admin");

  // default conference source
  useEffect(() => {
    setSource({
      first_matched_columns: [],
      format_columns: {},
      name: null,
      file: null,
      separator: null,
      unique_column: null,
      searched_columns: [],
    });
  }, []);

  return (
    <Tabs.Root defaultValue="csv">
      <Tabs.List>
        <Tabs.Trigger value="csv">{t("sources.csv")}</Tabs.Trigger>
        <Tabs.Trigger value="file">{t("sources.csv_file")}</Tabs.Trigger>
        <Tabs.Trigger value="first">{t("sources.first_matched_columns")}</Tabs.Trigger>
        <Tabs.Trigger value="format">{t("sources.format_columns")}</Tabs.Trigger>
        <Tabs.Trigger value="search">{t("sources.search_columns")}</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content width="50%" m="auto" value="csv">
        <SourceName source={source} setSource={setSource} />
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="file">
        <FormContainer alignSelf="center" justifyContent="center">
          <Field.Root>
            <Field.Label>{t("sources.file")}</Field.Label>
            <InputUi
              placeholder={t("sources.file")}
              value={source.file}
              onChange={(e) =>
                setSource({
                  ...source,
                  file: e.target.value,
                })
              }
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("sources.separator")}</Field.Label>
            <InputUi
              placeholder={t("sources.separator")}
              value={source.separator}
              onChange={(e) =>
                setSource({
                  ...source,
                  separator: e.target.value,
                })
              }
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("sources.unique_column")}</Field.Label>
            <InputUi
              placeholder={t("sources.unique_column")}
              value={source.unique_column}
              onChange={(e) =>
                setSource({
                  ...source,
                  unique_column: e.target.value,
                })
              }
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

export default SourceCreateCsv;
