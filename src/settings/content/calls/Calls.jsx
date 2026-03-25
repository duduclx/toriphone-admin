import { useState } from "react";
import { useTranslation } from "react-i18next";
import TemplatePage from "../../templates/TemplatePage";
import CallsList from "./content/CallsList";

import { useApis } from "../../../ApiProvider";

const Calls = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  const { callsGet } = useApis();

  const reload = async () => {
    await callsGet();
  };

  // filter
  const [filter, setFilter] = useState("");
  const [filtered, setFiltered] = useState([]);

  return (
    <TemplatePage title={t("calls.list.title")} isList reload={reload} filter={filter} setFilter={setFilter}>
      <CallsList
        setSelectedComponent={setSelectedComponent}
        filter={filter}
        filtered={filtered}
        setFiltered={setFiltered}
      />
    </TemplatePage>
  );
};

export default Calls;
