import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import SessionsListContent from "./SessionsListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const SessionsList = ({ setSelectedComponent, sessions, page, setPage, search}) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {sessions?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.user")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.firstname")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.lastname")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.mobile_phone")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("sessions.list.delete_all")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {sessions.items.length == 0 ? (
              <TemplateTableEmpty colSpan="6"/>
            ) : (
              sessions.items.map((session, index) => (
                <SessionsListContent session={session} key={index} setSelectedComponent={setSelectedComponent} page={page} setPage={setPage} search={search} />
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
}

export default SessionsList
