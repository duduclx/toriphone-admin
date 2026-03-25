import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";

const SipTemplatesListContent = ({ template, setSelectedComponent, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const {
    endpointsSipTemplates,
    endpointsSipTemplatesPageGet,
    itemsPerPage,
    setEndpointSipTemplateSelected,
    endpointSipTemplatesDelete,
  } = useApis();

  // submit
  const handleDelete = async () => {
    setLoading(true);
    await endpointSipTemplatesDelete(template);
    /*
    const updatedItems = endpointsSipTemplates.items.filter((item) => item.uuid !== template.uuid);
    setEndpointsSipTemplates((prev) => ({
      ...prev,
      items: updatedItems,
      total: updatedItems.length,
    }));
    */
    const newTotal = endpointsSipTemplates.total - 1;
    const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);

    // Vérifier si la page actuelle est toujours valide
    if (page > maxPage) {
      setPage(maxPage); // Mettre à jour la page
    } else {
      const offset = page * parseInt(itemsPerPage, 10);
      await endpointsSipTemplatesPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
    setLoading(false);
    onClose();
  };

  const onEdit = () => {
    setEndpointSipTemplateSelected(template);
    setSelectedComponent("sipTemplateEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("sipTemplates.delete.title")}
      ressource={template}
      subTitle={t("sipTemplates.delete.subTitle", { name: template.label })}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>{template.label}</Table.Cell>
    </TemplateListContent>
  );
};

export default SipTemplatesListContent;
