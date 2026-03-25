import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";
import BlocklistListContent from "./BlocklistListContent";

const BlocklistList = ({ blocklistNumbers }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {blocklistNumbers?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.label")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.number")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.user")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {blocklistNumbers.items.length == 0 ? (
              <TemplateTableEmpty colSpan="4"/>
            ) : (
              blocklistNumbers.items.map((item, index) => <BlocklistListContent item={item} key={index} />)
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
};

export default BlocklistList;
