import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import SourcesList from "./content/SourcesList";

import { useApis } from "../../../ApiProvider";

const Sources = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { sources, sourcesPageGet, itemsPerPage } = useApis();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, itemsPerPage]);

  useEffect(() => {
    if (sourcesPageGet) {
      const offset = page * parseInt(itemsPerPage, 10);
      sourcesPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("sources.list.title")}
      route={"sourceCreate"}
      isList
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={sources}
    >
      <SourcesList setSelectedComponent={setSelectedComponent} sources={sources} page={page} setPage={setPage} search={search}/>
    </TemplatePage>
  );
};

export default Sources;
