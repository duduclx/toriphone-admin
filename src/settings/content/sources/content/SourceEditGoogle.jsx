import { Tabs, Field } from "@chakra-ui/react";
import { CheckboxUi, InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import SourceName from "../helper/SourceName";
import SourceSearch from "../helper/SourceSearch";
import SourceFormat from "../helper/SourceFormat";
import SourceMatched from "../helper/SourceMatched";
import FormContainer from "../../../templates/forms/FormContainer";

const SourceEditGoogle = ({ source, setSource }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <Tabs.Root defaultValue="google">
      <Tabs.List>
        <Tabs.Trigger value="google">{t("sources.google")}</Tabs.Trigger>
        <Tabs.Trigger value="auth">{t("sources.google_auth")}</Tabs.Trigger>
        <Tabs.Trigger value="first">{t("sources.first_matched_columns")}</Tabs.Trigger>
        <Tabs.Trigger value="format">{t("sources.format_columns")}</Tabs.Trigger>
        <Tabs.Trigger value="search">{t("sources.search_columns")}</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content width="50%" m="auto" value="google">
        <SourceName source={source} setSource={setSource} />
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="auth">
        <FormContainer alignSelf="center" justifyContent="center">
          <Field.Root>
            <Field.Label>{t("common.host")}</Field.Label>
            <InputUi
              placeholder={t("common.host")}
              value={source.auth.host}
              onChange={(e) =>
                setSource({
                  ...source,
                  auth: {
                    ...source.auth,
                    host: e.target.value,
                  },
                })
              }
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("common.port")}</Field.Label>
            <InputUi
              placeholder={t("common.port")}
              value={source.auth.port}
              onChange={(e) =>
                setSource({
                  ...source,
                  auth: {
                    ...source.auth,
                    port: e.target.value,
                  },
                })
              }
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("common.prefix")}</Field.Label>
            <InputUi
              placeholder={t("common.prefix")}
              value={source.auth.prefix}
              onChange={(e) =>
                setSource({
                  ...source,
                  auth: {
                    ...source.auth,
                    prefix: e.target.value,
                  },
                })
              }
            />
          </Field.Root>
          <CheckboxUi
            checked={source.auth.https}
            onCheckedChange={(e) =>
              setSource({
                ...source,
                auth: {
                  ...source.auth,
                  https: e.checked,
                },
              })
            }
          >
            {t("common.https")}
          </CheckboxUi>
          <CheckboxUi
            checked={source.auth.verify_certificate}
            onCheckedChange={(e) =>
              setSource({
                ...source,
                auth: {
                  ...source.auth,
                  verify_certificate: e.checked,
                },
              })
            }
          >
            {t("common.verify_certificate")}
          </CheckboxUi>
          <Field.Root>
            <Field.Label>{t("common.certificate_path")}</Field.Label>
            <InputUi
              placeholder={t("common.certificate_path")}
              value={source.auth.certificate_path}
              onChange={(e) =>
                setSource({
                  ...source,
                  auth: {
                    ...source.auth,
                    certificate_path: e.target.value,
                  },
                })
              }
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("common.timeout")}</Field.Label>
            <InputUi
              placeholder={t("common.timeout")}
              value={source.auth.timeout}
              onChange={(e) =>
                setSource({
                  ...source,
                  auth: {
                    ...source.auth,
                    timeout: e.target.value,
                  },
                })
              }
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("common.version")}</Field.Label>
            <InputUi
              placeholder={t("common.version")}
              value={source.auth.version}
              onChange={(e) =>
                setSource({
                  ...source,
                  auth: {
                    ...source.auth,
                    version: e.target.value,
                  },
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

export default SourceEditGoogle;
