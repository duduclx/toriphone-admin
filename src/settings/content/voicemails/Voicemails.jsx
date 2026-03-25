import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import VoicemailsList from "./content/VoicemailsList";

import { useApis } from "../../../ApiProvider";

const Voicemails = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { voicemails, voicemailsPageGet, itemsPerPage } = useApis();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, itemsPerPage]);

  useEffect(() => {
    if (voicemailsPageGet) {
      const offset = page * parseInt(itemsPerPage, 10);
      voicemailsPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("voicemails.list.title")}
      route={"voicemailCreate"}
      isList
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={voicemails}
    >
      <VoicemailsList setSelectedComponent={setSelectedComponent} voicemails={voicemails} page={page} setPage={setPage} search={search} />
    </TemplatePage>
  );
};

export default Voicemails;
