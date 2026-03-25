import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import CdrsList from "./content/CdrsList";

import { useApis } from "../../../ApiProvider";

const Cdrs = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { cdrs, cdrsPageGet, itemsPerPage } = useApis();

  // load
  const [loading, setLoading] = useState(false);

  // reload
  const reload = async () => {
    setLoading(true);
    if(page == 0) {
      await cdrsPageGet();
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
    if (cdrsPageGet) {
      const offset = page * parseInt(itemsPerPage, 10);
      cdrsPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      title={t("cdrs.list.title")}
      isList
      hasNoAdd
      reload={reload}
      loading={loading}
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={cdrs}
    >
      <CdrsList cdrs={cdrs} />
    </TemplatePage>
  );
};

export default Cdrs;
