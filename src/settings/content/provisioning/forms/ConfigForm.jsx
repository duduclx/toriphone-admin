import { Field } from "@chakra-ui/react";
import { CheckboxUi, InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../templates/forms/FormContainer";

const ConfigForm = ({ configs, setConfigs }) => {
  // requirements
  const { t } = useTranslation("admin");

  const handleParamChange = (index, value) => {
    setConfigs((prev) => ({
      ...prev,
      params: prev.params.map((param, i) => (i === index ? { ...param, value: value === "" ? null : value } : param)),
    }));
  };

  return (
    <FormContainer>
      <Field.Root>
        <Field.Label>{t("provisioning.plugin_server")}</Field.Label>
        <InputUi value={configs.params[0].value || ""} onChange={(e) => handleParamChange(0, e.target.value)} />
        <Field.HelperText>{t("provisioning.plugin_server_helper")}</Field.HelperText>
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("provisioning.http_proxy")}</Field.Label>
        <InputUi value={configs.params[1].value || ""} onChange={(e) => handleParamChange(1, e.target.value)} />
        <Field.HelperText>{t("provisioning.http_proxy_helper")}</Field.HelperText>
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("provisioning.ftp_proxy")}</Field.Label>
        <InputUi value={configs.params[2].value || ""} onChange={(e) => handleParamChange(2, e.target.value)} />
        <Field.HelperText>{t("provisioning.ftp_proxy_helper")}</Field.HelperText>
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("provisioning.https_proxy")}</Field.Label>
        <InputUi value={configs.params[3].value || ""} onChange={(e) => handleParamChange(3, e.target.value)} />
        <Field.HelperText>{t("provisioning.https_proxy_helper")}</Field.HelperText>
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("provisioning.locale")}</Field.Label>
        <InputUi value={configs.params[4].value || ""} onChange={(e) => handleParamChange(4, e.target.value)} />
        <Field.HelperText>{t("provisioning.locale_helper")}</Field.HelperText>
      </Field.Root>
      <CheckboxUi
        checked={configs.params[5].value == "1" ? true : false}
        onCheckedChange={(e) => handleParamChange(5, e.checked ? "1" : "0")}
      >
        {t("provisioning.nat")}
      </CheckboxUi>
      {/*
      <Field.Root>
        <Field.Label>{t("provisioning.provisioning_key")}</Field.Label>
        <InputUi value={configs.params[6].value} onChange={(e) => handleParamChange(6, e.target.value)} />
        <Field.HelperText>{t("provisioning.provisioning_key_helper")}</Field.HelperText>
      </Field.Root>
      */}
    </FormContainer>
  );
};

export default ConfigForm;
