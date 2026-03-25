import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TenantHelper from "../helpers/TenantHelper";
import TemplatePage from "../../../templates/TemplatePage";

import TenantForm from "../forms/TenantForm";

const TenantCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // helper
  const { tenantAuthMethodOptions } = TenantHelper();

  // api
  const { authTenantAdd } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [tenant, setTenant] = useState({
    domain_names: [],
    //contact: "",
    default_authentication_method: tenantAuthMethodOptions[0].value,
  });

  /*
  const [contact, setContact] = useState(null);

  useEffect(() => {
    setTenant((prev) => ({
      ...prev,
      contact: contact?.uuid || "",
    }));
  }, [contact]);
  */

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await authTenantAdd(tenant);
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
      title={t("tenants.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"tenants"}
      submit={submit}
      isCreate
      hasTabs
      errors={errors}
      loading={loading}
    >
      <TenantForm tenant={tenant} setTenant={setTenant}/>
    </TemplatePage>
  );
};

export default TenantCreate;
