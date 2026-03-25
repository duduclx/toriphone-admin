import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";
import DestinationDisplay from "../../../helpers/DestinationDisplay";

const IncallListContent = ({ incall, setSelectedComponent, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { incalls, incallsPageGet, itemsPerPage, setIncallSelected, incallRemove } = useApis();

  // submit
  const handleDelete = async () => {
    setLoading(true);
    await incallRemove(incall);
    /*
    const updatedItems = incalls.items.filter((item) => item.id !== incall.id);
    setIncalls((prev) => ({
      ...prev,
      items: updatedItems,
      total: updatedItems.length,
    }));
    */
    const newTotal = incalls.total - 1;
    const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);

    // Vérifier si la page actuelle est toujours valide
    if (page > maxPage) {
      setPage(maxPage); // Mettre à jour la page
    } else {
      const offset = page * parseInt(itemsPerPage, 10);
      await incallsPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
    setLoading(false);
    onClose();
  };

  // edit
  const onEdit = () => {
    setIncallSelected(incall);
    setSelectedComponent("incallEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("incalls.delete.title")}
      ressource={incall}
      subTitle={t("incalls.delete.subTitle", { name: incall.extensions[0]?.exten })}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>{incall.extensions[0]?.exten}</Table.Cell>
      <Table.Cell><DestinationDisplay destination={incall.destination} /></Table.Cell>
      <Table.Cell>{incall.preprocess_subroutine || ""}</Table.Cell>
      <Table.Cell>{incall.greeting_sound?.split('/').pop() || ""}</Table.Cell>
      <Table.Cell>{incall.schedules[0]?.name}</Table.Cell>
    </TemplateListContent>
  );
};

export default IncallListContent;
