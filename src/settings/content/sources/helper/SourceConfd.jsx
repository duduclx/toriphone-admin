import { Field } from "@chakra-ui/react";
import { CheckboxUi, InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../templates/forms/FormContainer";

const SourceConfd = ({ source, setSource }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <FormContainer alignSelf="center" justifyContent="center">
      <Field.Root>
        <Field.Label>{t("common.host")} :</Field.Label>
        <InputUi
          placeholder={t("common.host")}
          value={source.confd.host}
          onChange={(e) =>
            setSource({
              ...source,
              confd: {
                ...source.confd,
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
          value={source.confd.port}
          onChange={(e) =>
            setSource({
              ...source,
              confd: {
                ...source.confd,
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
          value={source.confd.prefix}
          onChange={(e) =>
            setSource({
              ...source,
              confd: {
                ...source.confd,
                prefix: e.target.value,
              },
            })
          }
        />
      </Field.Root>
      <CheckboxUi
        checked={source.confd.https}
        onCheckedChange={(e) =>
          setSource({
            ...source,
            confd: {
              ...source.confd,
              https: e.checked,
            },
          })
        }
      >
        {t("common.https")}
      </CheckboxUi>
      <CheckboxUi
        checked={source.confd.verify_certificate}
        onCheckedChange={(e) =>
          setSource({
            ...source,
            confd: {
              ...source.confd,
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
          value={source.confd.certificate_path}
          onChange={(e) =>
            setSource({
              ...source,
              confd: {
                ...source.confd,
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
          value={source.confd.timeout}
          onChange={(e) =>
            setSource({
              ...source,
              confd: {
                ...source.confd,
                timeout: e.target.value,
              },
            })
          }
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.version")} :</Field.Label>
        <InputUi
          placeholder={t("common.version")}
          value={source.confd.version}
          onChange={(e) =>
            setSource({
              ...source,
              confd: {
                ...source.confd,
                version: e.target.value,
              },
            })
          }
        />
      </Field.Root>
    </FormContainer>
  );
};

export default SourceConfd;
