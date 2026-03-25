import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import ParkingsList from "./content/ParkingsList";

import { useApis } from "../../../ApiProvider";

const Parkings = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { parkingLots, parkingLotsPageGet, itemsPerPage } = useApis();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, itemsPerPage]);

  useEffect(() => {
    if (parkingLotsPageGet) {
      const offset = page * parseInt(itemsPerPage, 10);
      parkingLotsPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("parkingLots.list.title")}
      route={"parkingCreate"}
      isList
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={parkingLots}
    >
      <ParkingsList setSelectedComponent={setSelectedComponent} parkingLots={parkingLots} page={page} setPage={setPage} search={search}/>
    </TemplatePage>
  );
};

export default Parkings;
