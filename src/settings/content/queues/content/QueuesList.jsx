import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import QueuesListContent from "./QueuesListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const QueuesList = ({ setSelectedComponent, queues, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {queues?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.number")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.agents")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.members")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.schedules")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {queues.items.length == 0 ? (
              <TemplateTableEmpty colSpan="6"/>
            ) : (
              queues.items.map((queue, index) => (
                <QueuesListContent queue={queue} setSelectedComponent={setSelectedComponent} key={index} page={page} setPage={setPage} search={search} />
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
};

export default QueuesList;
