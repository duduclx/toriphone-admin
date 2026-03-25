import { useEffect } from "react";
import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import AgentsStatsListContent from "./AgentsStatsListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";
import useFilteredItems from "../../../templates/filter/filteredItems";

const AgentsStatsList = ({ setSelectedComponent, filter, filtered, setFiltered }) => {
  // requirements
  const { t } = useTranslation("admin");
  
  // api
  const { agentsStatistics, agentsStatisticsGet } = useApis();

  useEffect(() => {
    agentsStatisticsGet();
  }, []);

  useFilteredItems({
    filter,
    setFiltered,
    items: agentsStatistics?.items || [],
  });

  return (
    <>
      {agentsStatistics?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.firstname")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.number")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.answered")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("agents.conversation_time")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("agents.login_time")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("agents.pause_time")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("agents.from")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("agents.until")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filtered.length == 0 ? (
              <TemplateTableEmpty colSpan="9"/>
            ) : (
              filtered.map((agent, index) => (
                <AgentsStatsListContent agent={agent} setSelectedComponent={setSelectedComponent} key={index} />
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
}

export default AgentsStatsList
