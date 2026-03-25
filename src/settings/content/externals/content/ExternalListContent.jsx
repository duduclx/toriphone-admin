import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";

const ExternalListContent = ({ external, setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { externals, setExternals, setExternalSelected, setExternalServices, externalDelete } = useApis();

  const handleDelete = async () => {
    setLoading(true);
    await externalDelete(external);
    const updatedItems = externals.items.filter((item) => item.type !== external.type);
    setExternals((prev) => ({
      ...prev,
      items: updatedItems,
      total: updatedItems.length,
    }));
    setExternalServices((prev) => [...prev, external.type]);
    setLoading(false);
    onClose();
  };

  const onEdit = () => {
    setExternalSelected(external);
    setSelectedComponent("externalEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("external.delete.title")}
      ressource={external}
      subTitle={t("external.delete.subTitle", { name: external.type })}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>{external.type}</Table.Cell>
    </TemplateListContent>
  );
};

export default ExternalListContent;
