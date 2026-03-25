import { Table, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";

const SiptransportListContent = ({ transport, setSelectedComponent, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // api
  const { sipTransports, sipTransportsPageGet, itemsPerPage, setSipTransportSelected, sipTransportDelete } = useApis();

  // submit
  const handleDelete = async () => {
    const res = await sipTransportDelete(transport);
    if(res.status !== 401) {
      /*
      const updatedItems = sipTransports.items.filter((item) => item.uuid !== transport.uuid);
      setSipTransports((prev) => ({
        ...prev,
        items: updatedItems,
        total: updatedItems.length,
      }));
      */
      const newTotal = sipTransports.total - 1;
      const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);
  
      // Vérifier si la page actuelle est toujours valide
      if (page > maxPage) {
        setPage(maxPage); // Mettre à jour la page
      } else {
        const offset = page * parseInt(itemsPerPage, 10);
        await sipTransportsPageGet(search, offset, parseInt(itemsPerPage, 10));
      }
    }
    onClose();
  };

  const onEdit = () => {
    setSipTransportSelected(transport);
    setSelectedComponent("siptransportEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("sipTransports.delete.title")}
      ressource={transport}
      subTitle={t("sipTransports.delete.subTitle", { name: transport.name })}
      submit={handleDelete}
    >
      <Table.Cell>{transport.name}</Table.Cell>
    </TemplateListContent>
  );
};

export default SiptransportListContent;
