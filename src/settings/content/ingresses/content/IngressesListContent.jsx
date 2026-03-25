import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";

const IngressesListContent = ({ ingress, setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { ingresses, setIngresses, setIgressSelected, ingressDelete } = useApis();

  // submit
  const handleDelete = async () => {
    setLoading(true);
    await ingressDelete(ingress);
    const updatedItems = ingresses.items.filter((item) => item.id !== ingress.id);
    setIngresses((prev) => ({
      ...prev,
      items: updatedItems,
      total: updatedItems.length,
    }));
    setLoading(false);
    onClose();
  };

  // edit
  const onEdit = () => {
    setIgressSelected(ingress);
    setSelectedComponent("ingressEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("ingresses.delete.title")}
      ressource={ingress}
      subTitle={t("ingresses.delete.subTitle", { name: ingress.uri })}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>{ingress.uri}</Table.Cell>
    </TemplateListContent>
  );
};

export default IngressesListContent;
