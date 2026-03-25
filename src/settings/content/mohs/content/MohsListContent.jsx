import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { Tooltip } from "../../../../components/ui/tooltip";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";

const MohsListContent = ({ moh, setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { mohs, setMohs, setMohSelected, mohDelete } = useApis();

  // submit
  const handleDelete = async () => {
    setLoading(true);
    await mohDelete(moh);
    const updatedItems = mohs.items.filter((item) => item.uuid !== moh.uuid);
    setMohs((prev) => ({
      ...prev,
      items: updatedItems,
      total: updatedItems.length,
    }));
    setLoading(false);
    onClose();
  };

  const onEdit = () => {
    setMohSelected(moh);
    setSelectedComponent("mohEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("mohs.delete.title")}
      ressource={moh}
      subTitle={t("mohs.delete.subTitle", { name: moh.label })}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>{moh.label}</Table.Cell>
      <Table.Cell>{moh.mode === "files" ? t("common.files") : t("common.custom")}</Table.Cell>
      <Table.Cell>{moh.application}</Table.Cell>
      <Table.Cell>{moh.sort ? t(`common.${moh.sort}`) : ""}</Table.Cell>
      <Table.Cell>
        <Tooltip
          content={moh.files.map((file, index) => (
            <div key={index}>{file.name}</div>
          ))}
          aria-label="user Names"
        >
          <span>{moh.files.length}</span>
        </Tooltip>
      </Table.Cell>
    </TemplateListContent>
  );
};

export default MohsListContent;
