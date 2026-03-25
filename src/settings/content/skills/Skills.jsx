import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import SkillsList from "./content/SkillsList";

import { useApis } from "../../../ApiProvider";

const Skills = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { agentsSkills, agentsSkillsPageGet, itemsPerPage } = useApis();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, itemsPerPage]);

  useEffect(() => {
    if (agentsSkillsPageGet) {
      const offset = page * parseInt(itemsPerPage, 10);
      agentsSkillsPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("skills.list.title")}
      route={"skillCreate"}
      isList
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={agentsSkills}
    >
      <SkillsList setSelectedComponent={setSelectedComponent} agentsSkills={agentsSkills} page={page} setPage={setPage} search={search}/>
    </TemplatePage>
  );
};

export default Skills;
