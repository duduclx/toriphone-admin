import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";

const PhonebooksListContent = ({ phonebook, setSelectedComponent, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { phonebooks, phonebooksPageGet, itemsPerPage, setPhonebookSelected, phonebookDelete } = useApis();

  const handleDelete = async () => {
    setLoading(true);
    await phonebookDelete(phonebook);
    /*
    const updatedItems = phonebooks.items.filter((item) => item.uuid !== phonebook.uuid);
    setPhonebooks((prev) => ({
      ...prev,
      items: updatedItems,
      total: updatedItems.length,
    }));
    */
    const newTotal = phonebooks.total - 1;
    const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);

    // Vérifier si la page actuelle est toujours valide
    if (page > maxPage) {
      setPage(maxPage); // Mettre à jour la page
    } else {
      const offset = page * parseInt(itemsPerPage, 10);
      await phonebooksPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
    setLoading(false);
    onClose();
  };

  const onEdit = () => {
    setPhonebookSelected(phonebook);
    setSelectedComponent("phonebookEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("phonebooks.delete.title")}
      ressource={phonebook}
      subTitle={t("phonebooks.delete.subTitle", { name: phonebook.name })}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>{phonebook.name}</Table.Cell>
      <Table.Cell>{phonebook.description}</Table.Cell>
    </TemplateListContent>
  );
};

export default PhonebooksListContent;
