import { Flex, Field, Tabs, Text, Box } from "@chakra-ui/react";
import { ButtonAddUi, IconButtonTrashUi, InputUi, ReactSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import SectionOptions from "../../../helpers/SectionOptions";
import FormContainer from "../../../templates/forms/FormContainer";
import LineContext from "../helper/LineContext";
import LineTransport from "../helper/LineTransport";
import LineTemplates from "../helper/LineTemplates";

const LineCreateSip = ({ contextsOptions, line, setLine }) => {
  // requirements
  const { t } = useTranslation("admin");

  // helper
  const { keyOptionsAor, keyOptionsAuths, keyOptionsEndpoint, keyOptionsIdentifer, keyOptionsRegister } =
    SectionOptions();

  const addOption = (section) => {
    setLine({
      ...line,
      endpoint_sip: {
        ...line.endpoint_sip,
        [section]: [...(line.endpoint_sip[section] || []), ["", ""]],
      },
    });
  };

  const handleOptionChange = (section, index, field, value) => {
    const newOptions = line.endpoint_sip[section].map((option, idx) =>
      idx === index ? (field === "key" ? [value, option[1]] : [option[0], value]) : option
    );
    setLine({
      ...line,
      endpoint_sip: {
        ...line.endpoint_sip,
        [section]: newOptions,
      },
    });
  };

  const removeOption = (section, index) => {
    const newOptions = line.endpoint_sip[section].filter((_, idx) => idx !== index);
    setLine({
      ...line,
      endpoint_sip: {
        ...line.endpoint_sip,
        [section]: newOptions,
      },
    });
  };

  const renderOptions = (section, keyOptions) => (
    <FormContainer>
      <Flex justifyContent="space-around">
        <Text>{t("common.key")}</Text>
        <Text>{t("common.value")}</Text>
      </Flex>
      {line.endpoint_sip[section].map((option, index) => (
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
          <Tabs.Trigger value="registration">{t("common.registration")}</Tabs.Trigger>
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
                value={line.label}
                onChange={(e) =>
                  setLine({
                    ...line,
                    endpoint_sip: {
                      ...line.endpoint_sip,
                      label: e.target.value,
                    },
                  })
                }
              />
            </Field.Root>
            <LineContext contextsOptions={contextsOptions} line={line} setLine={setLine} />
            <LineTransport line={line} setLine={setLine} />
            <LineTemplates line={line} setLine={setLine} />
          </FormContainer>
        </Tabs.Content>

        <Tabs.Content width="50%" m="auto" value="aor">
          {renderOptions("aor_section_options", keyOptionsAor)}
        </Tabs.Content>

        <Tabs.Content width="50%" m="auto" value="auth">
          {renderOptions("auth_section_options", keyOptionsAuths)}
        </Tabs.Content>

        <Tabs.Content width="50%" m="auto" value="endpoint">
          {renderOptions("endpoint_section_options", keyOptionsEndpoint)}
        </Tabs.Content>

        <Tabs.Content width="50%" m="auto" value="indetify">
          {renderOptions("identify_section_options", keyOptionsIdentifer)}
        </Tabs.Content>

        <Tabs.Content width="50%" m="auto" value="registration">
          {renderOptions("registration_section_options", keyOptionsRegister)}
        </Tabs.Content>

        <Tabs.Content width="50%" m="auto" value="reg_outbound">
          {renderOptions("registration_outbound_auth_section_options", keyOptionsAuths)}
        </Tabs.Content>

        <Tabs.Content width="50%" m="auto" value="outbound">
          {renderOptions("outbound_auth_section_options", keyOptionsAuths)}
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
};

export default LineCreateSip;
