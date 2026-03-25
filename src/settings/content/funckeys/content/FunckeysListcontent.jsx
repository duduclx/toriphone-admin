import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";

const FunckeysListcontent = ({ funckey, setSelectedComponent, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { funckeysTemplates, funckeysTemplatesPageGet, itemsPerPage, setFunckeyTemplateSelected, funckeysTemplateDelete } = useApis();

  const handleDelete = async () => {
    setLoading(true);
    await funckeysTemplateDelete(funckey);
    /*
    const updatedItems = funckeysTemplates.items.filter((item) => item.id !== funckey.id);
    setFunckeysTemplates((prev) => ({
      ...prev,
      items: updatedItems,
      total: updatedItems.length,
    }));
    */
    const newTotal = funckeysTemplates.total - 1;
    const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);

    // Vérifier si la page actuelle est toujours valide
    if (page > maxPage) {
      setPage(maxPage); // Mettre à jour la page
    } else {
      const offset = page * parseInt(itemsPerPage, 10);
      await funckeysTemplatesPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
    setLoading(false);
    onClose();
  };

  const onEdit = () => {
    setFunckeyTemplateSelected(funckey);
    setSelectedComponent("funckeyEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("funckeys.delete.title")}
      ressource={funckey}
      subTitle={t("funckeys.delete.subTitle", { name: funckey.name })}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>{funckey.name}</Table.Cell>
    </TemplateListContent>
  );
};

export default FunckeysListcontent;
