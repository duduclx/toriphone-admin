import { useTranslation } from "react-i18next";
import { Table } from "@chakra-ui/react";

import ParkingsListContent from "./ParkingsListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const ParkingsList = ({ setSelectedComponent, parkingLots, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {parkingLots?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.number")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.start")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.end")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {parkingLots.items.length == 0 ? (
              <TemplateTableEmpty colSpan="5"/>
            ) : (
              parkingLots.items.map((parking, index) => (
                <ParkingsListContent parking={parking} key={index} setSelectedComponent={setSelectedComponent} page={page} setPage={setPage} search={search} />
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
};

export default ParkingsList;
