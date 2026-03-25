import { Table, useDisclosure } from "@chakra-ui/react";
import { Tooltip } from "../../../../components/ui/tooltip";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";

const SkillsListContent = ({ skill, setSelectedComponent, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // api
  const { agentsSkills, agentsSkillsPageGet, itemsPerPage, setAgentsSkillSelected, agentsSkillsDelete } = useApis();

  // submit
  const handleDelete = async () => {
    await agentsSkillsDelete(skill);
    /*
    const updatedItems = agentsSkills.items.filter((item) => item.id !== skill.id);
    setAgentsSkills((prev) => ({
      ...prev,
      items: updatedItems,
      total: updatedItems.length,
    }));
    */
    const newTotal = agentsSkills.total - 1;
    const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);

    // Vérifier si la page actuelle est toujours valide
    if (page > maxPage) {
      setPage(maxPage); // Mettre à jour la page
    } else {
      const offset = page * parseInt(itemsPerPage, 10);
      await agentsSkillsPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
    onClose();
  };

  const onEdit = () => {
    setAgentsSkillSelected(skill);
    setSelectedComponent("skillEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("skills.delete.title")}
      ressource={skill}
      subTitle={t("skills.delete.subTitle", { name: skill.name })}
      submit={handleDelete}
    >
      <Table.Cell>{skill.name}</Table.Cell>
      <Table.Cell>{skill.description}</Table.Cell>
      <Table.Cell>
        <Tooltip
          content={skill.agents.map((user, index) => (
            <div key={index}>
              {user.firstname} {user.lastname}
            </div>
          ))}
          aria-label="user Names"
        >
          <span>{skill.agents.length}</span>
        </Tooltip>
      </Table.Cell>
    </TemplateListContent>
  );
};

export default SkillsListContent;
