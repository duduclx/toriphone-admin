import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import FunckeysList from "./content/FunckeysList";

import { useApis } from "../../../ApiProvider";

const Funckeys = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { funckeysTemplates, funckeysTemplatesPageGet, itemsPerPage } = useApis();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, itemsPerPage]);

  useEffect(() => {
    if (funckeysTemplatesPageGet) {
      const offset = page * parseInt(itemsPerPage, 10);
      funckeysTemplatesPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("funckeys.list.title")}
      route={"funckeyCreate"}
      isList
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={funckeysTemplates}
    >
      <FunckeysList
        setSelectedComponent={setSelectedComponent}
        funckeysTemplates={funckeysTemplates}
        page={page}
        setPage={setPage}
        search={search}
      />
    </TemplatePage>
  );
};

export default Funckeys;
