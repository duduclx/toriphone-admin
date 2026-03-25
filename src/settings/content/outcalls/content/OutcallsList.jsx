import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import OutcallsListContent from "./OutcallsListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const OutcallsList = ({ setSelectedComponent, outcalls, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {outcalls?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.description")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.trunks")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {outcalls.items.length == 0 ? (
              <TemplateTableEmpty colSpan="4"/>
            ) : (
              outcalls.items.map((outcall, index) => (
                <OutcallsListContent outcall={outcall} key={index} setSelectedComponent={setSelectedComponent} page={page} setPage={setPage} search={search}/>
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
};

export default OutcallsList;
