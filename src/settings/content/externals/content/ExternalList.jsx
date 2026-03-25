import { useEffect } from "react";
import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import ExternalListContent from "./ExternalListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const ExternalList = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { externals, externalsGet } = useApis();

  useEffect(() => {
    externalsGet();
  }, []);

  return (
    <>
      {externals?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.type")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {externals.items.length == 0 ? (
              <TemplateTableEmpty colSpan="2"/>
            ) : (
              externals.items.map((external, index) => (
                <ExternalListContent external={external} key={index} setSelectedComponent={setSelectedComponent} />
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
};

export default ExternalList;
