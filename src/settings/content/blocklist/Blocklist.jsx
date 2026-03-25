import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import BlocklistList from "./content/BlocklistList";

import { useApis } from "../../../ApiProvider";

const Blocklist = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { blocklistNumbers, blocklistnumbersPageGet, itemsPerPage } = useApis();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, itemsPerPage]);

  useEffect(() => {
    if (blocklistnumbersPageGet) {
      const offset = page * parseInt(itemsPerPage, 10);
      blocklistnumbersPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("blocklist.title")}
      hasNoAdd
      isList
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={blocklistNumbers}
    >
      <BlocklistList
        blocklistNumbers={blocklistNumbers}
      />
    </TemplatePage>
  );
};

export default Blocklist;
