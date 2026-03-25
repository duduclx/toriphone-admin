import { Flex, Field, Tabs, Text, Box } from "@chakra-ui/react";
import { ButtonAddUi, IconButtonTrashUi, InputUi, ReactSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import SectionOptions from "../../../helpers/SectionOptions";
import FormContainer from "../../../templates/forms/FormContainer";
import LineContext from "../helper/LineContext";
import EndpointTransport from "../helper/EndpointTransport";
import EndpointTemplates from "../helper/EndpointTemplates";

const LineEditSip = ({ contextsOptions, line, setLine, endpointSip, setEndpointSip }) => {
  // requirements
  const { t } = useTranslation("admin");

  // helper
  const { keyOptionsAor, keyOptionsAuths, keyOptionsEndpoint, keyOptionsIdentifer, keyOptionsRegister } =
    SectionOptions();

  const addOption = (section) => {
    setEndpointSip({
      ...endpointSip,
      [section]: [...(endpointSip[section] || []), ["", ""]],
    });
  };

  const handleOptionChange = (section, index, field, value) => {
    const newOptions = endpointSip[section].map((option, idx) =>
      idx === index ? (field === "key" ? [value, option[1]] : [option[0], value]) : option
    );
    setEndpointSip({
      ...endpointSip,
      [section]: newOptions,
    });
  };

  const removeOption = (section, index) => {
    const newOptions = endpointSip[section].filter((_, idx) => idx !== index);
    setEndpointSip({
      ...endpointSip,
      [section]: newOptions,
    });
  };

  const renderOptions = (section, keyOptions) => (
    <FormContainer>
      <Flex justifyContent="space-around">
        <Text>{t("common.key")}</Text>
        <Text>{t("common.value")}</Text>
      </Flex>
      {endpointSip[section].map((option, index) => (
        <Flex key={index} gap="4">
          <IconButtonTrashUi onClick={() => removeOption(section, index)} />
          <Box width="100%">
            <ReactSelectUi
              options={keyOptions.map((keyOption) => ({ value: keyOption, label: keyOption }))}
              value={{ value: option[0], label: option[0] }}
              onChange={(selectedOption) => handleOptionChange(section, index, "key", selectedOption.value)}
              placeholder={t("common.key_select")}
            />
          </Box>
          <InputUi value={option[1]} onChange={(e) => handleOptionChange(section, index, "value", e.target.value)} />
        </Flex>
      ))}
      <ButtonAddUi text={t("common.option_add")} onClick={() => addOption(section)} />
    </FormContainer>
  );

  return (
    <>
      <Tabs.Root defaultValue="general">
        <Tabs.List>
          <Tabs.Trigger value="general">{t("common.general")}</Tabs.Trigger>
          <Tabs.Trigger value="aor">{t("common.aor")}</Tabs.Trigger>
          <Tabs.Trigger value="auth">{t("common.authentication")}</Tabs.Trigger>
          <Tabs.Trigger value="endpoint">{t("common.endpoint")}</Tabs.Trigger>
          <Tabs.Trigger value="identify">{t("common.identify")}</Tabs.Trigger>
          <Tabs.Trigger value="register">{t("common.registration")}</Tabs.Trigger>
          <Tabs.Trigger value="reg_outbound">{t("common.registration_outbound_auth")}</Tabs.Trigger>
          <Tabs.Trigger value="outbound">{t("common.outbound_auth")}</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content width="50%" m="auto" value="general">
          <FormContainer alignSelf="center" justifyContent="center">
            <Field.Root>
              <Field.Label>{t("common.name")} :</Field.Label>
              <InputUi
                required
                placeholder={t("common.name")}
                value={endpointSip?.label || ""}
                onChange={(e) =>
                  setEndpointSip({
                    ...endpointSip,
                    label: e.target.value,
                  })
                }
              />
            </Field.Root>
            <LineContext contextsOptions={contextsOptions} line={line} setLine={setLine} />
            {endpointSip && (
              <>
                <EndpointTransport endpoint={endpointSip} setEndpoint={setEndpointSip} />
                <EndpointTemplates endpoint={endpointSip} setEndpoint={setEndpointSip} />
              </>
            )}
          </FormContainer>
        </Tabs.Content>

        <Tabs.Content width="50%" m="auto" value="aor">
          {endpointSip && renderOptions("aor_section_options", keyOptionsAor)}
        </Tabs.Content>

        <Tabs.Content width="50%" m="auto" value="auth">
          {endpointSip && renderOptions("auth_section_options", keyOptionsAuths)}
        </Tabs.Content>

        <Tabs.Content width="50%" m="auto" value="endpoint">
          {endpointSip && renderOptions("endpoint_section_options", keyOptionsEndpoint)}
        </Tabs.Content>

        <Tabs.Content width="50%" m="auto" value="identify">
          {endpointSip && renderOptions("identify_section_options", keyOptionsIdentifer)}
        </Tabs.Content>

        <Tabs.Content width="50%" m="auto" value="register">
          {endpointSip && renderOptions("registration_section_options", keyOptionsRegister)}
        </Tabs.Content>

        <Tabs.Content width="50%" m="auto" value="reg_outbound">
          {endpointSip && renderOptions("registration_outbound_auth_section_options", keyOptionsAuths)}
        </Tabs.Content>

        <Tabs.Content width="50%" m="auto" value="outbound">
          {endpointSip && renderOptions("outbound_auth_section_options", keyOptionsAuths)}
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
};

export default LineEditSip;
