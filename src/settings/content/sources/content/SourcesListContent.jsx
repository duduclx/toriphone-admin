import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";

const SourcesListContent = ({ source, setSelectedComponent, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { sources, sourcesPageGet, itemsPerPage, setSourceSelected, backendsSourceDelete } = useApis();

  // submit
  const handleDelete = async () => {
    setLoading(true);
    await backendsSourceDelete(source.backend, source);
    /*
    const updatedItems = sources.items.filter((item) => item.uuid !== source.uuid);
    setSources((prev) => ({
      ...prev,
      items: updatedItems,
      total: updatedItems.length,
    }));
    */
    const newTotal = sources.total - 1;
    const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);

    // Vérifier si la page actuelle est toujours valide
    if (page > maxPage) {
      setPage(maxPage); // Mettre à jour la page
    } else {
      const offset = page * parseInt(itemsPerPage, 10);
      await sourcesPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
    setLoading(false);
    onClose();
  };

  const onEdit = () => {
    setSourceSelected(source);
    setSelectedComponent("sourceEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("sources.delete.title")}
      ressource={source}
      subTitle={t("sources.delete.subTitle", { name: source.name })}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>{source.name}</Table.Cell>
      <Table.Cell>{source.backend}</Table.Cell>
    </TemplateListContent>
  );
};

export default SourcesListContent;
