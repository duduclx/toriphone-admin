import { useEffect } from "react";

import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import ExtensionsListContent from "./ExtensionsListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const ExtensionsList = ({ setSelectedComponent, extensions, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { contexts, contextsGet, groupsAll, groupsGet } = useApis();

  useEffect(() => {
    contextsGet();
    groupsGet();
  }, []);


  return (
    <>
      {extensions?.items && contexts?.items && groupsAll?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("extensions.exten")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("extensions.context")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("extensions.conf_id")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("extensions.parking_id")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("extensions.group_id")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("extensions.queue_id")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("extensions.incall_id")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("extensions.line_id")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("extensions.outcall_id")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {extensions.items.length == 0 ? (
              <TemplateTableEmpty colSpan="10"/>
            ) : (
              extensions.items.map((extension, index) => (
                <ExtensionsListContent contexts={contexts} groups={groupsAll} extension={extension} setSelectedComponent={setSelectedComponent} key={index} page={page} setPage={setPage} search={search} />
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
};

export default ExtensionsList;
