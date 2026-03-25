import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import PhoneNumbersList from "./content/PhoneNumbersList";

import { useApis } from "../../../ApiProvider";

const PhoneNumbers = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { phoneNumbers, phoneNumbersPageGet, itemsPerPage } = useApis();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, itemsPerPage]);

  useEffect(() => {
    if (phoneNumbersPageGet) {
      const offset = page * parseInt(itemsPerPage, 10);
      phoneNumbersPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("phoneNumbers.list.title")}
      route={"phoneNumberCreate"}
      isList
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={phoneNumbers}
    >
      <PhoneNumbersList setSelectedComponent={setSelectedComponent} phoneNumbers={phoneNumbers} page={page} setPage={setPage} search={search}/>
    </TemplatePage>
  );
}

export default PhoneNumbers
