import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import AuthUsersList from "./content/AuthUsersList";

import { useApis } from "../../../ApiProvider";

const AuthUsers = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { authUsers, authUsersPageGet, itemsPerPage } = useApis();

  // search
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search, itemsPerPage]);

  useEffect(() => {
    if (authUsersPageGet) {
      const offset = page * parseInt(itemsPerPage, 10);
      authUsersPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
  }, [search, page, itemsPerPage]);

  // pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("authUsers.list.title")}
      route={"authUserCreate"}
      isList
      search={search}
      setSearch={setSearch}
      page={page}
      handlePageChange={handlePageChange}
      items={authUsers}
    >
      <AuthUsersList setSelectedComponent={setSelectedComponent} authUsers={authUsers} page={page} setPage={setPage} search={search}/>
    </TemplatePage>
  );
};

export default AuthUsers;
