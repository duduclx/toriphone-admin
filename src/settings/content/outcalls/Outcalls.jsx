import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import OutcallsList from "./content/OutcallsList";

import { useApis } from "../../../ApiProvider";

const Outcalls = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { outcalls, outcallsPageGet, itemsPerPage } = useApis();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, itemsPerPage]);

  useEffect(() => {
    if (outcallsPageGet) {
      const offset = page * parseInt(itemsPerPage, 10);
      outcallsPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("outcalls.list.title")}
      route={"outcallCreate"}
      isList
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={outcalls}
    >
      <OutcallsList setSelectedComponent={setSelectedComponent} outcalls={outcalls} page={page} setPage={setPage} search={search}/>
    </TemplatePage>
  );
};

export default Outcalls;
