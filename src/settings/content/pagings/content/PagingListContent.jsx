import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { Tooltip } from "../../../../components/ui/tooltip";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";

const PagingListContent = ({ paging, setSelectedComponent, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { pagings, pagingPageGet, itemsPerPage, setPagingSelected, pagingDelete } = useApis();

  // submit
  const handleDelete = async () => {
    setLoading(true);
    await pagingDelete(paging);
    /*
    const updatedItems = pagings.items.filter((item) => item.id !== paging.id);
    setPagings((prev) => ({
      ...prev,
      items: updatedItems,
      total: updatedItems.length,
    }));
    */
    const newTotal = pagings.total - 1;
    const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);

    // Vérifier si la page actuelle est toujours valide
    if (page > maxPage) {
      setPage(maxPage); // Mettre à jour la page
    } else {
      const offset = page * parseInt(itemsPerPage, 10);
      await pagingPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
    setLoading(false);
    onClose();
  };

  const onEdit = () => {
    setPagingSelected(paging);
    setSelectedComponent("pagingEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("pagings.delete.title")}
      ressource={paging}
      subTitle={t("pagings.delete.subTitle", { name: paging.name })}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>{paging.name}</Table.Cell>
      <Table.Cell>{paging.number}</Table.Cell>
      <Table.Cell>
        <Tooltip
          content={paging.members.users.map((user, index) => (
            <div key={index}>
              {user.firstname} {user.lastname}
            </div>
          ))}
          aria-label="user Names"
        >
          <span>{paging.members.users.length}</span>
        </Tooltip>
      </Table.Cell>
      <Table.Cell>
        <Tooltip
          content={paging.callers.users.map((user, index) => (
            <div key={index}>
              {user.firstname} {user.lastname}
            </div>
          ))}
          aria-label="user Names"
        >
          <span>{paging.callers.users.length}</span>
        </Tooltip>
      </Table.Cell>
    </TemplateListContent>
  );
};

export default PagingListContent;
