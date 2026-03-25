import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import TemplateListContent from "../../../templates/TemplateListContent";
import { IconButtonCheckUi } from "../../../ui";

import { useApis } from "../../../../ApiProvider";

const AccessFeaturesListContent = ({ accessFeature, setSelectedComponent, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { accessFeatures, setAccessFeatureSelected, accessFeatureDelete, accessFeaturesPageGet, itemsPerPage } =
    useApis();

  const handleDelete = async () => {
    setLoading(true);
    await accessFeatureDelete(accessFeature);
    /*
     const updatedItems = accessFeatures.items.filter((item) => item.id !== accessFeature.id);
     setAccessFeatures({
       ...accessFeatures,
       items: updatedItems,
       total: updatedItems.length,
     });
     */
    const newTotal = accessFeatures.total - 1;
    const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);

    // Vérifier si la page actuelle est toujours valide
    if (page > maxPage) {
      setPage(maxPage); // Mettre à jour la page
    } else {
      const offset = page * parseInt(itemsPerPage, 10);
      await accessFeaturesPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
    setLoading(false);
    onClose();
  };

  const onEdit = () => {
    setAccessFeatureSelected(accessFeature);
    setSelectedComponent("accessFeatureEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("accessFeatures.delete.title")}
      ressource={accessFeature}
      subTitle={t("accessFeatures.delete.subTitle", { name: accessFeature.host })}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>{accessFeature.host}</Table.Cell>
      <Table.Cell>{accessFeature.feature || ""}</Table.Cell>
      <Table.Cell>
        <IconButtonCheckUi item={accessFeature.enabled} />
      </Table.Cell>
    </TemplateListContent>
  );
};

export default AccessFeaturesListContent;
