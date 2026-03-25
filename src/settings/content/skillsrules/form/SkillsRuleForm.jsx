import { Field } from "@chakra-ui/react";
import { InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import SkillsRuleRules from "./SkillsRuleRules";
import FormContainer from "../../../templates/forms/FormContainer";

const SkillsRuleForm = ({ skillsrule, setSkillsrule }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <FormContainer>
      <Field.Root>
        <Field.Label>{t("common.name")} :</Field.Label>
        <InputUi
          required
          placeholder={t("common.name")}
          value={skillsrule.name}
          onChange={(e) => setSkillsrule({ ...skillsrule, name: e.target.value })}
        />
      </Field.Root>
      <SkillsRuleRules skillsrule={skillsrule} setSkillsrule={setSkillsrule} />
    </FormContainer>
  );
};

export default SkillsRuleForm;
