import { useState } from "react";
import { useTranslation } from "react-i18next";
import TemplatePage from "../../templates/TemplatePage";
import MeetingsList from "./content/MeetingsList";

const Meetings = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // filter
  const [filter, setFilter] = useState("");
  const [filtered, setFiltered] = useState([]);

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("meetings.list.title")}
      route={"meetingCreate"}
      isList
      filter={filter}
      setFilter={setFilter}
    >
      <MeetingsList setSelectedComponent={setSelectedComponent} filter={filter} filtered={filtered} setFiltered={setFiltered}/>
    </TemplatePage>
  );
};

export default Meetings;
