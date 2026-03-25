import { Field } from "@chakra-ui/react";
import { InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../templates/forms/FormContainer";

const PhonebooksContactForm = ({ contact, setContact }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <FormContainer>
      <Field.Root>
        <Field.Label>{t("common.firstname")}</Field.Label>
        <InputUi
          placeholder={t("common.firstname")}
          value={contact.firstname || ""}
          onChange={(e) => setContact({ ...contact, firstname: e.target.value })}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.lastname")}</Field.Label>
        <InputUi
          placeholder={t("common.lastname")}
          value={contact.lastname || ""}
          onChange={(e) => setContact({ ...contact, lastname: e.target.value })}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.email")}</Field.Label>
        <InputUi
          placeholder={t("common.email")}
          value={contact.email || ""}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.phone")}</Field.Label>
        <InputUi
          placeholder={t("common.phone")}
          value={contact.phone || ""}
          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.mobile_phone")}</Field.Label>
        <InputUi
          placeholder={t("common.mobile_phone")}
          value={contact.mobile_phone || ""}
          onChange={(e) => setContact({ ...contact, mobile_phone: e.target.value })}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.fax")}</Field.Label>
        <InputUi
          placeholder={t("common.fax")}
          value={contact.fax || ""}
          onChange={(e) => setContact({ ...contact, fax: e.target.value })}
        />
      </Field.Root>
    </FormContainer>
  );
};

export default PhonebooksContactForm;
