import { Field } from "@chakra-ui/react";
import { InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../templates/forms/FormContainer";

const SourceName = ({ source, setSource }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <FormContainer alignSelf="center" justifyContent="center">
      <Field.Root>
        <Field.Label>{t("common.name")} :</Field.Label>
        <InputUi
          required
          placeholder={t("common.name")}
          value={source.name}
          onChange={(e) =>
            setSource({
              ...source,
              name: e.target.value,
            })
          }
        />
      </Field.Root>
    </FormContainer>
  );
};

export default SourceName;
