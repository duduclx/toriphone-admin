import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";

const CallpickupListContent = ({ callpickup, setSelectedComponent, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { callpickups, callpickupPageGet, itemsPerPage, setCallpickupSelected, callpickupDelete } = useApis();

  const handleDelete = async () => {
    setLoading(true);
    await callpickupDelete(callpickup);
    /*
    const updatedItems = callpickups.items.filter((item) => item.id !== callpickup.id);
    setCallpickups((prev) => ({
      ...prev,
      items: updatedItems,
      total: updatedItems.length,
    }));
    */
    const newTotal = callpickups.total - 1;
    const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);

    // Vérifier si la page actuelle est toujours valide
    if (page > maxPage) {
      setPage(maxPage); // Mettre à jour la page
    } else {
      const offset = page * parseInt(itemsPerPage, 10);
      await callpickupPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
    setLoading(false);
    onClose();
  };

  const onEdit = () => {
    setCallpickupSelected(callpickup);
    setSelectedComponent("callpickupEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("callpickups.delete.title")}
      ressource={callpickup}
      subTitle={t("callpickups.delete.subTitle", { name: callpickup.name })}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>{callpickup.name}</Table.Cell>
      <Table.Cell>{callpickup.description}</Table.Cell>
      <Table.Cell>{callpickup.interceptors.groups.length + callpickup.interceptors.users.length}</Table.Cell>
      <Table.Cell>{callpickup.targets.groups.length + callpickup.targets.users.length}</Table.Cell>
    </TemplateListContent>
  );
};

export default CallpickupListContent;
