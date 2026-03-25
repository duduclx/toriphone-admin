import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import UsersList from "./content/UsersList";

import { useApis } from "../../../ApiProvider";

const Users = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { users, usersPageGet, itemsPerPage, agentsGet } = useApis();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, itemsPerPage]);

  useEffect(() => {
    if (usersPageGet) {
      agentsGet();
      const offset = page * parseInt(itemsPerPage, 10);
      usersPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("users.list.title")}
      route={"userCreate"}
      isList
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={users}
    >
      <UsersList setSelectedComponent={setSelectedComponent} users={users} page={page} setPage={setPage} search={search}/>
    </TemplatePage>
  );
};

export default Users;
