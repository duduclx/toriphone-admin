import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import CallpickupList from "./content/CallpickupList";

import { useApis } from "../../../ApiProvider";

const Callpickups = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { callpickups, callpickupPageGet, itemsPerPage } = useApis();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, itemsPerPage]);

  useEffect(() => {
    if (callpickupPageGet) {
      const offset = page * parseInt(itemsPerPage, 10);
      callpickupPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("callpickups.list.title")}
      route={"callpickupCreate"}
      isList
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={callpickups}
    >
      <CallpickupList setSelectedComponent={setSelectedComponent} callpickups={callpickups} page={page} setPage={setPage} search={search}/>
    </TemplatePage>
  );
};

export default Callpickups;
