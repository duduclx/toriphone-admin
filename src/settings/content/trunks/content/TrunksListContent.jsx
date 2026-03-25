import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplateListContent from "../../../templates/TemplateListContent";

const TrunksListContent = ({ trunk, setSelectedComponent, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { trunks, trunksPageGet, itemsPerPage, setTrunkSelected, trunkDelete } = useApis();

  // submit
  const submit = async () => {
    setLoading(true);
    await trunkDelete(trunk);
    const newTotal = trunks.total - 1;
    const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);

    // Vérifier si la page actuelle est toujours valide
    if (page > maxPage) {
      setPage(maxPage); // Mettre à jour la page
    } else {
      const offset = page * parseInt(itemsPerPage, 10);
      await trunksPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
    setLoading(false);
    onClose();
  };

  // edit
  const onEdit = () => {
    setTrunkSelected(trunk);
    setSelectedComponent("trunkEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("trunks.delete.title")}
      ressource={trunk}
      subTitle={t("trunks.delete.subTitle", { name: trunk.endpoint_sip?.label || trunk.endpoint_custom?.interface || trunk.endpoint_iax?.name || ""})}
      submit={submit}
      loading={loading}
    >
      <Table.Cell>
        {trunk.endpoint_custom && "custom"} {trunk.endpoint_iax && "iax"} {trunk.endpoint_sip && "sip"}
      </Table.Cell>
      <Table.Cell>{trunk.endpoint_sip && trunk.endpoint_sip.label} {trunk.endpoint_custom && trunk.endpoint_custom.interface} {trunk.endpoint_iax && trunk.endpoint_iax.name}</Table.Cell>
      <Table.Cell>{trunk.endpoint_sip?.name}</Table.Cell>
      <Table.Cell>{trunk.outcalls.map((item) => item.name).join(", ")}</Table.Cell>
    </TemplateListContent>
  );
};

export default TrunksListContent;
