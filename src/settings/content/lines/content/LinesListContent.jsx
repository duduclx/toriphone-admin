import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";

const LinesListContent = ({ line, setSelectedComponent, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { lines, linesPageGet, itemsPerPage, setLineSelected, lineDeleteRecursive, extensionDelete } = useApis();

  // submit
  const handleDelete = async () => {
    setLoading(true);
    await lineDeleteRecursive(line);
    if (line.extensions?.length >= 1) {
      await extensionDelete(line.extensions[0]);
    }
    const newTotal = lines.total - 1;
    const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);

    // Vérifier si la page actuelle est toujours valide
    if (page > maxPage) {
      setPage(maxPage); // Mettre à jour la page
    } else {
      const offset = page * parseInt(itemsPerPage, 10);
      await linesPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
    setLoading(false);
    onClose();
  };

  const onEdit = () => {
    setLineSelected(line);
    setSelectedComponent("lineEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("lines.delete.title")}
      ressource={line}
      subTitle={t("lines.delete.subTitle", { name: line.name })}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>{line.caller_id_num}</Table.Cell>
      <Table.Cell>{line.caller_id_name}</Table.Cell>
      <Table.Cell>{line.provisioning_code}</Table.Cell>
      <Table.Cell>{line.protocol}</Table.Cell>
      <Table.Cell>{line.endpoint_sip ? line.endpoint_sip.label : line.name}</Table.Cell>
    </TemplateListContent>
  );
};

export default LinesListContent;
