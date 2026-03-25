import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import SwitchboardsList from "./content/SwitchboardsList";

import { useApis } from "../../../ApiProvider";

const Switchboards = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { switchboards, switchboardsPageGet, itemsPerPage } = useApis();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, itemsPerPage]);

  useEffect(() => {
    if (switchboardsPageGet) {
      const offset = page * parseInt(itemsPerPage, 10);
      switchboardsPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("switchboards.list.title")}
      route={"switchboardCreate"}
      isList
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={switchboards}
    >
      <SwitchboardsList setSelectedComponent={setSelectedComponent} switchboards={switchboards} page={page} setPage={setPage} search={search}/>
    </TemplatePage>
  );
};

export default Switchboards;
