import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import PoliciesGroupList from "./content/PoliciesGroupList";

import { useApis } from "../../../ApiProvider";

const PoliciesGroups = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { authGroups, authGroupsPageGet, itemsPerPage } = useApis();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, itemsPerPage]);

  useEffect(() => {
    if (authGroupsPageGet) {
      const offset = page * parseInt(itemsPerPage, 10);
      authGroupsPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("policyGroups.list.title")}
      route={"policyGroupCreate"}
      isList
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={authGroups}
    >
      <PoliciesGroupList setSelectedComponent={setSelectedComponent} authGroups={authGroups} page={page} setPage={setPage} search={search}/>
    </TemplatePage>
  );
};

export default PoliciesGroups;
