import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { Tooltip } from "../../../../components/ui/tooltip";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";

const SoundsListContent = ({ sound, setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { sounds, setSounds, setSoundSelected, soundCategoryDelete } = useApis();

  const handleDelete = async () => {
    setLoading(true);
    await soundCategoryDelete(sound.name);
    const updatedItems = sounds.items.filter((item) => item.name !== sound.name);
    setSounds({
      ...sounds,
      items: updatedItems,
      total: updatedItems.length,
    });
    setLoading(false);
    onClose();
  };

  const onEdit = () => {
    setSoundSelected(sound);
    setSelectedComponent("soundEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("sounds.delete.category.title")}
      ressource={sound}
      subTitle={t("sounds.delete.category.subTitle", { name: sound.name })}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>{sound.name}</Table.Cell>
      <Table.Cell>
        <Tooltip
          content={sound.files.map((file, index) => (
            <div key={index}>{file.name}</div>
          ))}
          aria-label="files Name"
        >
          <span>{sound.files.length}</span>
        </Tooltip>
      </Table.Cell>
    </TemplateListContent>
  );
};

export default SoundsListContent;
