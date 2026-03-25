import { useEffect } from "react";
import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import MohsListContent from "./MohsListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

import useFilteredItems from "../../../templates/filter/filteredItems";

const MohsList = ({ setSelectedComponent, filter, filtered, setFiltered }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { mohs, mohsGet } = useApis();

  useEffect(() => {
    mohsGet();
  }, []);

  useFilteredItems({
    filter,
    setFiltered,
    items: mohs?.items || [],
  });

  return (
    <>
      {mohs?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.mode")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.application")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.sort")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.files_count")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filtered.length == 0 ? (
              <TemplateTableEmpty colSpan="6"/>
            ) : (
              filtered.map((moh, index) => (
                <MohsListContent moh={moh} key={index} setSelectedComponent={setSelectedComponent} />
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
};

export default MohsList;
