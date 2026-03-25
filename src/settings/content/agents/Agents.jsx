import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import AgentsList from "./content/AgentsList";

import { useApis } from "../../../ApiProvider";

const Agents = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { agents, agentsPageGet, itemsPerPage } = useApis();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, itemsPerPage]);

  useEffect(() => {
    if (agentsPageGet) {
      const offset = page * parseInt(itemsPerPage, 10);
      agentsPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("agents.list.title")}
      route={"agentCreate"}
      isList
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={agents}
    >
      <AgentsList setSelectedComponent={setSelectedComponent} agents={agents} page={page} setPage={setPage} search={search}/>
    </TemplatePage>
  );
};

export default Agents;
