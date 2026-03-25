import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import SchedulesList from "./content/SchedulesList";

import { useApis } from "../../../ApiProvider";

const Schedules = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { schedules, schedulePageGet, itemsPerPage } = useApis();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, itemsPerPage]);

  useEffect(() => {
    if (schedulePageGet) {
      const offset = page * parseInt(itemsPerPage, 10);
      schedulePageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("schedules.list.title")}
      route={"scheduleCreate"}
      isList
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={schedules}
    >
      <SchedulesList setSelectedComponent={setSelectedComponent} schedules={schedules} page={page} setPage={setPage} search={search}/>
    </TemplatePage>
  );
};

export default Schedules;
