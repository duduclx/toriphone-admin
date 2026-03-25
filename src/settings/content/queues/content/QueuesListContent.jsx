import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { Tooltip } from "../../../../components/ui/tooltip";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";

const QueuesListContent = ({ queue, setSelectedComponent, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { queues, queuesPageGet, itemsPerPage, setQueueSelected, queueDelete, extensionDelete } = useApis();

  // submit
  const handleDelete = async () => {
    setLoading(true);
    await queueDelete(queue);
    await extensionDelete(queue.extensions[0]);
    /*
    const updatedItems = queues.items.filter((item) => item.id !== queue.id);
    setQueues({
      ...queues,
      items: updatedItems,
      total: updatedItems.length,
    });
    */
    const newTotal = queues.total - 1;
    const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);

    // Vérifier si la page actuelle est toujours valide
    if (page > maxPage) {
      setPage(maxPage); // Mettre à jour la page
    } else {
      const offset = page * parseInt(itemsPerPage, 10);
      await queuesPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
    setLoading(false);
    onClose();
  };

  const onEdit = () => {
    setQueueSelected(queue);
    setSelectedComponent("queueEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("queues.delete.title")}
      ressource={queue}
      subTitle={t("queues.delete.subTitle", { name: queue.name })}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>{queue.name}</Table.Cell>
      <Table.Cell>{queue.extensions[0]?.exten}</Table.Cell>
      <Table.Cell>
        <Tooltip
          content={queue.members.agents.map((user, index) => (
            <div key={index}>
              {user.firstname} {user.lastname}
            </div>
          ))}
          aria-label="user Names"
        >
          <span>{queue.members.agents.length}</span>
        </Tooltip>
      </Table.Cell>
      <Table.Cell>
        <Tooltip
          content={queue.members.users.map((user, index) => (
            <div key={index}>
              {user.firstname} {user.lastname}
            </div>
          ))}
          aria-label="user Names"
        >
          <span>{queue.members.users.length}</span>
        </Tooltip>
      </Table.Cell>
      <Table.Cell>{queue.schedules[0]?.name}</Table.Cell>
    </TemplateListContent>
  );
};

export default QueuesListContent;
