import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import GroupsList from "./content/GroupsList";

import { useApis } from "../../../ApiProvider";

const Groups = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { groups, groupsPageGet, itemsPerPage } = useApis();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, itemsPerPage]);

  useEffect(() => {
    if (groupsPageGet) {
      const offset = page * parseInt(itemsPerPage, 10);
      groupsPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("groups.list.title")}
      route={"groupCreate"}
      isList
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={groups}
    >
      <GroupsList setSelectedComponent={setSelectedComponent} groups={groups} page={page} setPage={setPage} search={search}/>
    </TemplatePage>
  );
};

export default Groups;
