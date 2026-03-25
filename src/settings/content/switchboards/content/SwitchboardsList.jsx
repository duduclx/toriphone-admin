import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import SwitchboardsListContent from "./SwitchboardsListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const SwitchboardsList = ({ setSelectedComponent, switchboards, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {switchboards?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.numbers")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.members")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.moh")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("switchboards.moh_on_hold")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.forwards")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {switchboards.items.length == 0 ? (
              <TemplateTableEmpty colSpan="7"/>
            ) : (
              switchboards.items.map((switchboard, index) => (
                <SwitchboardsListContent
                  switchboard={switchboard}
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

export default SwitchboardsList;
