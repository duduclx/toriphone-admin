import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";

import TenantForm from "../forms/TenantForm";

const TenantEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { authTenantSelected, authTenantEdit } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [tenant, setTenant] = useState(authTenantSelected);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await authTenantEdit(tenant);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("tenants");
    }
  };

  return (
    <TemplatePage
      title={t("tenants.edit.title", { name: authTenantSelected.name })}
      setSelectedComponent={setSelectedComponent}
      route={"tenants"}
      submit={submit}
      isEdit
      hasTabs
      errors={errors}
      loading={loading}
    >
      <TenantForm tenant={tenant} setTenant={setTenant} isEdit/>
    </TemplatePage>
  );
};

export default TenantEdit;
