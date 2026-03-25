import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import CallpickupListContent from "./CallpickupListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const CallpickupList = ({ setSelectedComponent, callpickups, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {callpickups?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.description")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("callpickups.interceptors")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.target")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {callpickups.items.length == 0 ? (
              <TemplateTableEmpty colSpan="5"/>
            ) : (
              callpickups.items.map((callpickup, index) => (
                <CallpickupListContent
                  callpickup={callpickup}
                  key={index}
                  setSelectedComponent={setSelectedComponent}
                  page={page} setPage={setPage} search={search}
                />
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
};

export default CallpickupList;
