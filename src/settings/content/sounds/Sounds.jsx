import { useState } from "react";
import { useTranslation } from "react-i18next";
import TemplatePage from "../../templates/TemplatePage";
import SoundsList from "./content/SoundsList";

const Sounds = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // filter
  const [filter, setFilter] = useState("");
  const [filtered, setFiltered] = useState([]);

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("sounds.list.title")}
      route={"soundCreate"}
      isList
      filter={filter}
      setFilter={setFilter}
    >
      <SoundsList setSelectedComponent={setSelectedComponent} filter={filter} filtered={filtered} setFiltered={setFiltered} />
    </TemplatePage>
  );
};

export default Sounds;
