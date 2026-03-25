import { useEffect } from "react";
import { Tabs, Field } from "@chakra-ui/react";
import { InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import SourceName from "../helper/SourceName";
import SourceSearch from "../helper/SourceSearch";
import SourceFormat from "../helper/SourceFormat";
import SourceMatched from "../helper/SourceMatched";
import FormContainer from "../../../templates/forms/FormContainer";

const SourceCreateCsvWs = ({ source, setSource }) => {
  // requirements
  const { t } = useTranslation("admin");

  // default conference source
  useEffect(() => {
    setSource({
      first_matched_columns: [],
      format_columns: {},
      name: null,
      delimiter: null,
      list_url: null,
      lookup_url: null,
      timeout: null,
      unique_column: null,
      searched_columns: [],
    });
  }, []);

  return (
    <Tabs.Root defaultValue="csv">
      <Tabs.List>
        <Tabs.Trigger value="csv">{t("sources.csv_ws")}</Tabs.Trigger>
        <Tabs.Trigger value="file">{t("sources.csv_ws_file")}</Tabs.Trigger>
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
            <Field.Label>{t("sources.list_url")}</Field.Label>
            <InputUi
              placeholder={t("sources.list_url")}
              value={source.list_url}
              onChange={(e) =>
                setSource({
                  ...source,
                  list_url: e.target.value,
                })
              }
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("sources.lookup_url")}</Field.Label>
            <InputUi
              placeholder={t("sources.lookup_url")}
              value={source.lookup_url}
              onChange={(e) =>
                setSource({
                  ...source,
                  lookup_url: e.target.value,
                })
              }
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("common.timeout")}</Field.Label>
            <InputUi
              placeholder={t("common.timeout")}
              value={source.timeout}
              onChange={(e) =>
                setSource({
                  ...source,
                  timeout: e.target.value,
                })
              }
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("sources.delimiter")}</Field.Label>
            <InputUi
              placeholder={t("sources.delimiter")}
              value={source.delimiter}
              onChange={(e) =>
                setSource({
                  ...source,
                  delimiter: e.target.value,
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

export default SourceCreateCsvWs;
