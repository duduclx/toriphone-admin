import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import AccessFeaturesList from "./content/AccessFeaturesList";

import { useApis } from "../../../ApiProvider";

const AccessFeatures = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { accessFeatures, accessFeaturesPageGet, itemsPerPage } = useApis();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, itemsPerPage]);

  useEffect(() => {
    if (accessFeaturesPageGet) {
      const offset = page * parseInt(itemsPerPage, 10);
      accessFeaturesPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("accessFeatures.list.title")}
      route={"accessFeatureCreate"}
      isList
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={accessFeatures}
    >
      <AccessFeaturesList setSelectedComponent={setSelectedComponent} accessFeatures={accessFeatures} page={page} setPage={setPage} search={search}/>
    </TemplatePage>
  );
}

export default AccessFeatures
