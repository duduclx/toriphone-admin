import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import PoliciesGroupListContent from "./PoliciesGroupListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const PoliciesGroupList = ({ setSelectedComponent, authGroups, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {authGroups?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.system_managed")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.read_only")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {authGroups.items.length == 0 ? (
              <TemplateTableEmpty colSpan="4"/>
            ) : (
              authGroups.items.map((policy, index) => (
                <PoliciesGroupListContent policy={policy} key={index} setSelectedComponent={setSelectedComponent} page={page} setPage={setPage} search={search} />
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
};

export default PoliciesGroupList;
