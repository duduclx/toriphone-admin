import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import VoicemailsListcontent from "./VoicemailsListcontent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const VoicemailsList = ({ setSelectedComponent, voicemails, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {voicemails?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.number")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.email")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.user")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {voicemails.items.length == 0 ? (
              <TemplateTableEmpty colSpan="5"/>
            ) : (
              voicemails.items.map((voicemail, index) => (
                <VoicemailsListcontent voicemail={voicemail} key={index} setSelectedComponent={setSelectedComponent} page={page} setPage={setPage} search={search}/>
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
};

export default VoicemailsList;
