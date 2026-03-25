import { Tabs, Field } from "@chakra-ui/react";
import { InputUi, NativeSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import SourceName from "../helper/SourceName";
import SourceSearch from "../helper/SourceSearch";
import SourceFormat from "../helper/SourceFormat";
import SourceMatched from "../helper/SourceMatched";
import FormContainer from "../../../templates/forms/FormContainer";

const SourceEditLdap = ({ source, setSource }) => {
  // requirements
  const { t } = useTranslation("admin");

  const uniqueFormatOptions = ["string", "binary_uuid"];

  return (
    <Tabs.Root defaultValue="ldap">
      <Tabs.List>
        <Tabs.Trigger value="ldap">{t("sources.ldap")}</Tabs.Trigger>
        <Tabs.Trigger value="file">{t("sources.ldap_file")}</Tabs.Trigger>
        <Tabs.Trigger value="first">{t("sources.first_matched_columns")}</Tabs.Trigger>
        <Tabs.Trigger value="format">{t("sources.format_columns")}</Tabs.Trigger>
        <Tabs.Trigger value="search">{t("sources.search_columns")}</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content width="50%" m="auto" value="ldap">
        <SourceName source={source} setSource={setSource} />
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="file">
        <FormContainer alignSelf="center" justifyContent="center">
          <Field.Root>
            <Field.Label>{t("sources.ldap_base_dn")}</Field.Label>
            <InputUi
              placeholder={t("sources.ldap_base_dn")}
              value={source.ldap_base_dn}
              onChange={(e) =>
                setSource({
                  ...source,
                  ldap_base_dn: e.target.value,
                })
              }
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("sources.ldap_custom_filter")}</Field.Label>
            <InputUi
              placeholder={t("sources.ldap_custom_filter")}
              value={source.ldap_custom_filter}
              onChange={(e) =>
                setSource({
                  ...source,
                  ldap_custom_filter: e.target.value,
                })
              }
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("sources.ldap_network_timeout")}</Field.Label>
            <InputUi
              placeholder={t("sources.ldap_network_timeout")}
              value={source.ldap_network_timeout}
              onChange={(e) =>
                setSource({
                  ...source,
                  ldap_network_timeout: e.target.value,
                })
              }
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("sources.ldap_password")}</Field.Label>
            <InputUi
              placeholder={t("sources.ldap_password")}
              value={source.ldap_password}
              onChange={(e) =>
                setSource({
                  ...source,
                  ldap_password: e.target.value,
                })
              }
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("sources.ldap_timeout")}</Field.Label>
            <InputUi
              placeholder={t("sources.ldap_timeout")}
              value={source.ldap_timeout}
              onChange={(e) =>
                setSource({
                  ...source,
                  ldap_timeout: e.target.value,
                })
              }
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("sources.ldap_uri")}</Field.Label>
            <InputUi
              placeholder={t("sources.ldap_uri")}
              value={source.ldap_uri}
              onChange={(e) =>
                setSource({
                  ...source,
                  ldap_uri: e.target.value,
                })
              }
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("sources.ldap_username")}</Field.Label>
            <InputUi
              placeholder={t("sources.ldap_username")}
              value={source.ldap_username}
              onChange={(e) =>
                setSource({
                  ...source,
                  ldap_username: e.target.value,
                })
              }
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("sources.unique_column")}</Field.Label>
            <InputUi
              placeholder={t("sources.unique_column")}
              value={source.unique_columnle}
              onChange={(e) =>
                setSource({
                  ...source,
                  unique_column: e.target.value,
                })
              }
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("sources.unique_column_format")}</Field.Label>
            <NativeSelectUi
              value={source.unique_column_format}
              onChange={(e) =>
                setSource({
                  ...source,
                  unique_column_format: e.target.value,
                })
              }
            >
              {uniqueFormatOptions.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </NativeSelectUi>
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

export default SourceEditLdap;
