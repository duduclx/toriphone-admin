import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import ConferencesList from "./content/ConferencesList";

import { useApis } from "../../../ApiProvider";

const Conferences = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { conferences, conferencesPageGet, itemsPerPage } = useApis();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, itemsPerPage]);

  useEffect(() => {
    if (conferencesPageGet) {
      const offset = page * parseInt(itemsPerPage, 10);
      conferencesPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("conferences.list.title")}
      route={"conferenceCreate"}
      isList
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={conferences}
    >
      <ConferencesList setSelectedComponent={setSelectedComponent} conferences={conferences} page={page} setPage={setPage} search={search}/>
    </TemplatePage>
  );
};

export default Conferences;
