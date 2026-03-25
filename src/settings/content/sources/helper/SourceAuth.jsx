import { Field } from "@chakra-ui/react";
import { CheckboxUi, InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../templates/forms/FormContainer";

const SourceAuth = ({ source, setSource }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <FormContainer alignSelf="center" justifyContent="center">
      <Field.Root>
        <Field.Label>{t("common.host")} :</Field.Label>
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
        <Field.Label>{t("common.port")} :</Field.Label>
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
        <Field.Label>{t("common.prefix")} :</Field.Label>
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
        <Field.Label>{t("common.certificate_path")} :</Field.Label>
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
        <Field.Label>{t("common.timeout")} :</Field.Label>
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
        <Field.Label>{t("common.key_file")} :</Field.Label>
        <InputUi
          placeholder={t("common.key_file")}
          value={source.auth.key_file}
          onChange={(e) =>
            setSource({
              ...source,
              auth: {
                ...source.auth,
                key_file: e.target.value,
              },
            })
          }
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.username")} :</Field.Label>
        <InputUi
          placeholder={t("common.username")}
          value={source.auth.username}
          onChange={(e) =>
            setSource({
              ...source,
              auth: {
                ...source.auth,
                username: e.target.value,
              },
            })
          }
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.password")} :</Field.Label>
        <InputUi
          placeholder={t("common.password")}
          value={source.auth.password}
          onChange={(e) =>
            setSource({
              ...source,
              auth: {
                ...source.auth,
                password: e.target.value,
              },
            })
          }
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.version")} :</Field.Label>
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
  );
};

export default SourceAuth;
