import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import ConferencesListContent from "./ConferencesListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const ConferencesList = ({ setSelectedComponent, conferences, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {conferences?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.extension")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.pin")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.pin_admin")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {conferences.items.length == 0 ? (
              <TemplateTableEmpty colSpan="5"/>
            ) : (
              conferences.items.map((conference, index) => (
                <ConferencesListContent
                  conference={conference}
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

export default ConferencesList;
