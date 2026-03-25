import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import QueuesList from "./content/QueuesList";

import { useApis } from "../../../ApiProvider";

const Queues = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { queues, queuesPageGet, itemsPerPage } = useApis();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, itemsPerPage]);

  useEffect(() => {
    if (queuesPageGet) {
      const offset = page * parseInt(itemsPerPage, 10);
      queuesPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("queues.list.title")}
      route={"queueCreate"}
      isList
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={queues}
    >
      <QueuesList setSelectedComponent={setSelectedComponent} queues={queues} page={page} setPage={setPage} search={search} />
    </TemplatePage>
  );
};

export default Queues;
