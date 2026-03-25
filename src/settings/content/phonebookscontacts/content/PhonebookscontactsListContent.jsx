import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";

const PhonebookscontactsListContent = ({ contact, setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const {
    phonebookContacts,
    setPhonebookContacts,
    setPhonebookContactSelected,
    phonebookSelected,
    phonebookContactDelete,
  } = useApis();

  // submit
  const handleDelete = (contact) => {
    setLoading(true);
    phonebookContactDelete(phonebookSelected, contact);
    const updatedItems = phonebookContacts.items.filter((item) => item.id !== contact.id);
    setPhonebookContacts({
      ...phonebookContacts,
      items: updatedItems,
      total: updatedItems.length,
    });
    setLoading(false);
    onClose();
  };

  const onEdit = () => {
    setPhonebookContactSelected(contact);
    setSelectedComponent("phonebooksContactEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("phonebooks_contacts.delete.title")}
      ressource={contact}
      subTitle={t("phonebooks_contacts.delete.subTitle", { name: contact.firstname + " " + contact.lastname })}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>{contact.firstname}</Table.Cell>
      <Table.Cell>{contact.lastname}</Table.Cell>
      <Table.Cell>{contact.phone}</Table.Cell>
      <Table.Cell>{contact.email}</Table.Cell>
      <Table.Cell>{contact.mobile_phone}</Table.Cell>
      <Table.Cell>{contact.fax}</Table.Cell>
    </TemplateListContent>
  );
};

export default PhonebookscontactsListContent;
