import { useState, useEffect } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TenantHelper from "../helpers/TenantHelper";
import TemplateListContent from "../../../templates/TemplateListContent";

const TenantsListContent = ({ tenant, setSelectedComponent, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // helper
  const { getUserFromUuid } = TenantHelper();

  const { authTenants, authTenantsPageGet, itemsPerPage, setAuthTenantSelected, authTenantDelete } = useApis();

  /*
  const [tenantcurrent, setTenantcurrent] = useState(tenant);
  useEffect(() => {
    const fetchUser = async () => {
      if (tenant.contact) {
        try {
          const myuser = await getUserFromUuid(tenant.contact);
          console.log("myuser", myuser);
          setTenantcurrent({
            ...tenant,
            contact: myuser,
          });
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchUser();
  }, [tenant]);

  console.log('tenantcurrent', tenantcurrent)
  */

  // submit
  const handleDelete = async () => {
    setLoading(true);
    await authTenantDelete(tenant);
    /*
    const updatedItems = authTenants.items.filter((item) => item.uuid !== tenant.uuid);
    setAuthTenants((prev) => ({
      ...prev,
      items: updatedItems,
      total: updatedItems.length,
    }));
    */
    const newTotal = authTenants.total - 1;
    const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);

    // Vérifier si la page actuelle est toujours valide
    if (page > maxPage) {
      setPage(maxPage); // Mettre à jour la page
    } else {
      const offset = page * parseInt(itemsPerPage, 10);
      await authTenantsPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
    setLoading(false);
    onClose();
  };

  const onEdit = () => {
    setAuthTenantSelected(tenant);
    setSelectedComponent("tenantEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("tenants.delete.title")}
      ressource={tenant}
      subTitle={t("tenants.delete.subTitle", { name: tenant.name })}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>{tenant.name}</Table.Cell>
      <Table.Cell>{tenant.slug}</Table.Cell>
      <Table.Cell>{tenant.address?.state || ""}</Table.Cell>
      <Table.Cell>{tenant.address?.line_2 || ""}</Table.Cell>
      <Table.Cell>{tenant.domain_names.join(", ")}</Table.Cell>
    </TemplateListContent>
  );
};

export default TenantsListContent;
