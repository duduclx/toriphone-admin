import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import ExternalAppsListContent from "./ExternalAppsListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const ExternalAppsList = ({ setSelectedComponent, externalApps, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {externalApps?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.label")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.purpose")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {externalApps.items.length == 0 ? (
              <TemplateTableEmpty colSpan="4"/>
            ) : (
              externalApps.items.map((external, index) => (
                <ExternalAppsListContent external={external} key={index} setSelectedComponent={setSelectedComponent} page={page} setPage={setPage} search={search} />
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
};

export default ExternalAppsList;
