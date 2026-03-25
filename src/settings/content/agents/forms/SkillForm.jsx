import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Box, Button, Text, HStack } from "@chakra-ui/react";
import { IconButtonTrashUi, InputUi, NativeSelectUi } from "../../../ui";
import { toaster } from "../../../../components/ui/toaster";
import { FaPlus } from "react-icons/fa";


import { useApis } from "../../../../ApiProvider";

/*
usage in
AgentForm
*/

const SkillForm = ({ agent, setAgent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { agentsSkillsAll, agentsSkillsGet } = useApis();

  // resource
  const [skills, setSkills] = useState(agent.skills || []);

  // load agentsSkills
  useEffect(() => {
    agentsSkillsGet();
  }, []);

  useEffect(() => {
    setAgent((prev) => ({
      ...prev,
      skills: skills,
    }));
  }, [skills, setSkills]);

  const handleAdd = () => {
    if (agentsSkillsAll.items.length === 0) {
      toaster.create({
        type: "error",
        title: t("skills.error_title"),
        description: t("skills.error_description"),
        duration: 3000,
        closable: true,
      });
      return;
    }
    setSkills([
      ...skills,
      {
        id: agentsSkillsAll.items[0].id,
        skill_weight: "",
      },
    ]);
  };

  const handleRemove = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleChange = (index, key, value) => {
    const updated = skills.map((skill, i) => (i === index ? { ...skill, [key]: value } : skill));
    setSkills(updated);
  };

  return (
    <Box>
      <Text mb="4">{t("common.skills")} :</Text>
      {skills.map((skill, index) => (
        <HStack key={index} gap={4} mb={2} align="center">
          <NativeSelectUi value={skill.id} onChange={(e) => handleChange(index, "id", e.target.value)}>
            {agentsSkillsAll.items.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </NativeSelectUi>
          <InputUi
            placeholder={t("common.skills")}
            value={skill.skill_weight}
            onChange={(e) => handleChange(index, "skill_weight", e.target.value)}
          />
          <IconButtonTrashUi onClick={() => handleRemove(index)} />
        </HStack>
      ))}
      <Button colorPalette="primary" onClick={handleAdd}>
        <FaPlus /> {t("common.skill_add")}
      </Button>
    </Box>
  );
};

export default SkillForm;
