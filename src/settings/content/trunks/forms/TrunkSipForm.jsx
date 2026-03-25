import { useEffect, useState } from "react";
import { Flex, Field, Tabs, Text } from "@chakra-ui/react";
import { ButtonAddUi, IconButtonTrashUi, InputUi, NativeSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import TrunkContextForm from "../forms/TrunkContextForm";
import TrunkTransportForm from "../forms/TrunkTransportForm";
import TrunkTemplatesForm from "../forms/TrunkTemplatesForm";
import FormContainer from "../../../templates/forms/FormContainer";
import SectionOptions from "../../../helpers/SectionOptions";
import outgoingCallerIdFormatOptions from "../helpers/TrunkOutgoingCallerIdFormatOptions";

const TrunkSipForm = ({ trunk, setTrunk, context, setContext }) => {
  // requirements
  const { t } = useTranslation("admin");

  // helper
  const { keyOptionsAor, keyOptionsAuths, keyOptionsEndpoint, keyOptionsIdentifer, keyOptionsRegister } =
    SectionOptions();

  // transport form
  const [transport, setTransport] = useState(trunk.endpoint_sip.transport);
  useEffect(() => {
    if (transport) {
      setTrunk({
        ...trunk,
        endpoint_sip: {
          ...trunk.endpoint_sip,
          transport: {
            uuid: transport.value,
          },
        },
      });
    } else {
      setTrunk({
        ...trunk,
        endpoint_sip: {
          ...trunk.endpoint_sip,
          transport: null,
        },
      });
    }
  }, [transport]);

  // templates form
  const [templates, setTemplates] = useState(trunk.endpoint_sip.templates);
  useEffect(() => {
    setTrunk({
      ...trunk,
      endpoint_sip: {
        ...trunk.endpoint_sip,
        templates: templates,
      },
    });
  }, [templates]);

  const addOption = (section) => {
    setTrunk({
      ...trunk,
      endpoint_sip: {
        ...trunk.endpoint_sip,
        [section]: [...trunk.endpoint_sip[section], ["", ""]],
      },
    });
  };

  const handleOptionChange = (section, index, field, value) => {
    const newOptions = trunk.endpoint_sip[section].map((option, idx) =>
      idx === index ? (field === "key" ? [value, option[1]] : [option[0], value]) : option
    );
    setTrunk({
      ...trunk,
      endpoint_sip: {
        ...trunk.endpoint_sip,
        [section]: newOptions,
      },
    });
  };

  const removeOption = (section, index) => {
    const newOptions = trunk.endpoint_sip[section].filter((_, idx) => idx !== index);
    setTrunk({
      ...trunk,
      endpoint_sip: {
        ...trunk.endpoint_sip,
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
      {trunk.endpoint_sip[section].map((option, index) => (
        <Flex key={index} gap="4">
          <IconButtonTrashUi onClick={() => removeOption(section, index)} />
          <NativeSelectUi
            value={option[0] || ""}
            onChange={(e) => handleOptionChange(section, index, "key", e.target.value)}
            placeholder={t("common.key_select")}
          >
            {keyOptions.map((keyOption, index) => (
              <option value={keyOption} key={index}>
                {keyOption}
              </option>
            ))}
          </NativeSelectUi>
          <InputUi value={option[1]} onChange={(e) => handleOptionChange(section, index, "value", e.target.value)} />
        </Flex>
      ))}
      <ButtonAddUi text={t("common.option_add")} onClick={() => addOption(section)} />
    </FormContainer>
  );

  return (
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
              value={trunk.endpoint_sip?.label || ""}
              onChange={(e) =>
                setTrunk({
                  ...trunk,
                  endpoint_sip: {
                    ...trunk.endpoint_sip,
                    label: e.target.value,
                  },
                })
              }
            />
          </Field.Root>
          <TrunkContextForm context={context} setContext={setContext} />
          <TrunkTransportForm transport={transport} setTransport={setTransport} />
          <TrunkTemplatesForm templates={templates} setTemplates={setTemplates} />
          <Field.Root>
            <Field.Label>{t("trunks.outgoing_caller_id_format")} :</Field.Label>
            <NativeSelectUi
              value={trunk.outgoing_caller_id_format}
              onChange={(e) =>
                setTrunk({
                  ...trunk,
                  outgoing_caller_id_format: e.target.value,
                })
              }
            >
              {outgoingCallerIdFormatOptions.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </NativeSelectUi>
          </Field.Root>
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

      <Tabs.Content width="50%" m="auto" value="identify">
        {renderOptions("identify_section_options", keyOptionsIdentifer)}
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="register">
        {renderOptions("registration_section_options", keyOptionsRegister)}
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="reg_outbound">
        {renderOptions("registration_outbound_auth_section_options", keyOptionsAuths)}
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="outbound">
        {renderOptions("outbound_auth_section_options", keyOptionsAuths)}
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default TrunkSipForm;
