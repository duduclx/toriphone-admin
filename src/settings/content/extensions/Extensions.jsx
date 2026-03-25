import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import ExtensionsList from "./content/ExtensionsList";

import { useApis } from "../../../ApiProvider";

const Extensions = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { extensions, extensionsPageGet, itemsPerPage } = useApis();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, itemsPerPage]);

  useEffect(() => {
    if (extensionsPageGet) {
      const offset = page * parseInt(itemsPerPage, 10);
      extensionsPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      title={t("extensions.list.title")}
      isList
      hasNoAdd
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={extensions}
    >
      <ExtensionsList setSelectedComponent={setSelectedComponent} extensions={extensions} page={page} setPage={setPage} search={search}/>
    </TemplatePage>
  );
};

export default Extensions;
