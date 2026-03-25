import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import LinesList from "./content/LinesList";

import { useApis } from "../../../ApiProvider";

const Lines = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { lines, linesPageGet, itemsPerPage } = useApis();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, itemsPerPage]);

  useEffect(() => {
    if (linesPageGet) {
      const offset = page * parseInt(itemsPerPage, 10);
      linesPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("lines.list.title")}
      route={"lineCreate"}
      isList
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={lines}
    >
      <LinesList setSelectedComponent={setSelectedComponent} lines={lines} page={page} setPage={setPage} search={search}/>
    </TemplatePage>
  );
};

export default Lines;
