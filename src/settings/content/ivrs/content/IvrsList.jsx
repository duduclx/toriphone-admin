import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import IvrsListContent from "./IvrsListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const IvrsList = ({ setSelectedComponent, ivrs, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {ivrs?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.description")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.numbers")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {ivrs.items.length == 0 ? (
              <TemplateTableEmpty colSpan="4"/>
            ) : (
              ivrs.items.map((ivr, index) => (
                <IvrsListContent ivr={ivr} key={index} setSelectedComponent={setSelectedComponent} page={page} setPage={setPage} search={search} />
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
};

export default IvrsList;
