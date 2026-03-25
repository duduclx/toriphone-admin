import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";

const VoicemailsListcontent = ({ voicemail, setSelectedComponent, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { voicemails, voicemailsPageGet, itemsPerPage, setVoicemailSelected, voicemailRemove } = useApis();

  // submit
  const handleDelete = async () => {
    setLoading(true);
    await voicemailRemove(voicemail);
    /*
    const updatedItems = voicemails.items.filter((item) => item.id !== voicemail.id);
    setVoicemails((prev) => ({
      ...prev,
      items: updatedItems,
      total: updatedItems.length,
    }));
    */
    const newTotal = voicemails.total - 1;
    const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);

    // Vérifier si la page actuelle est toujours valide
    if (page > maxPage) {
      setPage(maxPage); // Mettre à jour la page
    } else {
      const offset = page * parseInt(itemsPerPage, 10);
      await voicemailsPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
    setLoading(false);
    onClose();
  };

  const onEdit = () => {
    setVoicemailSelected(voicemail);
    setSelectedComponent("voicemailEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("voicemails.delete.title")}
      ressource={voicemail}
      subTitle={t("voicemails.delete.subTitle", { name: voicemail.name })}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>{voicemail.name}</Table.Cell>
      <Table.Cell>{voicemail.number}</Table.Cell>
      <Table.Cell>{voicemail.email}</Table.Cell>
      <Table.Cell>
        {voicemail.users[0]?.firstname} {voicemail.users[0]?.lastname}
      </Table.Cell>
    </TemplateListContent>
  );
};

export default VoicemailsListcontent;
