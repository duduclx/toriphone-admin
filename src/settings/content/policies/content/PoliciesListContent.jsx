import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";

import { IconButtonCheckUi } from "../../../ui";

const PoliciesListContent = ({ policy, setSelectedComponent, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { policies, policiesPageGet, itemsPerPage, setPolicySelected, policyDelete } = useApis();

  // submit
  const handleDelete = async () => {
    setLoading(true);
    await policyDelete(policy);
    /*
    const updatedItems = policies.items.filter((item) => item.uuid !== policy.uuid);
    setPolicies((prev) => ({
      ...prev,
      items: updatedItems,
      total: updatedItems.length,
    }));
    */
    const newTotal = policies.total - 1;
    const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);

    // Vérifier si la page actuelle est toujours valide
    if (page > maxPage) {
      setPage(maxPage); // Mettre à jour la page
    } else {
      const offset = page * parseInt(itemsPerPage, 10);
      await policiesPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
    setLoading(false);
    onClose();
  };

  const onEdit = () => {
    setPolicySelected(policy);
    setSelectedComponent("policyEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("policies.delete.title")}
      ressource={policy}
      subTitle={t("policies.delete.subTitle", { name: policy.name })}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>{policy.name}</Table.Cell>
      <Table.Cell>{policy.description}</Table.Cell>
      <Table.Cell>
        <IconButtonCheckUi item={policy.read_only} />
      </Table.Cell>
      <Table.Cell>
        <IconButtonCheckUi item={policy.shared} />
      </Table.Cell>
    </TemplateListContent>
  );
};

export default PoliciesListContent;
