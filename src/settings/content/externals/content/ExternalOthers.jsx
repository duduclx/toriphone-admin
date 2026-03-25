import { Field } from "@chakra-ui/react";
import { InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../templates/forms/FormContainer";

const ExternalOthers = ({ external, setExternal }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <FormContainer>
      <Field.Root>
        <Field.Label>{t("external.client_id")}</Field.Label>
        <InputUi
          required
          placeholder={t("external.client_id")}
          value={external.client_id}
          onChange={(e) => setExternal({ ...external, client_id: e.target.value })}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("external.client_secret")}</Field.Label>
        <InputUi
          required
          placeholder={t("external.client_secret")}
          value={external.client_secret}
          onChange={(e) => setExternal({ ...external, client_secret: e.target.value })}
        />
      </Field.Root>
    </FormContainer>
  );
};

export default ExternalOthers;
