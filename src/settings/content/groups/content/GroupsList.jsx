import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import GroupsListContent from "./GroupsListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const GroupsList = ({ setSelectedComponent, groups, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {groups?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.label")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.members")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.strategy")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.schedule")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.fallbacks")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.extension")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {groups.items.length == 0 ? (
              <TemplateTableEmpty colSpan="7"/>
            ) : (
              groups.items.map((group, index) => (
                <GroupsListContent
                  key={index}
                  setSelectedComponent={setSelectedComponent}
                  group={group}
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

export default GroupsList;
