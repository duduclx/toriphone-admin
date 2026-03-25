import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import PhonebooksListContent from "./PhonebooksListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const PhonebooksList = ({ setSelectedComponent, phonebooks, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {phonebooks?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.description")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {phonebooks.items.length == 0 ? (
              <TemplateTableEmpty colSpan="3"/>
            ) : (
              phonebooks.items.map((phonebook, index) => (
                <PhonebooksListContent phonebook={phonebook} key={index} setSelectedComponent={setSelectedComponent} page={page} setPage={setPage} search={search}/>
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
};

export default PhonebooksList;
