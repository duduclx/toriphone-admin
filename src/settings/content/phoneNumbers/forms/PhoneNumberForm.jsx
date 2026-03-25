import { Field } from "@chakra-ui/react";
import { CheckboxUi, InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../templates/forms/FormContainer";

const PhoneNumberForm = ({ phoneNumber, setPhoneNumber }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <FormContainer>
      <Field.Root>
        <Field.Label>{t("common.caller_id")} :</Field.Label>
        <InputUi
          required
          placeholder={t("common.caller_id")}
          value={phoneNumber.caller_id_name}
          onChange={(e) => setPhoneNumber({ ...phoneNumber, caller_id_name: e.target.value })}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.number")} :</Field.Label>
        <InputUi
          placeholder={t("common.number")}
          value={phoneNumber.number}
          onChange={(e) => setPhoneNumber({ ...phoneNumber, number: e.target.value })}
        />
      </Field.Root>
      <CheckboxUi
        checked={phoneNumber.main}
        onCheckedChange={(e) =>
          setPhoneNumber({
            ...phoneNumber,
            main: e.checked,
          })
        }
      >
        {t("phoneNumbers.main")}
      </CheckboxUi>
      <CheckboxUi
        checked={phoneNumber.shared}
        onCheckedChange={(e) =>
          setPhoneNumber({
            ...phoneNumber,
            shared: e.checked,
          })
        }
      >
        {t("phoneNumbers.shared")}
      </CheckboxUi>
    </FormContainer>
  );
};

export default PhoneNumberForm;
