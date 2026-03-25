import { useState, useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { ButtonAddUi, IconButtonTrashUi, InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";


const SkillsRuleRules = ({ skillsrule, setSkillsrule }) => {
  // requirements
  const { t } = useTranslation("admin");

  const [rules, setRules] = useState(skillsrule.rules || []);

  useEffect(() => {
    setSkillsrule((prev) => ({
      ...prev,
      rules: rules,
    }));
  }, [rules, setSkillsrule]);

  const handleAdd = () => {
    setRules([...rules, { definition: "" }]);
  };

  const handleRemove = (index) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const handleChange = (index, value) => {
    const updatedRules = rules.map((rule, i) =>
        i === index ? { ...rule, definition: value } : rule
      );
      setRules(updatedRules);
  };

  return (
    <Flex flexDirection="column" gap="2" >
      <Text>{t("common.rules")} :</Text>
      {rules.map((rule, index) => (
        <Flex key={index} gap="4">
          <IconButtonTrashUi onClick={() => handleRemove(index)}/>
            <InputUi
              placeholder={t("common.rules")}
              value={rule.definition}
              onChange={(e) => handleChange(index, e.target.value)}
            />
        </Flex>
      ))}
      <ButtonAddUi text={t("common.rule_add")} onClick={handleAdd}/>
    </Flex>
  );
}

export default SkillsRuleRules