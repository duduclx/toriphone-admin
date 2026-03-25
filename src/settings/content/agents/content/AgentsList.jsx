import { Table} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import AgentsListContent from "./AgentsListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const AgentsList = ({ setSelectedComponent, agents, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {agents?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.firstname")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.lastname")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.number")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.description")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.queues")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.users")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.skills")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {agents.items.length == 0 ? (
              <TemplateTableEmpty colSpan="8"/>
            ) : (
              agents.items.map((agent, index) => (
                <AgentsListContent agent={agent} setSelectedComponent={setSelectedComponent} key={index} page={page} setPage={setPage} search={search} />
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
};

export default AgentsList;
