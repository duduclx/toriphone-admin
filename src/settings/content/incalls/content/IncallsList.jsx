import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import IncallListContent from "./IncallListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const IncallsList = ({ setSelectedComponent, incalls, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {incalls?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.did")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.destination")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.subroutine")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.sound")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.schedules")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {incalls.items.length == 0 ? (
              <TemplateTableEmpty colSpan="6"/>
            ) : (
              incalls.items.map((incall, index) => (
                <IncallListContent incall={incall} key={index} setSelectedComponent={setSelectedComponent} page={page} setPage={setPage} search={search} />
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
};

export default IncallsList;
