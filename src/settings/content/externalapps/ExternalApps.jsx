import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import ExternalAppsList from "./content/ExternalAppsList";

import { useApis } from "../../../ApiProvider";

const ExternalApps = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { externalApps, externalAppsPageGet, itemsPerPage } = useApis();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, itemsPerPage]);

  useEffect(() => {
    if (externalAppsPageGet) {
      const offset = page * parseInt(itemsPerPage, 10);
      externalAppsPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("external_apps.list.title")}
      route={"externalAppsCreate"}
      isList
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={externalApps}
    >
      <ExternalAppsList setSelectedComponent={setSelectedComponent} externalApps={externalApps} page={page} setPage={setPage} search={search}/>
    </TemplatePage>
  );
};

export default ExternalApps;
