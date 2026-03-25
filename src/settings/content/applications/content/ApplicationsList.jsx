import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import ApplicationsListContent from "./ApplicationsListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const ApplicationsList = ({ setSelectedComponent, applications, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {applications?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.destination")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.type")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.moh")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.answer")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {applications.items.length == 0 ? (
              <TemplateTableEmpty colSpan="6"/>
            ) : (
              applications.items.map((application, index) => (
                <ApplicationsListContent
                  key={index}
                  application={application}
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

export default ApplicationsList;
