import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import DevicesList from "./content/DevicesList";

import { useApis } from "../../../ApiProvider";

const Devices = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { devices, devicesPageGet, itemsPerPage } = useApis();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, itemsPerPage]);

  useEffect(() => {
    if (devicesPageGet) {
      const offset = page * parseInt(itemsPerPage, 10);
      devicesPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("devices.list.title")}
      route={"deviceCreate"}
      isList
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={devices}
    >
      <DevicesList setSelectedComponent={setSelectedComponent} devices={devices} page={page} setPage={setPage} search={search}/>
    </TemplatePage>
  );
};

export default Devices;
