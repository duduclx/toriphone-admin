import { useEffect } from "react";
import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import MeetingsListContent from "./MeetingsListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

import useFilteredItems from "../../../templates/filter/filteredItems";

const MeetingsList = ({ setSelectedComponent, filter, filtered, setFiltered }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { meetings, meetingsGet } = useApis();

  useEffect(() => {
    meetingsGet();
  }, []);

  useFilteredItems({
    filter,
    setFiltered,
    items: meetings?.items || [],
  });

  return (
    <>
      {meetings?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.number")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("meetings.persistent")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("meetings.require_authorization")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filtered.length == 0 ? (
              <TemplateTableEmpty colSpan="5"/>
            ) : (
              filtered.map((meeting, index) => (
                <MeetingsListContent meeting={meeting} key={index} setSelectedComponent={setSelectedComponent} />
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
};

export default MeetingsList;
