import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import PoliciesListContent from "./PoliciesListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const PoliciesList = ({ setSelectedComponent, policies, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {policies?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.description")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.read_only")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.shared")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {policies.items.length == 0 ? (
              <TemplateTableEmpty colSpan="5"/>
            ) : (
              policies.items.map((policy, index) => (
                <PoliciesListContent policy={policy} key={index} setSelectedComponent={setSelectedComponent} page={page} setPage={setPage} search={search} />
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
};

export default PoliciesList;
