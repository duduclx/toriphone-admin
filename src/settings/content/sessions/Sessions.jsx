import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import SessionsList from "./content/SessionsList";

import { useApis } from "../../../ApiProvider";

const Sessions = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { sessions, sessionsPageGet, itemsPerPage } = useApis();

  // load
  const [loading, setLoading] = useState(false);

  // reload
  const reload = async () => {
    setLoading(true);
    if(page == 0) {
      await sessionsPageGet();
    } else {
      setPage(0);
    }
    setLoading(false);
  }

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, itemsPerPage]);

  useEffect(() => {
    if (sessionsPageGet) {
      const offset = page * parseInt(itemsPerPage, 10);
      sessionsPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      title={t("sessions.list.title")}
      isList
      hasNoAdd
      reload={reload}
      loading={loading}
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={sessions}
    >
      <SessionsList
        setSelectedComponent={setSelectedComponent}
        sessions={sessions}
        page={page}
        setPage={setPage}
        search={search}
      />
    </TemplatePage>
  );
};

export default Sessions;
