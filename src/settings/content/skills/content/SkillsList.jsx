import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import SkillsListContent from "./SkillsListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const SkillsList = ({ setSelectedComponent, agentsSkills, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {agentsSkills?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.description")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.agents")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {agentsSkills.items.length == 0 ? (
              <TemplateTableEmpty colSpan="4"/>
            ) : (
              agentsSkills.items.map((skill, index) => (
                <SkillsListContent
                  skill={skill}
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

export default SkillsList;
