import { useState } from "react";
import { useTranslation } from "react-i18next";
import TemplatePage from "../../templates/TemplatePage";
import ContextsList from "./content/ContextsList";

const Contexts = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // filter
  const [filter, setFilter] = useState("");
  const [filtered, setFiltered] = useState([]);

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("contexts.list.title")}
      route={"contextCreate"}
      isList
      filter={filter}
      setFilter={setFilter}
    >
      <ContextsList setSelectedComponent={setSelectedComponent} filter={filter} filtered={filtered} setFiltered={setFiltered}/>
    </TemplatePage>
  );
};

export default Contexts;
