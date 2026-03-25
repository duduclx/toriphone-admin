import { useEffect } from "react";
import { Table, Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import PhoneBooksListContent from "./PhoneBooksListContent";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const PhonebooksList = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation();

  const { phonebookDefaultContacts, phonebookDefaultContactsGet } = useApis();

  useEffect(() => {
    phonebookDefaultContactsGet();
  }, []);

  return (
    <>
      {phonebookDefaultContacts?.items && (
        <Flex flexDirection="column" justifyContent="center" flex="1" alignItems="center" mt="4">
          <Table.ScrollArea width="100%" height="calc(100vh - 220px)" overflowY="auto">
            <Table.Root variant="line">
              <Table.Caption></Table.Caption>
              <Table.Header>
                <Table.Row bg="TableHeaderBg">
                  <Table.ColumnHeader>{t("common.firstname")}</Table.ColumnHeader>
                  <Table.ColumnHeader>{t("common.lastname")}</Table.ColumnHeader>
                  <Table.ColumnHeader>{t("common.number")}</Table.ColumnHeader>
                  <Table.ColumnHeader>{t("common.email")}</Table.ColumnHeader>
                  <Table.ColumnHeader>{t("common.mobile_phone")}</Table.ColumnHeader>
                  <Table.ColumnHeader>{t("common.fax")}</Table.ColumnHeader>
                  <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {phonebookDefaultContacts.items.length == 0 ? (
                  <TemplateTableEmpty colSpan="7"/>
                ) : (
                  phonebookDefaultContacts.items.map((contact, index) => (
                    <PhoneBooksListContent contact={contact} setSelectedComponent={setSelectedComponent} key={index} />
                  ))
                )}
              </Table.Body>
            </Table.Root>
          </Table.ScrollArea>
        </Flex>
      )}
    </>
  );
};

export default PhonebooksList;
