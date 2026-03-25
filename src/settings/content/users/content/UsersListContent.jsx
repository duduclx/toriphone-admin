import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";

const UsersListContent = ({ user, setSelectedComponent, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { users, usersPageGet, itemsPerPage, setUserCurrent, agents, userDeleteRecursive } = useApis();

  const findAgentQueues = (userAgentId) => {
    const agent = agents.items.find((agent) => agent.id === userAgentId);
    return agent ? agent.queues : [];
  };

  const userQueues = findAgentQueues(user.agent?.id);

  const handleDelete = async () => {
    setLoading(true);
    await userDeleteRecursive(user);
    /*
    const updatedItems = users.items.filter((item) => item.id !== user.id);
    setUsers((prev) => ({
      ...prev,
      items: updatedItems,
      total: updatedItems.length,
    }));
    */
    const newTotal = users.total - 1;
    const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);

    // Vérifier si la page actuelle est toujours valide
    if (page > maxPage) {
      setPage(maxPage); // Mettre à jour la page
    } else {
      const offset = page * parseInt(itemsPerPage, 10);
      await usersPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
    setLoading(false);
    onClose();
  };

  const onEdit = () => {
    setUserCurrent(user);
    setSelectedComponent("userEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("users.delete.title")}
      ressource={user}
      subTitle={t("users.delete.subTitle", { name: user.firstname + " " + user.lastname })}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>{user.firstname}</Table.Cell>
      <Table.Cell>{user.lastname}</Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Cell>{user.lines[0]?.caller_id_num}</Table.Cell>
      <Table.Cell>
        {userQueues.map((queue) => (
          <div key={queue.id}>{queue.name}</div>
        ))}
      </Table.Cell>
    </TemplateListContent>
  );
};

export default UsersListContent;
