import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import CallfiltersList from "./content/CallfiltersList";

import { useApis } from "../../../ApiProvider";

const Callfilters = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { callfilters, callfiltersPageGet, itemsPerPage } = useApis();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, itemsPerPage]);

  useEffect(() => {
    if (callfiltersPageGet) {
      const offset = page * parseInt(itemsPerPage, 10);
      callfiltersPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("callfilters.list.title")}
      route={"callfilterCreate"}
      isList
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={callfilters}
    >
      <CallfiltersList setSelectedComponent={setSelectedComponent} callfilters={callfilters} page={page} setPage={setPage} search={search}/>
    </TemplatePage>
  );
};

export default Callfilters;
