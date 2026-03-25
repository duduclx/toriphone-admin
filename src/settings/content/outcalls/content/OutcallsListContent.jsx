import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";

const OutcallsListContent = ({ outcall, setSelectedComponent, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { outcalls, outcallsPageGet, itemsPerPage, setOutcallSelected, outcallRemove } = useApis();

  // submit
  const handleDelete = async () => {
    setLoading(true);
    await outcallRemove(outcall);
    const newTotal = outcalls.total - 1;
    const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);

    // Vérifier si la page actuelle est toujours valide
    if (page > maxPage) {
      setPage(maxPage); // Mettre à jour la page
    } else {
      const offset = page * parseInt(itemsPerPage, 10);
      await outcallsPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
    setLoading(false);
    onClose();
  };

  const onEdit = () => {
    setOutcallSelected(outcall);
    setSelectedComponent("outcallEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("outcalls.delete.title")}
      ressource={outcall}
      subTitle={t("outcalls.delete.subTitle", { name: outcall.name })}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>{outcall.name}</Table.Cell>
      <Table.Cell>{outcall.description}</Table.Cell>
      <Table.Cell>
        {outcall.trunks
          .map((trunk) => trunk.endpoint_sip?.label ?? trunk.endpoint_custom?.label)
          .filter((label) => label !== undefined)
          .join(", ")}
      </Table.Cell>
    </TemplateListContent>
  );
};

export default OutcallsListContent;
