import { useEffect, useState } from "react";
import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import PhonebookscontactsListContent from "./PhonebookscontactsListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

import useFilteredItems from "../../../templates/filter/filteredItems";
import FilterForm from "../../../templates/filter/FilterForm";

const PhonebooksContactsList = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { phonebooks, phonebookContacts, phonebookContactsGet, phonebookSelected } = useApis();

  // filter
  /*
  const [filter, setFilter] = useState("");
  const [filtered, setFiltered] = useState([]);

  useFilteredItems({
    filter,
    setFiltered,
    items: phonebookContacts?.items || [],
  });
  */

  useEffect(() => {
    const fetch = async () => {
      if (Object.keys(phonebookSelected).length && phonebooks?.items?.length > 0) {
        await phonebookContactsGet(phonebookSelected);
      }
    };
    fetch();
  }, [phonebookSelected]);

  return (
    <>
    {/* <FilterForm filter={filter} setFilter={setFilter} /> */}
      
      {phonebookContacts.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.firstname")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.lastname")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.number")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.email")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.mobile_phone")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.fax")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {phonebookContacts.items.length == 0 ? (
              <TemplateTableEmpty colSpan="7"/>
            ) : (
              phonebookContacts.items.map((contact, index) => (
                <PhonebookscontactsListContent
                  contact={contact}
                  setSelectedComponent={setSelectedComponent}
                  key={index}
                />
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
};

export default PhonebooksContactsList;
