import { Field } from "@chakra-ui/react";
import { InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../templates/forms/FormContainer";

const NetForm = ({ network, setNetwork }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <FormContainer>
      <Field.Root>
        <Field.Label>{t("provisioning.provision_host")}</Field.Label>
        <InputUi
          value={network.provision_host}
          onChange={(e) => setNetwork((prev) => ({ ...prev, provision_host: e.target.value }))}
        />
      </Field.Root>
      {/*
      <Field.Root>
        <Field.Label>{t("provisioning.provision_http_base_url")}</Field.Label>
        <InputUi
          value={network.provision_http_base_url}
          onChange={(e) => setNetwork((prev) => ({ ...prev, provision_http_base_url: e.target.value }))}
        />
        </Field.Root>
      */}
      <Field.Root>
        <Field.Label>{t("provisioning.provision_http_port")}</Field.Label>
        <InputUi
          value={network.provision_http_port}
          onChange={(e) => setNetwork((prev) => ({ ...prev, provision_http_port: e.target.value }))}
        />
      </Field.Root>
    </FormContainer>
  );
};

export default NetForm;
