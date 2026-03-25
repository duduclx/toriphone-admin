import { Table} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import AuthUsersListContent from "./AuthUsersListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const AuthUsersList = ({ setSelectedComponent, authUsers, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {authUsers?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.username")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.firstname")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.lastname")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.email")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.type")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.enabled")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {authUsers.items.length == 0 ? (
              <TemplateTableEmpty colSpan="7"/>
            ) : (
              authUsers.items.map((identity, index) => (
                <AuthUsersListContent identity={identity} key={index} setSelectedComponent={setSelectedComponent} page={page} setPage={setPage} search={search}/>
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
};

export default AuthUsersList;
