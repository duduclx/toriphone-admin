import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import PoliciesList from "./content/PoliciesList";

import { useApis } from "../../../ApiProvider";

const Policies = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

 // api
 const { policies, policiesPageGet, itemsPerPage } = useApis();

 // search
 const [search, setSearch] = useState("");
 const [page, setPage] = useState(0);

 useEffect(() => {
   setPage(0);
 }, [search, itemsPerPage]);

 useEffect(() => {
   if (policiesPageGet) {
     const offset = page * parseInt(itemsPerPage, 10);
     policiesPageGet(search, offset, parseInt(itemsPerPage, 10));
   }
 }, [search, page, itemsPerPage]);

 // pagination
 const handlePageChange = ({ selected }) => {
   setPage(selected);
 };

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("policies.list.title")}
      route={"policyCreate"}
      isList
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={policies}
    >
      <PoliciesList setSelectedComponent={setSelectedComponent} policies={policies} page={page} setPage={setPage} search={search}/>
    </TemplatePage>
  );
};

export default Policies;
