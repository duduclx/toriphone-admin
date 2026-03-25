import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import SipTemplatesListContent from "./SipTemplatesListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const SipTemplatesList = ({ setSelectedComponent, endpointsSipTemplates, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {endpointsSipTemplates?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {endpointsSipTemplates.items.length == 0 ? (
              <TemplateTableEmpty colSpan="2"/>
            ) : (
              endpointsSipTemplates.items.map((template, index) => (
                <SipTemplatesListContent
                  template={template}
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

export default SipTemplatesList;
