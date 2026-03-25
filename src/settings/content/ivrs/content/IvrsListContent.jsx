import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";

const IvrsListContent = ({ ivr, setSelectedComponent, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { ivrs, ivrsPageGet, itemsPerPage, setIvrSelected, ivrDelete } = useApis();

  // submit
  const handleDelete = async () => {
    setLoading(true);
    await ivrDelete(ivr);
    /*
    const updatedItems = ivrs.items.filter((item) => item.id !== ivr.id);
    setIvrs((prev) => ({
      ...prev,
      items: updatedItems,
      total: updatedItems.length,
    }));
    */
    const newTotal = ivrs.total - 1;
    const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);

    // Vérifier si la page actuelle est toujours valide
    if (page > maxPage) {
      setPage(maxPage); // Mettre à jour la page
    } else {
      const offset = page * parseInt(itemsPerPage, 10);
      await ivrsPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
    setLoading(false);
    onClose();
  };

  const onEdit = () => {
    setIvrSelected(ivr);
    setSelectedComponent("ivrEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("ivrs.delete.title")}
      ressource={ivr}
      subTitle={t("ivrs.delete.subTitle", { name: ivr.name })}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>{ivr.name}</Table.Cell>
      <Table.Cell>{ivr.description}</Table.Cell>
      <Table.Cell>{ivr.incalls[0]?.extensions[0].exten || ""}</Table.Cell>
    </TemplateListContent>
  );
};

export default IvrsListContent;
