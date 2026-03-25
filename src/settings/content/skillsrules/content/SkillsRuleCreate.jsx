import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";

import SkillsRuleForm from "../form/SkillsRuleForm";

const SkillsRuleCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { queuesSkillruleAdd } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [skillsrule, setSkillsrule] = useState({
    name: "",
    rules: []
  });

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await queuesSkillruleAdd(skillsrule);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("skillsRules");
    }
  };

  return (
    <TemplatePage
      title={t("skillsrules.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"skillsRules"}
      submit={submit}
      isCreate
      errors={errors}
      loading={loading}
    >
      <SkillsRuleForm skillsrule={skillsrule} setSkillsrule={setSkillsrule}/>
    </TemplatePage>
  );
};

export default SkillsRuleCreate;
