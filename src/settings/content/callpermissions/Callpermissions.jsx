import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import CallpermissionsList from "./content/CallpermissionsList";

import { useApis } from "../../../ApiProvider";

const Callpermissions = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { callPermissions, callPermissionsPageGet, itemsPerPage } = useApis();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, itemsPerPage]);

  useEffect(() => {
    if (callPermissionsPageGet) {
      const offset = page * parseInt(itemsPerPage, 10);
      callPermissionsPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("callpermissions.list.title")}
      route={"callpermissionCreate"}
      isList
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={callPermissions}
    >
      <CallpermissionsList setSelectedComponent={setSelectedComponent} callPermissions={callPermissions} page={page} setPage={setPage} search={search}/>
    </TemplatePage>
  );
};

export default Callpermissions;
