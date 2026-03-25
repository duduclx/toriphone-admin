import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { Tooltip } from "../../../../components/ui/tooltip";
import { useTranslation } from "react-i18next";

import TemplateListContent from "../../../templates/TemplateListContent";
import DestinationDisplay from "../../../helpers/DestinationDisplay";

import { useApis } from "../../../../ApiProvider";

const GroupsListContent = ({ setSelectedComponent, group, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { groupDelete, extensionDelete, groups, setGroupSelected, groupsPageGet, itemsPerPage } = useApis();

  // submit
  const handleDelete = async () => {
    setLoading(true);
    await groupDelete(group);
    await extensionDelete(group.extensions[0]);
    /*
    const updatedItems = groups.items.filter((item) => item.id !== group.id);
    setGroups({
      ...groups,
      items: updatedItems,
      total: updatedItems.length,
    });
    */
    // Nouveau total après suppression
    const newTotal = groups.total - 1;
    const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);

    // Vérifier si la page actuelle est toujours valide
    if (page > maxPage) {
      setPage(maxPage); // Mettre à jour la page
    } else {
      const offset = page * parseInt(itemsPerPage, 10);
      await groupsPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
    setLoading(false);
    onClose();
  };

  // edit
  const onEdit = () => {
    setGroupSelected(group);
    setSelectedComponent("groupEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("groups.delete.title")}
      ressource={group}
      subTitle={t("groups.delete.subTitle", { name: group.label })}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>{group.label}</Table.Cell>
      <Table.Cell>
        <Tooltip
          content={group.members.users.map((user, index) => (
            <div key={index}>
              {user.firstname} {user.lastname}
            </div>
          ))}
          aria-label="user Names"
        >
          <span>{group.members.users.length}</span>
        </Tooltip>
      </Table.Cell>
      <Table.Cell>{group.ring_strategy}</Table.Cell>
      <Table.Cell>{group.schedules[0]?.name}</Table.Cell>
      <Table.Cell>
        <DestinationDisplay destination={group.fallbacks.noanswer_destination} />
      </Table.Cell>
      <Table.Cell>{group.extensions[0]?.exten || ""}</Table.Cell>
    </TemplateListContent>
  );
};

export default GroupsListContent;
