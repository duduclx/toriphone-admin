import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import SipTemplatesList from "./content/SipTemplatesList";

import { useApis } from "../../../ApiProvider";

const SipTemplates = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { endpointsSipTemplates, endpointsSipTemplatesPageGet, itemsPerPage } = useApis();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, itemsPerPage]);

  useEffect(() => {
    if (endpointsSipTemplatesPageGet) {
      const offset = page * parseInt(itemsPerPage, 10);
      endpointsSipTemplatesPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("sipTemplates.list.title")}
      route={"sipTemplateCreate"}
      isList
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={endpointsSipTemplates}
    >
      <SipTemplatesList
        setSelectedComponent={setSelectedComponent}
        endpointsSipTemplates={endpointsSipTemplates}
        page={page}
        setPage={setPage}
        search={search}
      />
    </TemplatePage>
  );
};

export default SipTemplates;
