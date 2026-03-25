import { useState } from "react";
import { useTranslation } from "react-i18next";
import TemplatePage from "../../templates/TemplatePage";
import AgentsStatsList from "./content/AgentsStatsList";

const AgentsStats = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // filter
  const [filter, setFilter] = useState("");
  const [filtered, setFiltered] = useState([]);

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("agents.list.title")}
      isList
      hasNoAdd
      filter={filter}
      setFilter={setFilter}
    >
      <AgentsStatsList setSelectedComponent={setSelectedComponent} filter={filter} filtered={filtered} setFiltered={setFiltered}/>
    </TemplatePage>
  );
};

export default AgentsStats;
