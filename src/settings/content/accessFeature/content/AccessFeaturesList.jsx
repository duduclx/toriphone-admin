import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import AccessFeaturesListContent from "./AccessFeaturesListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const AccessFeaturesList = ({ setSelectedComponent, accessFeatures, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {accessFeatures?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.host")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.feature")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.enabled")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {accessFeatures.items.length == 0 ? (
              <TemplateTableEmpty colSpan="4"/>
            ) : (
              accessFeatures.items.map((accessFeature, index) => (
                <AccessFeaturesListContent
                  key={index}
                  setSelectedComponent={setSelectedComponent}
                  accessFeature={accessFeature}
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

export default AccessFeaturesList;
