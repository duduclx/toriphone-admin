import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";
import { IconButtonCheckUi } from "../../../ui";

const AuthUsersListContent = ({ identity, setSelectedComponent, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { authUsers, authUsersPageGet, setAuthUserSelected, itemsPerPage, authUserDelete } = useApis();

  const handleDelete = async () => {
    setLoading(true);
    await authUserDelete(identity);
    /*
    const updatedItems = authUsers.items.filter((item) => item.uuid !== identity.uuid);
    setAuthUsers((prev) => ({
      ...prev,
      items: updatedItems,
      total: updatedItems.length,
    }));
    */
    const newTotal = authUsers.total - 1;
    const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);

    // Vérifier si la page actuelle est toujours valide
    if (page > maxPage) {
      setPage(maxPage); // Mettre à jour la page
    } else {
      const offset = page * parseInt(itemsPerPage, 10);
      await authUsersPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
    setLoading(false);
    onClose();
  };

  const onEdit = () => {
    setAuthUserSelected(identity);
    setSelectedComponent("authUserEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("authUsers.delete.title")}
      ressource={identity}
      subTitle={t("authUsers.delete.subTitle", { name: identity.firstname + " " + identity.lastname })}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>{identity.username}</Table.Cell>
      <Table.Cell>{identity.firstname}</Table.Cell>
      <Table.Cell>{identity.lastname}</Table.Cell>
      <Table.Cell>{identity.emails[0]?.address}</Table.Cell>
      <Table.Cell>{identity.purpose}</Table.Cell>
      <Table.Cell><IconButtonCheckUi item={identity.enabled}/></Table.Cell>
    </TemplateListContent>
  );
};

export default AuthUsersListContent;
