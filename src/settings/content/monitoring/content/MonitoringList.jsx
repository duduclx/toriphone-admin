import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";
import MonitoringListContent from "./MonitoringListContent";

const MonitoringList = ({ items }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {items?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
              <Table.ColumnHeader>ari</Table.ColumnHeader>
              <Table.ColumnHeader>bus consumer</Table.ColumnHeader>
              <Table.ColumnHeader>service token</Table.ColumnHeader>
              <Table.ColumnHeader>task queue</Table.ColumnHeader>
              <Table.ColumnHeader>rest api</Table.ColumnHeader>
              <Table.ColumnHeader>master tenant</Table.ColumnHeader>
              <Table.ColumnHeader>presence initialization</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items.items.length == 0 ? (
              <TemplateTableEmpty colSpan="8"/>
            ) : (
              items.items.map((item, index) => <MonitoringListContent item={item} key={index} />)
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
};

export default MonitoringList;
