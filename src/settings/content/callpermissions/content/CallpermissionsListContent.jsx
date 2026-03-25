import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";

const CallpermissionsListContent = ({ callpermission, setSelectedComponent, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { callPermissions, callPermissionsPageGet, itemsPerPage, setCallPermissionSelected, callPermissionDelete } = useApis();

  const handleDelete = async () => {
    setLoading(true);
    await callPermissionDelete(callpermission);
    /*
    const updatedItems = callPermissions.items.filter((item) => item.id !== callpermission.id);
    setCallPermissions((prev) => ({
      ...prev,
      items: updatedItems,
      total: updatedItems.length,
    }));
    */
    const newTotal = callPermissions.total - 1;
    const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);

    // Vérifier si la page actuelle est toujours valide
    if (page > maxPage) {
      setPage(maxPage); // Mettre à jour la page
    } else {
      const offset = page * parseInt(itemsPerPage, 10);
      await callPermissionsPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
    setLoading(false);
    onClose();
  };

  const onEdit = () => {
    setCallPermissionSelected(callpermission);
    setSelectedComponent("callpermissionEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("callpermissions.delete.title")}
      ressource={callpermission}
      subTitle={t("callpermissions.delete.subTitle", { name: callpermission.name })}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>{callpermission.name}</Table.Cell>
      <Table.Cell>{callpermission.mode == "allow" ? "autoriser" : "refuser"}</Table.Cell>
      <Table.Cell>{callpermission.password}</Table.Cell>
    </TemplateListContent>
  );
};

export default CallpermissionsListContent;
