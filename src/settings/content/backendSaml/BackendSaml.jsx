import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toaster } from "../../../components/ui/toaster";

import TemplatePage from "../../templates/TemplatePage";
import BackendSamlForm from "./BackendSamlForm";

import { useApis } from "../../../ApiProvider";

const BackendSaml = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // value
  const [backendSaml, setBackendSaml] = useState({});
  const [saml, setSaml] = useState({});

  // api
  const {
    backendSamlGet,
    backendSamlCreate,
    backendSamlUpdate,
    backendSamlDelete,
    tenantCurrent,
    authTenantDomainGet,
    authTenantDomains,
  } = useApis();

  // load
  useEffect(() => {
    const fetch = async () => {
      const res = await backendSamlGet();
      setBackendSaml(res);
    };
    fetch();
    authTenantDomainGet(tenantCurrent);
  }, []);

  // update
  useEffect(() => {
    if (backendSaml) {
      setSaml(backendSaml);
    }
  }, [backendSaml]);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    if (!backendSaml.acs_url) {
      const res = await backendSamlCreate(saml);
      if (res.status !== 200) {
        setLoading(false);
        setErrors({ title: res.status, description: res.statusText });
      } else {
        setLoading(false);
        toaster.create({
          title: t("rtp.success.title"),
          description: t("rtp.success.description"),
          type: "success",
          duration: 4000,
          closable: true,
        });
        setSelectedComponent("backends");
      }
    } else {
      const res = await backendSamlUpdate(saml);
      if (res.status !== 200) {
        setLoading(false);
        setErrors({ title: res.status, description: res.statusText });
      } else {
        setLoading(false);
        toaster.create({
          title: t("rtp.success.title"),
          description: t("rtp.success.description"),
          type: "success",
          duration: 4000,
          closable: true,
        });
        setSelectedComponent("backends");
      }
    }
  };

  return (
    <TemplatePage
      title={t("backendSaml.title")}
      isEdit
      hasNoAdd
      errors={errors}
      loading={loading}
      submit={submit}
      route={"backends"}
      setSelectedComponent={setSelectedComponent}
    >
      <BackendSamlForm saml={saml} setSaml={setSaml} authTenantDomains={authTenantDomains} />
    </TemplatePage>
  );
};

export default BackendSaml;
