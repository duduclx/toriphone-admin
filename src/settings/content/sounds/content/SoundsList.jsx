import { useEffect } from "react";
import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import SoundsListContent from "./SoundsListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

import useFilteredItems from "../../../templates/filter/filteredItems";

const SoundsList = ({ setSelectedComponent, filter, filtered, setFiltered }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { sounds, soundsGet } = useApis();

  useEffect(() => {
    soundsGet();
  }, []);

  const filteredSounds = sounds?.items ? sounds.items.filter((sound) => sound.name !== "system") : [];

  useFilteredItems({
    filter,
    setFiltered,
    items: filteredSounds || [],
  });

  return (
    <>
      {filteredSounds && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.files")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filtered.length == 0 ? (
              <TemplateTableEmpty colSpan="3"/>
            ) : (
              filtered.map((sound, index) => (
                <SoundsListContent sound={sound} setSelectedComponent={setSelectedComponent} key={index} />
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
};

export default SoundsList;
