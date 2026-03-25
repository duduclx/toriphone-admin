import { useState, useEffect } from "react";
import { Field } from "@chakra-ui/react";
import { InputUi, NativeSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TrunkContextForm from "../forms/TrunkContextForm";
import FormContainer from "../../../templates/forms/FormContainer";

const TrunkCreateSipPlugins = ({ provider, trunk, setTrunk, context, setContext }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { sipTransportsAll, endpointsSipTemplatesAll, tenantCurrent } = useApis();

  // resources
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [variables, setVariables] = useState([]);
  const [formData, setFormData] = useState({});
  const [bodyTemplate, setBodyTemplate] = useState(null);
  const [suffix, setSuffix] = useState("sip");
  const [namePreview, setNamePreview] = useState("");

  useEffect(() => {
    const loadProviderFiles = async () => {
      try {
        const variablesResponse = await fetch(`/plugins/sip/${provider}/endpoint/variables.json`);
        const bodyResponse = await fetch(`/plugins/sip/${provider}/endpoint/body.json`);
        const variablesData = await variablesResponse.json();
        const bodyData = await bodyResponse.json();
        setVariables(variablesData.variables);
        setBodyTemplate(bodyData);

        const initialData = {};
        variablesData.variables.forEach((variable) => {
          initialData[variable.name] = variable.default || "";
        });
        setFormData(initialData);
        setSelectedProvider(provider);
      } catch (error) {
        console.error("Error loading provider files:", error);
      }
    };
    loadProviderFiles();
  }, []);

  const handleChange = (name, value) => {
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    // Mettez à jour l'état `trunk` dans le parent
    setTrunk((prevTrunk) => ({
      ...prevTrunk,
      endpoint_sip: {
        ...prevTrunk.endpoint_sip,
        ...replacePlaceholders(bodyTemplate, { suffix, ...updatedFormData }),
      },
    }));
  };

  const handleSuffixChange = (value) => {
    setSuffix(value);
    setTrunk((prevTrunk) => ({
      ...prevTrunk,
      suffix: value,
    }));
  };

  const replacePlaceholders = (obj, extraData = {}) => {
    const getValue = (v) => {
      const value = formData[v.trim()] || extraData[v.trim()] || "";
      if (v.trim() === "global_sip_template_uuid") {
        const template = endpointsSipTemplatesAll.items.find((t) => t.label === "global");
        return template ? template.uuid : value;
      }
      if (v.trim() === "registration_trunk_sip_template_uuid") {
        const template = endpointsSipTemplatesAll.items.find((t) => t.label === "registration_trunk");
        return template ? template.uuid : value;
      }
      if (v.trim() === "transport_uuid") {
        const transport = sipTransportsAll.items.find((t) => t.name === "transport-udp");
        return transport ? transport.uuid : value;
      }
      if (v.trim() === "tenant_uuid") {
        return tenantCurrent.uuid;
      }
      if (v.trim() === "suffix") {
        return suffix;
      }
      return value;
    };

    if (typeof obj === "string") {
      return obj.replace(/\{\{(.*?)\}\}/g, (_, v) => getValue(v));
    } else if (Array.isArray(obj)) {
      return obj.map((item) => replacePlaceholders(item, extraData));
    } else if (typeof obj === "object" && obj !== null) {
      return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, replacePlaceholders(v, extraData)]));
    }
    return obj;
  };

  useEffect(() => {
    if (bodyTemplate) {
      const updatedName = replacePlaceholders(bodyTemplate.name, { suffix });
      setNamePreview(updatedName);
    }
  }, [formData, suffix, bodyTemplate]);

  return (
    <FormContainer>
      {selectedProvider && variables.length > 0 && (
        <>
          <TrunkContextForm context={context} setContext={setContext} />
          <Field.Root>
            <Field.Label>{t("trunks.suffix")}</Field.Label>
            <InputUi value={suffix} onChange={(e) => handleSuffixChange(e.target.value)} />
            <Field.HelperText>{bodyTemplate && namePreview}</Field.HelperText>
          </Field.Root>
          {variables.map((variable, index) => (
            <Field.Root key={index} required={variable.required}>
              <Field.Label>{t(`trunks.${variable.name}`)}</Field.Label>
              {variable.choices ? (
                <NativeSelectUi
                  value={formData[variable.name]}
                  onChange={(e) => handleChange(variable.name, e.target.value)}
                >
                  {variable.choices.map((choice, idx) => (
                    <option key={idx} value={choice}>
                      {choice}
                    </option>
                  ))}
                </NativeSelectUi>
              ) : (
                <InputUi value={formData[variable.name]} onChange={(e) => handleChange(variable.name, e.target.value)} />
              )}
            </Field.Root>
          ))}
        </>
      )}
    </FormContainer>
  );
};

export default TrunkCreateSipPlugins;
