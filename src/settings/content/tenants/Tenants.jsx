import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import TenantsList from "./content/TenantsList";

import { useApis } from "../../../ApiProvider";

const Tenants = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { authTenants, authTenantsPageGet, itemsPerPage } = useApis();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, itemsPerPage]);

  useEffect(() => {
    if (authTenantsPageGet) {
      const offset = page * parseInt(itemsPerPage, 10);
      authTenantsPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("tenants.list.title")}
      route={"tenantCreate"}
      isList
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={authTenants}
    >
      <TenantsList setSelectedComponent={setSelectedComponent} authTenants={authTenants} page={page} setPage={setPage} search={search}/>
    </TemplatePage>
  );
};

export default Tenants;
