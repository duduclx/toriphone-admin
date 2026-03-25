import { Box, Button, Flex, Field } from "@chakra-ui/react";
import { InputUi, NativeSelectUi } from "../../ui";
import { useTranslation } from "react-i18next";
import FormContainer from "../../templates/forms/FormContainer";

const BackendSamlForm = ({ saml, setSaml, authTenantDomains }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <FormContainer>
      <Field.Root>
        <Field.Label>{t("backendSaml.acs_url")}</Field.Label>
        <InputUi
          value={saml.acs_url || ""}
          onChange={(e) => setSaml((prev) => ({ ...prev, acs_url: e.target.value }))}
        />
        <Field.HelperText>{t("backendSaml.acs_url_helper")}</Field.HelperText>
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("backendSaml.domain_uuid")}</Field.Label>
        <NativeSelectUi
          value={saml.domain_uuid || ""}
          onChange={(e) => setSaml((prev) => ({ ...prev, domain_uuid: e.target.value }))}
        >
          <option>{t("backendSaml.domain_uuid_select")}</option>
          {(authTenantDomains.items || []).map((item, index) => (
            <option key={index} value={item.uuid}>
              {item.name}
            </option>
          ))}
        </NativeSelectUi>
        <Field.HelperText>{t("backendSaml.domain_uuid_helper")}</Field.HelperText>
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("backendSaml.entity_id")}</Field.Label>
        <InputUi
          value={saml.entity_id || ""}
          onChange={(e) => setSaml((prev) => ({ ...prev, entity_id: e.target.value }))}
        />
        <Field.HelperText>{t("backendSaml.entity_id_helper")}</Field.HelperText>
      </Field.Root>
      <Field.Root>
        <Field.Label>XML</Field.Label>
        <Box display="flex" justifyContent="space-between" gap="4">
          <InputUi
            id="file"
            type="file"
            opacity="0"
            position="absolute"
            zIndex="-1"
            accept=".xml"
            onChange={(e) => setSaml((prev) => ({ ...prev, metadata: e.target.files[0] }))}
          />
          <Button colorPalette="secondary" as="label" htmlFor="file" textAlign="center">
            {t("common.browse")}
          </Button>
          <InputUi readOnly value={saml?.metadata?.name || t("common.file_empty")} width="60%" />
        </Box>

        <Field.HelperText>{t("backendSaml.xml_helper")}</Field.HelperText>
      </Field.Root>
    </FormContainer>
  );
};

export default BackendSamlForm;
