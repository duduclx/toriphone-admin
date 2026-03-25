import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";

const ConferencesListContent = ({ conference, setSelectedComponent, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { conferences, conferencesPageGet, itemsPerPage, setConferenceSelected, conferenceRemove } = useApis();

  const handleDelete = async () => {
    setLoading(true);
    await conferenceRemove(conference);
    /*
    const updatedItems = conferences.items.filter((item) => item.id !== conference.id);
    setConferences((prev) => ({
      ...prev,
      items: updatedItems,
      total: updatedItems.length,
    }));
    */
    const newTotal = conferences.total - 1;
    const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);

    // Vérifier si la page actuelle est toujours valide
    if (page > maxPage) {
      setPage(maxPage); // Mettre à jour la page
    } else {
      const offset = page * parseInt(itemsPerPage, 10);
      await conferencesPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
    setLoading(false);
    onClose();
  };

  const onEdit = () => {
    setConferenceSelected(conference);
    setSelectedComponent("conferenceEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("conferences.delete.title")}
      ressource={conference}
      subTitle={t("conferences.delete.subTitle", { name: conference.name })}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>{conference.name}</Table.Cell>
      <Table.Cell>{conference.extensions[0]?.exten}</Table.Cell>
      <Table.Cell>{conference.pin}</Table.Cell>
      <Table.Cell>{conference.admin_pin}</Table.Cell>
    </TemplateListContent>
  );
};

export default ConferencesListContent;
