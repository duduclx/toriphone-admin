import { useState } from "react";
import { Flex, Text, Separator } from "@chakra-ui/react";
import { InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import ButtonsFormsEdit from "../../../buttons/ButtonsFormsEdit";
import FormContainer from "../../../templates/forms/FormContainer";

const PhonebookEditContact = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation();

  const { phonebookSelectedContact, phonebookContactEdit } = useApis();

  const [newContact, setNewContact] = useState({
    firstname: phonebookSelectedContact.firstname || null,
    lastname: phonebookSelectedContact.lastname || null,
    email: phonebookSelectedContact.email || null,
    phone: phonebookSelectedContact.phone || null,
    mobile_phone: phonebookSelectedContact.mobile_phone || null,
    fax: phonebookSelectedContact.fax || null,
    id: phonebookSelectedContact.id,
  });

  const handleUpdateContact = async () => {
    const contact = await phonebookContactEdit(newContact);
    if (contact) {
      setSelectedComponent("phonebooks");
    } else {
      //error
    }
  };
  return (
    <Flex flexDirection="column" height="100vh" flex="1" p="2">
      <Flex justifyContent="space-between" alignItems="center" px={8}>
        <Text p={2} as="b" fontSize="3xl">
          {t("phonebooks.edit.title", {
            name: phonebookSelectedContact.firstname + " " + phonebookSelectedContact.lastname,
          })}
        </Text>
      </Flex>
      <Separator />
      <Flex mt="4" mr="4" justifyContent="flex-end"></Flex>
      <Flex
        flexDirection="column"
        p="2"
        flexWrap="nowrap"
        overflowX="auto"
        justifyContent="flex-start"
        alignContent="center"
        className="hide-scrollbar"
        flex="1"
      >
        <Flex flex="1" flexDirection="column" p="12">
          <FormContainer alignSelf="center" width="50%" justifyContent="center">
            <Text fontSize="xl" textAlign="center" mb="4">
              {t("phonebooks.edit.subTitle", {
                name: phonebookSelectedContact.firstname + " " + phonebookSelectedContact.lastname,
              })}
            </Text>
            <InputUi
              placeholder={t("common.firstname")}
              value={newContact.firstname || ""}
              onChange={(e) => setNewContact({ ...newContact, firstname: e.target.value })}
            />
            <InputUi
              placeholder={t("common.lastname")}
              value={newContact.lastname || ""}
              onChange={(e) => setNewContact({ ...newContact, lastname: e.target.value })}
            />
            <InputUi
              placeholder={t("common.email")}
              value={newContact.email || ""}
              onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
            />
            <InputUi
              placeholder={t("common.phone")}
              value={newContact.phone || ""}
              onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
            />
            <InputUi
              value={newContact.mobile_phone || ""}
              placeholder={t("common.mobile_phone")}
              onChange={(e) => setNewContact({ ...newContact, mobile_phone: e.target.value })}
            />
            <InputUi
              placeholder={t("common.fax")}
              value={newContact.fax || ""}
              onChange={(e) => setNewContact({ ...newContact, fax: e.target.value })}
            />
            <ButtonsFormsEdit
              setSelectedComponent={setSelectedComponent}
              route={"phonebooks"}
              submit={handleUpdateContact}
            />
          </FormContainer>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PhonebookEditContact;
