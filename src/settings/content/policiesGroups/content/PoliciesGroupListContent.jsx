import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";

import { IconButtonCheckUi } from "../../../ui";

const PoliciesGroupListContent = ({ policy, setSelectedComponent, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { authGroups, authGroupsPageGet, itemsPerPage, setAuthGroupSelected, authGroupDelete } = useApis();

  // submit
  const submit = async () => {
    setLoading(true);
    await authGroupDelete(policy);
    /*
    const updatedItems = authGroups.items.filter((item) => item.uuid !== policy.uuid);
    setAuthGroups((prev) => ({
      ...prev,
      items: updatedItems,
      total: updatedItems.length,
    }));
    */
    const newTotal = authGroups.total - 1;
    const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);

    // Vérifier si la page actuelle est toujours valide
    if (page > maxPage) {
      setPage(maxPage); // Mettre à jour la page
    } else {
      const offset = page * parseInt(itemsPerPage, 10);
      await authGroupsPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
    setLoading(false);
    onClose();
  };

  // edit
  const onEdit = () => {
    setAuthGroupSelected(policy);
    setSelectedComponent("policyGroupEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("policyGroups.delete.title")}
      ressource={policy}
      subTitle={t("policyGroups.delete.subTitle", { name: policy.name })}
      submit={submit}
      loading={loading}
    >
      <Table.Cell>{policy.name}</Table.Cell>
      <Table.Cell>
        <IconButtonCheckUi item={policy.system_managed}/>
      </Table.Cell>
      <Table.Cell>
        <IconButtonCheckUi item={policy.read_only}/>
      </Table.Cell>
    </TemplateListContent>
  );
};

export default PoliciesGroupListContent;
