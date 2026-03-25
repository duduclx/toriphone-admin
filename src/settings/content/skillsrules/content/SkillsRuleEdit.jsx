import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";

import SkillsRuleForm from "../form/SkillsRuleForm";

const SkillsRuleEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { queueSkillSelected, queuesSkillruleUpdate } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [skillsrule, setSkillsrule] = useState(queueSkillSelected);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await queuesSkillruleUpdate(skillsrule);
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
      title={t("skillsrules.edit.title", { name: queueSkillSelected.name })}
      setSelectedComponent={setSelectedComponent}
      route={"skillsRules"}
      submit={submit}
      isEdit
      errors={errors}
      loading={loading}
    >
      <SkillsRuleForm skillsrule={skillsrule} setSkillsrule={setSkillsrule} />
    </TemplatePage>
  );
};

export default SkillsRuleEdit;
