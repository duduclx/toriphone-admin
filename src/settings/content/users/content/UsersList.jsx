import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import UsersListContent from "./UsersListContent";
import TemplateTable from "../../../templates/TemplateTable";

const UsersList = ({ setSelectedComponent, users, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {users?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.firstname")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.lastname")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.email")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.number")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.agent")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users.items.length == 0 ? (
              <Table.Row bg="TableBodyBg">
                <Table.Cell colSpan="6" textAlign="center">
                  {t("common.no_result")}
                </Table.Cell>
              </Table.Row>
            ) : (
              users.items.map((user, index) => (
                <UsersListContent user={user} key={index} setSelectedComponent={setSelectedComponent} page={page} setPage={setPage} search={search}/>
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
};

export default UsersList;
