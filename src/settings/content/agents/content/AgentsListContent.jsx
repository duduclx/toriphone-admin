import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { Tooltip } from "../../../../components/ui/tooltip";
import { useTranslation } from "react-i18next";

import TemplateListContent from "../../../templates/TemplateListContent";

import { useApis } from "../../../../ApiProvider";

const AgentsListContent = ({ agent, setSelectedComponent, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { agents, setAgentSelected, agentRemove, itemsPerPage, agentsPageGet } = useApis();

  const handleDelete = async () => {
    setLoading(true);
    await agentRemove(agent);
    /*
    const updatedItems = agents.items.filter((item) => item.id !== agent.id);
    setAgents({
      ...agents,
      items: updatedItems,
      total: updatedItems.length,
    });
    */
    const newTotal = agents.total - 1;
    const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);

    // Vérifier si la page actuelle est toujours valide
    if (page > maxPage) {
      setPage(maxPage); // Mettre à jour la page
    } else {
      const offset = page * parseInt(itemsPerPage, 10);
      await agentsPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
    setLoading(false);
    onClose();
  };

  const onEdit = () => {
    setAgentSelected(agent);
    setSelectedComponent("agentEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("agents.delete.title")}
      ressource={agent}
      subTitle={t("agents.delete.subTitle", { name: agent.firstname + " " + agent.lastname })}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>{agent.firstname}</Table.Cell>
      <Table.Cell>{agent.lastname}</Table.Cell>
      <Table.Cell>{agent.number}</Table.Cell>
      <Table.Cell>{agent.description || ""}</Table.Cell>
      <Table.Cell>
        {agent.queues.map((queue) => (
          <div key={queue.id}>{queue.name}</div>
        ))}
      </Table.Cell>
      <Table.Cell>
        {agent.users[0]?.firstname} {agent.users[0]?.lastname}
      </Table.Cell>
      <Table.Cell>
        <Tooltip
          content={agent.skills.map((skill, index) => (
            <div key={index}>
              {skill.name} - {skill.skill_weight}
            </div>
          ))}
          aria-label="user Names"
        >
          <span>{agent.skills.length}</span>
        </Tooltip>
      </Table.Cell>
    </TemplateListContent>
  );
};

export default AgentsListContent;
