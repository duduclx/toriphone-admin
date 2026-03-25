import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import PagingList from "./content/PagingList";

import { useApis } from "../../../ApiProvider";

const Pagings = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { pagings, pagingPageGet, itemsPerPage } = useApis();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, itemsPerPage]);

  useEffect(() => {
    if (pagingPageGet) {
      const offset = page * parseInt(itemsPerPage, 10);
      pagingPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("pagings.list.title")}
      route={"pagingCreate"}
      isList
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={pagings}
    >
      <PagingList setSelectedComponent={setSelectedComponent} pagings={pagings} page={page} setPage={setPage} search={search}/>
    </TemplatePage>
  );
};

export default Pagings;
