import { Table, useDisclosure } from "@chakra-ui/react";
import { Tooltip } from "../../../../components/ui/tooltip";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";

const SkillsRulesListContent = ({ skillsrule, setSelectedComponent, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // api
  const { queuesSkills, queuesSkillrulesPageGet, itemsPerPage, setQueueSkillSelected, queuesSkillruleDelete } = useApis();

  // submit
  const handleDelete = async () => {
    await queuesSkillruleDelete(skillsrule);
    /*
    const updatedItems = queuesSkills.items.filter((item) => item.id !== skillsrule.id);
    setQueuesSkills((prev) => ({
      ...prev,
      items: updatedItems,
      total: updatedItems.length,
    }));
    */
    const newTotal = queuesSkills.total - 1;
    const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);

    // Vérifier si la page actuelle est toujours valide
    if (page > maxPage) {
      setPage(maxPage); // Mettre à jour la page
    } else {
      const offset = page * parseInt(itemsPerPage, 10);
      await queuesSkillrulesPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
    onClose();
  };

  const onEdit = () => {
    setQueueSkillSelected(skillsrule);
    setSelectedComponent("skillsRuleEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("skillsrules.delete.title")}
      ressource={skillsrule}
      subTitle={t("skillsrules.delete.subTitle", { name: skillsrule.name })}
      submit={handleDelete}
    >
      <Table.Cell>{skillsrule.name}</Table.Cell>
      <Table.Cell>
        <Tooltip
          content={skillsrule.rules.map((rule, index) => (
            <div key={index}>{rule.definition}</div>
          ))}
          aria-label="user Names"
        >
          <span>{skillsrule.rules.length}</span>
        </Tooltip>
      </Table.Cell>
    </TemplateListContent>
  );
};

export default SkillsRulesListContent;
