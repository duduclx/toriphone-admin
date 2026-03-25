import { useEffect } from "react";
import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import ContextsListContent from "./ContextsListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

import useFilteredItems from "../../../templates/filter/filteredItems";

const ContextsList = ({ setSelectedComponent, filter, filtered, setFiltered }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { contexts, contextsGet } = useApis();

  useEffect(() => {
    contextsGet();
  }, []);

  useFilteredItems({
    filter,
    setFiltered,
    items: contexts?.items || [],
  });

  return (
    <>
      {contexts?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.description")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.type")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.contexts_included")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filtered.length == 0 ? (
              <TemplateTableEmpty colSpan="5"/>
            ) : (
              filtered.map((context, index) => (
                <ContextsListContent context={context} key={index} setSelectedComponent={setSelectedComponent} />
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
};

export default ContextsList;
