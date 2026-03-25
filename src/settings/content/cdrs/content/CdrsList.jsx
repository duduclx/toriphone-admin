import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import CdrsListContent from "./CdrsListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const CdrsList = ({ cdrs }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {cdrs?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.date")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.direction")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.source")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.source_name")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.destination")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.destination_name")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.duration")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.answered")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.blocked")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {cdrs.items.length == 0 ? (
              <TemplateTableEmpty colSpan="9"/>
            ) : (
              cdrs.items.map((cdr, index) => <CdrsListContent cdr={cdr} key={index} />)
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
};

export default CdrsList;
