import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import IngressesListContent from "./IngressesListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const IngressesList = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { ingresses } = useApis();

  return (
    <>
      {ingresses?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.uri")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {ingresses.items.length == 0 ? (
              <TemplateTableEmpty colSpan="2"/>
            ) : (
              ingresses.items.map((ingress, index) => (
                <IngressesListContent ingress={ingress} key={index} setSelectedComponent={setSelectedComponent} />
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
};

export default IngressesList;
