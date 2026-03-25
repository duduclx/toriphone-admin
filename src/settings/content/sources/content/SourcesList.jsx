import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import SourcesListContent from "./SourcesListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const SourcesList = ({ setSelectedComponent, sources, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {sources?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.backend")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {sources.items.length == 0 ? (
              <TemplateTableEmpty colSpan="3"/>
            ) : (
              sources.items.map((source, index) => (
                <SourcesListContent source={source} key={index} setSelectedComponent={setSelectedComponent} page={page} setPage={setPage} search={search}/>
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
};

export default SourcesList;
