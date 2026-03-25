import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import LinesListContent from "./LinesListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const LinesList = ({ setSelectedComponent, lines, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {lines?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.number")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("lines.caller_name")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("lines.prov_code")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("lines.protocol")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {lines.items.length == 0 ? (
              <TemplateTableEmpty colSpan="6"/>
            ) : (
              lines.items.map((line, index) => (
                <LinesListContent line={line} setSelectedComponent={setSelectedComponent} key={index} page={page} setPage={setPage} search={search}/>
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
};

export default LinesList;
