import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import SkillsRulesList from "./content/SkillsRulesList";

import { useApis } from "../../../ApiProvider";

const SkillsRules = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { queuesSkills, queuesSkillrulesPageGet, itemsPerPage } = useApis();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, itemsPerPage]);

  useEffect(() => {
    if (queuesSkillrulesPageGet) {
      const offset = page * parseInt(itemsPerPage, 10);
      queuesSkillrulesPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("skillsrules.list.title")}
      route={"skillsRuleCreate"}
      isList
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={queuesSkills}
    >
      <SkillsRulesList setSelectedComponent={setSelectedComponent} queuesSkills={queuesSkills} page={page} setPage={setPage} search={search} />
    </TemplatePage>
  );
};

export default SkillsRules;
