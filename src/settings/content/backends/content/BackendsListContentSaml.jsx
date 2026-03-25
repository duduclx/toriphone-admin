import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { toaster } from "../../../../components/ui/toaster";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplateListContent from "../../../templates/TemplateListContent";

const BackendsListContentSaml = ({ setSelectedComponent, backendSaml, setBackendSaml, setErrors }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { backendSamlDelete } = useApis();

  // delete
  const handleDelete = async () => {
    setErrors(null);
    setLoading(true);
    const res = await backendSamlDelete();
    if (res.error) {
      setErrors({ title: res.status, description: res.error.reason[0] });
    } else {
      setBackendSaml({
        acs_url: null,
        domain_uuid: null,
        entity_id: null,
      });
      setLoading(false);
      onClose();
      toaster.create({
        title: t("backendLdap.reset.title"),
        description: t("backendSaml.reset.description"),
        type: "success",
        duration: 4000,
        closable: true,
      });
    }
  };

  // edit
  const onEdit = async () => {
    setSelectedComponent("backendSaml");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      ressource={backendSaml}
      title={t("backendSaml.delete.title")}
      subTitle={t("backendSaml.delete.subTitle")}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>SSO</Table.Cell>
      <Table.Cell>{backendSaml.entity_id || t("common.not_configured")}</Table.Cell>
    </TemplateListContent>
  );
};

export default BackendsListContentSaml;
