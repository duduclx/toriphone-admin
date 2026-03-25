import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import SchedulesListContent from "./SchedulesListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const SchedulesList = ({ setSelectedComponent, schedules, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {schedules?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.timezone")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.destination")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.groups")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.queues")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.users")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.incalls")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.outcalls")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {schedules.items.length == 0 ? (
              <TemplateTableEmpty colSpan="9"/>
            ) : (
              schedules.items.map((schedule, index) => (
                <SchedulesListContent schedule={schedule} setSelectedComponent={setSelectedComponent} key={index} page={page} setPage={setPage} search={search}/>
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
};

export default SchedulesList;
