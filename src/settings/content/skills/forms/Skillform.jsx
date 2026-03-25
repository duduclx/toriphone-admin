import { Field } from "@chakra-ui/react";
import { InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../templates/forms/FormContainer";

const Skillform = ({ skill, setSkill }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <FormContainer>
      <Field.Root>
        <Field.Label>{t("common.name")} :</Field.Label>
        <InputUi
          required
          placeholder={t("common.name")}
          value={skill.name}
          onChange={(e) => setSkill({ ...skill, name: e.target.value })}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.description")} :</Field.Label>
        <InputUi
          required
          placeholder={t("common.description")}
          value={skill.description}
          onChange={(e) => setSkill({ ...skill, description: e.target.value })}
        />
      </Field.Root>
    </FormContainer>
  );
};

export default Skillform;
