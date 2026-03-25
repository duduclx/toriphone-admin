import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import CallpermissionsListContent from "./CallpermissionsListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const CallpermissionsList = ({ setSelectedComponent, callPermissions, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {callPermissions?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.mode")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.password")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {callPermissions.items.length == 0 ? (
              <TemplateTableEmpty colSpan="4"/>
            ) : (
              callPermissions.items.map((callpermission, index) => (
                <CallpermissionsListContent
                  callpermission={callpermission}
                  key={index}
                  setSelectedComponent={setSelectedComponent}
                  page={page}
                  setPage={setPage}
                  search={search}
                />
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
};

export default CallpermissionsList;
