import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import TenantsListContent from "./TenantsListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const TenantsList = ({ setSelectedComponent, authTenants, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {authTenants?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("tenants.slug")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("tenants.contact")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("tenants.email")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("tenants.domains")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {authTenants.items.length == 0 ? (
              <TemplateTableEmpty colSpan="6"/>
            ) : (
              authTenants.items.map((tenant, index) => (
                <TenantsListContent tenant={tenant} key={index} setSelectedComponent={setSelectedComponent} page={page} setPage={setPage} search={search}/>
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
};

export default TenantsList;
