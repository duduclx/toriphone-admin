import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplateListContent from "../../../templates/TemplateListContent";

const ExternalAppsListContent = ({ external, setSelectedComponent, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { externalApps, externalAppsPageGet, itemsPerPage, setExternalAppSelected, externalAppDelete } = useApis();

  const handleDelete = async () => {
    setLoading(true);
    await externalAppDelete(external);
    /*
    const updatedItems = externalApps.items.filter((item) => item.name !== external.name);
    setExternalApps((prev) => ({
      ...prev,
      items: updatedItems,
      total: updatedItems.length,
    }));
    */
    const newTotal = externalApps.total - 1;
    const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);

    // Vérifier si la page actuelle est toujours valide
    if (page > maxPage) {
      setPage(maxPage); // Mettre à jour la page
    } else {
      const offset = page * parseInt(itemsPerPage, 10);
      await externalAppsPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
    setLoading(false);
    onClose();
  };

  const onEdit = () => {
    setExternalAppSelected(external);
    setSelectedComponent("externalAppsEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("external_apps.delete.title")}
      ressource={external}
      subTitle={t("external_apps.delete.subTitle", { name: external.name })}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>{external.name}</Table.Cell>
      <Table.Cell>{external.label}</Table.Cell>
      <Table.Cell>{external.configuration?.purpose}</Table.Cell>
    </TemplateListContent>
  );
};

export default ExternalAppsListContent;
