import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import SkillsRulesListContent from "./SkillsRulesListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const SkillsRulesList = ({ setSelectedComponent, queuesSkills, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {queuesSkills?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.rules")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {queuesSkills.items.length == 0 ? (
              <TemplateTableEmpty colSpan="3"/>
            ) : (
              queuesSkills.items.map((skillsrule, index) => (
                <SkillsRulesListContent
                  skillsrule={skillsrule}
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

export default SkillsRulesList;
