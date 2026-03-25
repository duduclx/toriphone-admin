import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import CallfiltersListContent from "./CallfiltersListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const CallfiltersList = ({ setSelectedComponent, callfilters, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {callfilters?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.ring_sTable.Rowategy")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.description")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.boss")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.secretaries")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.forward")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {callfilters.items.length == 0 ? (
              <TemplateTableEmpty colSpan="7"/>
            ) : (
              callfilters.items.map((callfilter, index) => (
                <CallfiltersListContent
                  key={index}
                  callfilter={callfilter}
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

export default CallfiltersList;
