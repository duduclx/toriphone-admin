import { Field } from "@chakra-ui/react";
import { InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../templates/forms/FormContainer";

const PhonebooksForm = ({ phonebook, setPhonebook }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <FormContainer>
      <Field.Root>
        <Field.Label>{t("common.name")}</Field.Label>
        <InputUi
          placeholder={t("common.name")}
          value={phonebook.name}
          onChange={(e) => setPhonebook({ ...phonebook, name: e.target.value })}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.description")}</Field.Label>
        <InputUi
          placeholder={t("common.description")}
          value={phonebook.description}
          onChange={(e) => setPhonebook({ ...phonebook, description: e.target.value })}
        />
      </Field.Root>
    </FormContainer>
  );
};

export default PhonebooksForm;
