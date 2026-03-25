import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplatePage from "../../../templates/TemplatePage";

import Skillform from "../forms/Skillform";

const SkillEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { agentsSkillSelected, agentsSkillsUpdate } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [skill, setSkill] = useState(agentsSkillSelected);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await agentsSkillsUpdate(skill);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("skills");
    }
  };

  return (
    <TemplatePage
      title={t("skills.edit.title", { name: agentsSkillSelected.name })}
      setSelectedComponent={setSelectedComponent}
      route={"skills"}
      submit={submit}
      isEdit
      errors={errors}
      loading={loading}
    >
      <Skillform skill={skill} setSkill={setSkill}/>
    </TemplatePage>
  );
};

export default SkillEdit;
