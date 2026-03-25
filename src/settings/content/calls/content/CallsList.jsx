import { useEffect } from "react";
import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import CallsListContent from "./CallsListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

import useFilteredItems from "../../../templates/filter/filteredItems";

const CallsList = ({ setSelectedComponent, filter, filtered, setFiltered }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { calls, callsGet } = useApis();

  useEffect(() => {
    callsGet();
  }, []);

  useFilteredItems({
    filter,
    setFiltered,
    items: calls?.items || [],
  });

  return (
    <>
      {calls?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("calls.caller_id")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("calls.caller_num")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("calls.peer_id")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("calls.peer_num")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.direction")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filtered.length == 0 ? (
              <TemplateTableEmpty colSpan="6"/>
            ) : (
              filtered.map((call, index) => (
                <CallsListContent call={call} key={index} setSelectedComponent={setSelectedComponent} />
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
}

export default CallsList
