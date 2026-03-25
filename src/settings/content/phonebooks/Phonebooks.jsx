import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import PhonebooksList from "./content/PhonebooksList";

import { useApis } from "../../../ApiProvider";

const Phonebooks = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { phonebooks, phonebooksPageGet, itemsPerPage } = useApis();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, itemsPerPage]);

  useEffect(() => {
    if (phonebooksPageGet) {
      const offset = page * parseInt(itemsPerPage, 10);
      phonebooksPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("phonebooks.list.title")}
      route={"phonebookCreate"}
      isList
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={phonebooks}
    >
      <PhonebooksList setSelectedComponent={setSelectedComponent} phonebooks={phonebooks} page={page} setPage={setPage} search={search} />
    </TemplatePage>
  );
};

export default Phonebooks;
