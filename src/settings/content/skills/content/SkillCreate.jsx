import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplatePage from "../../../templates/TemplatePage";

import Skillform from "../forms/Skillform";

const SkillCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { agentsSkillsCreate } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [skill, setSkill] = useState({
    name: "",
    description: ""
  });

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await agentsSkillsCreate(skill);
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
      title={t("skills.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"skills"}
      submit={submit}
      isCreate
      errors={errors}
      loading={loading}
    >
      <Skillform skill={skill} setSkill={setSkill}/>
    </TemplatePage>
  );
};

export default SkillCreate;
