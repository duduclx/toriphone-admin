import { Field, Text } from "@chakra-ui/react";
import { CheckboxUi, InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../templates/forms/FormContainer";

const ExternalMobile = ({ external, setExternal }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <FormContainer>
      <Text textAlign="center" fontSize="xl" fontWeight="semibold">
        Android
      </Text>
      <Field.Root>
        <Field.Label>{t("external.fcm_api_key")}</Field.Label>
        <InputUi
          required
          placeholder={t("external.fcm_api_key")}
          value={external.fcm_api_key}
          onChange={(e) => setExternal({ ...external, fcm_api_key: e.target.value })}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("external.fcm_sender_id")}</Field.Label>
        <InputUi
          required
          placeholder={t("external.fcm_sender_id")}
          value={external.fcm_sender_id}
          onChange={(e) => setExternal({ ...external, fcm_sender_id: e.target.value })}
        />
      </Field.Root>
      <Text textAlign="center" fontSize="xl" fontWeight="semibold" mt="8">
        IOS
      </Text>
      <Field.Root>
        <Field.Label>{t("external.ios_apn_certificate")}</Field.Label>
        <InputUi
          required
          placeholder={t("external.ios_apn_certificate")}
          value={external.ios_apn_certificate}
          onChange={(e) => setExternal({ ...external, ios_apn_certificate: e.target.value })}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("external.ios_apn_private")}</Field.Label>
        <InputUi
          required
          placeholder={t("external.ios_apn_private")}
          value={external.ios_apn_private}
          onChange={(e) => setExternal({ ...external, ios_apn_private: e.target.value })}
        />
      </Field.Root>
      <CheckboxUi
        checked={external.is_sandbox}
        onCheckedChange={(e) => setExternal({ ...external, is_sandbox: e.checked })}
      >
        {t("external.is_sandbox")}
      </CheckboxUi>
    </FormContainer>
  );
};

export default ExternalMobile;
