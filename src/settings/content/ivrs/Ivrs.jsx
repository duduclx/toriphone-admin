import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import IvrsList from "./content/IvrsList";

import { useApis } from "../../../ApiProvider";

const Ivrs = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { ivrs, ivrsPageGet, itemsPerPage } = useApis();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, itemsPerPage]);

  useEffect(() => {
    if (ivrsPageGet) {
      const offset = page * parseInt(itemsPerPage, 10);
      ivrsPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("ivrs.list.title")}
      route={"ivrCreate"}
      isList
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={ivrs}
    >
      <IvrsList setSelectedComponent={setSelectedComponent} ivrs={ivrs} page={page} setPage={setPage} search={search} />
    </TemplatePage>
  );
};

export default Ivrs;
