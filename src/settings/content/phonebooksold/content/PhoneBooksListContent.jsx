import {
  Table,
  IconButton,
  Button,
  Dialog,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

const PhoneBooksListContent = ({ contact, setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation();
  const { open, onOpen, onClose } = useDisclosure();

  const { phonebookContactDelete, phonebookDefaultContacts, setPhonebookDefaultContacts, setPhonebookSelectedContact } =
    useApis();

  const handleDelete = (contact) => {
    phonebookContactDelete(contact);
    const updatedItems = phonebookDefaultContacts.items.filter((item) => item.id !== contact.id);
    setPhonebookDefaultContacts({
      ...phonebookDefaultContacts,
      items: updatedItems,
      total: updatedItems.length,
    });
    onClose();
  };

  return (
    <>
      <Table.Row bg="TableBodyBg">
        <Table.Cell>{contact.firstname}</Table.Cell>
        <Table.Cell>{contact.lastname}</Table.Cell>
        <Table.Cell>{contact.phone}</Table.Cell>
        <Table.Cell>{contact.email}</Table.Cell>
        <Table.Cell>{contact.mobile_phone}</Table.Cell>
        <Table.Cell>{contact.fax}</Table.Cell>
        <Table.Cell>
          <IconButton
            variant="ghost"
            onClick={() => {
              setPhonebookSelectedContact(contact);
              setSelectedComponent("contactEdit");
            }}
          >
            <FaPen />
          </IconButton>
          <IconButton variant="ghost" onClick={onOpen}>
            <FaTrashAlt />
          </IconButton>
        </Table.Cell>
      </Table.Row>
      <Dialog.Root open={open} onOpenChange={onClose}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg="bgDefault">
            <Dialog.Header alignSelf="center">
              <Dialog.Title>{t("phonebooks.delete.title")}</Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger />
            <Dialog.Body>
              <Text>{t("phonebooks.delete.subTitle", { name: contact.firstname + " " + contact.lastname })}</Text>
            </Dialog.Body>

            <Dialog.Footer>
              <Button colorPalette="danger" onClick={() => handleDelete(contact)}>
                {t("common.delete")}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  );
};

export default PhoneBooksListContent;
