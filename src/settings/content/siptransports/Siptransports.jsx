import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import SiptransportsList from "./content/SiptransportsList";

import { useApis } from "../../../ApiProvider";

const Siptransports = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { sipTransports, sipTransportsPageGet, itemsPerPage } = useApis();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, itemsPerPage]);

  useEffect(() => {
    if (sipTransportsPageGet) {
      const offset = page * parseInt(itemsPerPage, 10);
      sipTransportsPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("sipTransports.list.title")}
      route={"siptransportCreate"}
      isList
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={sipTransports}
    >
      <SiptransportsList setSelectedComponent={setSelectedComponent} sipTransports={sipTransports} page={page} setPage={setPage} search={search}/>
    </TemplatePage>
  );
};

export default Siptransports;
