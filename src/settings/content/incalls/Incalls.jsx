import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import IncallsList from "./content/IncallsList";

import { useApis } from "../../../ApiProvider";

const Incalls = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { incalls, incallsPageGet, itemsPerPage } = useApis();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, itemsPerPage]);

  useEffect(() => {
    if (incallsPageGet) {
      const offset = page * parseInt(itemsPerPage, 10);
      incallsPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("incalls.list.title")}
      route={"incallCreate"}
      isList
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={incalls}
    >
      <IncallsList setSelectedComponent={setSelectedComponent} incalls={incalls} page={page} setPage={setPage} search={search}/>
    </TemplatePage>
  );
};

export default Incalls;
