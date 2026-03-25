import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import SiptransportListContent from "./SiptransportListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const SiptransportsList = ({ setSelectedComponent, sipTransports, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {sipTransports?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {sipTransports.items.length == 0 ? (
              <TemplateTableEmpty colSpan="2"/>
            ) : (
              sipTransports.items.map((transport, index) => (
                <SiptransportListContent
                  transport={transport}
                  key={index}
                  setSelectedComponent={setSelectedComponent}
                  page={page}
                  setPage={setPage}
                  search={search}
                />
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
};

export default SiptransportsList;
