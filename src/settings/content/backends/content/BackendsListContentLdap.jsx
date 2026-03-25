import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { toaster } from "../../../../components/ui/toaster";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplateListContent from "../../../templates/TemplateListContent";

const BackendsListContentLdap = ({ setSelectedComponent, backendLdap, setBackendLdap, setErrors }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { backendLdapDelete } = useApis();

  // delete
  const handleDelete = async () => {
    setErrors(null);
    setLoading(true);
    const res = await backendLdapDelete();
    if (res.error) {
      setErrors({ title: res.status, description: res.error.reason[0] });
    } else {
      setBackendLdap({
        host: "",
        port: "",
        protocol_version: 2,
        protocol_security: null,
        bind_dn: "",
        user_base_dn: "",
        user_login_attribute: "",
        user_email_attribute: "",
        search_filters: "",
      });
      setLoading(false);
      onClose();
      toaster.create({
        title: t("backendLdap.reset.title"),
        description: t("backendLdap.reset.description"),
        type: "success",
        duration: 4000,
        closable: true,
      });
    }
  };

  // edit
  const onEdit = async () => {
    setSelectedComponent("backendLdap");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      ressource={backendLdap}
      title={"supprimer le ldap"}
      subTitle={"voulez-vous supprimer les informations actuelles ?"}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>LDAP</Table.Cell>
      <Table.Cell>{backendLdap.host || t("common.not_configured")}</Table.Cell>
    </TemplateListContent>
  );
};

export default BackendsListContentLdap;
