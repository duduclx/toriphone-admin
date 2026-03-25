import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import TrunksListContent from "./TrunksListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const TrunksList = ({ setSelectedComponent, trunks, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {trunks?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.protocol")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.outcalls")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {trunks.items.length == 0 ? (
              <TemplateTableEmpty colSpan="5"/>
            ) : (
              trunks.items.map((trunk, index) => (
                <TrunksListContent trunk={trunk} setSelectedComponent={setSelectedComponent} key={index} page={page} setPage={setPage} search={search}/>
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
};

export default TrunksList;
