import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";

import { IconButtonCheckUi } from "../../../ui";

const PhoneNumbersListContent = ({ phoneNumber, setSelectedComponent, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { phoneNumbers, phoneNumbersPageGet, itemsPerPage, setPhoneNumbersSelected, phoneNumberDelete } = useApis();

  // submit
  const handleDelete = async () => {
    setLoading(true);
    await phoneNumberDelete(phoneNumber);
    /*
    const updatedItems = phoneNumbers.items.filter((item) => item.uuid !== phoneNumber.uuid);
    setPhoneNumbers((prev) => ({
      ...prev,
      items: updatedItems,
      total: updatedItems.length,
    }));
    */
    const newTotal = phoneNumbers.total - 1;
    const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);

    // Vérifier si la page actuelle est toujours valide
    if (page > maxPage) {
      setPage(maxPage); // Mettre à jour la page
    } else {
      const offset = page * parseInt(itemsPerPage, 10);
      await phoneNumbersPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
    setLoading(false);
    onClose();
  };

  const onEdit = () => {
    setPhoneNumbersSelected(phoneNumber);
    setSelectedComponent("phoneNumberEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("phoneNumbers.delete.title")}
      ressource={phoneNumber}
      subTitle={t("phoneNumbers.delete.subTitle", { name: phoneNumber.caller_id_name })}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>{phoneNumber.caller_id_name}</Table.Cell>
      <Table.Cell>{phoneNumber.number}</Table.Cell>
      <Table.Cell>
        <IconButtonCheckUi item={phoneNumber.main}/>
      </Table.Cell>
      <Table.Cell>
        <IconButtonCheckUi item={phoneNumber.shared}/>
      </Table.Cell>
    </TemplateListContent>
  );
};

export default PhoneNumbersListContent;
