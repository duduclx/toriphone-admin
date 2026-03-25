import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";

const ExtensionsListContent = ({ contexts, groups, extension, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { extensions, extensionsPageGet, itemsPerPage, extensionDelete } = useApis();

  // submit
  const submit = async () => {
    setLoading(true);
    await extensionDelete(extension);
    /*
    const updatedItems = extensions.items.filter((item) => item.id !== extension.id);
    setExtensions({
      ...extensions,
      items: updatedItems,
      total: updatedItems.length,
    });
    */
    const newTotal = extensions.total - 1;
    const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);

    // Vérifier si la page actuelle est toujours valide
    if (page > maxPage) {
      setPage(maxPage); // Mettre à jour la page
    } else {
      const offset = page * parseInt(itemsPerPage, 10);
      await extensionsPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
    setLoading(false);
    onClose();
  };

  const getContextLabel = () => {
    const match = contexts.items.find((item) => item.name === extension.context);
    return match?.label || "";
  };

  const getGroupLabel = () => {
    const match = groups.items.find((item) => item.name === extension.group?.name);
    return match?.label || "";
  };

  return (
    <TemplateListContent
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("extensions.delete.title")}
      ressource={extension}
      subTitle={t("extensions.delete.subTitle", { name: extension.exten })}
      submit={submit}
      loading={loading}
    >
      <Table.Cell>{extension.exten}</Table.Cell>
      <Table.Cell>{getContextLabel()}</Table.Cell>
      <Table.Cell>{extension.conference?.name || ""}</Table.Cell>
      <Table.Cell>{extension.parking_lot?.name || ""}</Table.Cell>
      <Table.Cell>{getGroupLabel()}</Table.Cell>
      <Table.Cell>{extension.queue?.name || ""}</Table.Cell>
      <Table.Cell>{extension.incall?.id || ""}</Table.Cell>
      <Table.Cell>{extension.lines?.map((item) => item.id).join(", ") || ""}</Table.Cell>
      <Table.Cell>{extension.outcall?.id || ""}</Table.Cell>
    </TemplateListContent>
  );
};

export default ExtensionsListContent;
