import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import TrunksList from "./content/TrunksList";

import { useApis } from "../../../ApiProvider";

const Trunks = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { trunks, trunksPageGet, itemsPerPage } = useApis();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, itemsPerPage]);

  useEffect(() => {
    if (trunksPageGet) {
      const offset = page * parseInt(itemsPerPage, 10);
      trunksPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("trunks.list.title")}
      route={"trunkCreate"}
      isList
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={trunks}
    >
      <TrunksList setSelectedComponent={setSelectedComponent} trunks={trunks} page={page} setPage={setPage} search={search}/>
    </TemplatePage>
  );
};

export default Trunks;
