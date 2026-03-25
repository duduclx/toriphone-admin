import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import PagingListContent from "./PagingListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const PagingList = ({ setSelectedComponent, pagings, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {pagings?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.number")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.members")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.callers")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {pagings.items.length == 0 ? (
              <TemplateTableEmpty colSpan="5"/>
            ) : (
              pagings.items.map((paging, index) => (
                <PagingListContent paging={paging} key={index} setSelectedComponent={setSelectedComponent} page={page} setPage={setPage} search={search}/>
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
};

export default PagingList;
