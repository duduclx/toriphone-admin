import { useEffect, useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { NativeSelectUi } from "../../ui";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import BackendsList from "./content/BackendsList";

import { useApis } from "../../../ApiProvider";
import { toaster } from "../../../components/ui/toaster";

const Backends = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // errors
  const [errors, setErrors] = useState(null);

  // api
  const {
    tenantCurrent,
    setTenantCurrent,
    authTenantEdit,
    backendLdap,
    setBackendLdap,
    backendLdapGet,
    backendSaml,
    setBackendSaml,
    backendSamlGet,
  } = useApis();

  // ressources
  const options = ["native", "ldap", "saml"];
  const [tenant, setTenant] = useState(tenantCurrent);

  useEffect(() => {
    backendLdapGet();
    backendSamlGet();
  }, []);

  // submit
  const submit = async () => {
    setErrors(null);
    const res = await authTenantEdit(tenant);
    if (res.message) {
      setErrors({ title: "error", description: res.message });
    } else {
      toaster.create({
        title: t("rtp.success.title"),
        description: t("rtp.success.description"),
        type: "success",
        duration: 4000,
        closable: true,
      });
      setTenantCurrent(tenant);
    }
  };

  return (
    <TemplatePage title={t("backends.title")} hasNoAdd isList errors={errors}>
      <Flex gap="4" justifyContent="flex-start" alignItems="center">
        <Text>{t("backends.default_auth_method")} :</Text>
        <Box w="400px">
          <NativeSelectUi
            value={tenant.default_authentication_method || ""}
            onChange={(e) => setTenant({ ...tenant, default_authentication_method: e.target.value })}
          >
            {options.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </NativeSelectUi>
        </Box>
        <Button colorPalette="primary" onClick={() => submit()}>
          {t("backends.apply")}
        </Button>
      </Flex>
      <BackendsList
        setSelectedComponent={setSelectedComponent}
        backendLdap={backendLdap}
        setBackendLdap={setBackendLdap}
        backendSaml={backendSaml}
        setBackendSaml={setBackendSaml}
        setErrors={setErrors}
      />
    </TemplatePage>
  );
};

export default Backends;
