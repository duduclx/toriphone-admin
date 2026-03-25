import { useState } from "react";
import { useTranslation } from "react-i18next";
import TemplatePage from "../../templates/TemplatePage";
import MohsList from "./content/MohsList";

const Mohs = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // filter
  const [filter, setFilter] = useState("");
  const [filtered, setFiltered] = useState([]);

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("mohs.list.title")}
      route={"mohCreate"}
      isList
      filter={filter}
      setFilter={setFilter}
    >
      <MohsList setSelectedComponent={setSelectedComponent} filter={filter} filtered={filtered} setFiltered={setFiltered}/>
    </TemplatePage>
  );
};

export default Mohs;
