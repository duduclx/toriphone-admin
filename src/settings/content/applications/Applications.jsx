import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import ApplicationsList from "./content/ApplicationsList";

import { useApis } from "../../../ApiProvider";

const Applications = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { applications, applicationsPageGet, itemsPerPage } = useApis();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, itemsPerPage]);

  useEffect(() => {
    if (applicationsPageGet) {
      const offset = page * parseInt(itemsPerPage, 10);
      applicationsPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("applications.list.title")}
      route={"applicationCreate"}
      isList
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={applications}
    >
      <ApplicationsList
        setSelectedComponent={setSelectedComponent}
        applications={applications}
        page={page}
        setPage={setPage}
        search={search}
      />
    </TemplatePage>
  );
};

export default Applications;
