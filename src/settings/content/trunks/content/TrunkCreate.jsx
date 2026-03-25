import { useState, useEffect } from "react";
import { Box, Field } from "@chakra-ui/react";
import { NativeSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplatePage from "../../../templates/TemplatePage";

import TrunkCreateSipPlugins from "./TrunkCreateSipPlugins";

import TrunkSipForm from "../forms/TrunkSipForm";
import TrunkCustomform from "../forms/TrunkCustomform";
import TrunkIaxForm from "../forms/TrunkIaxForm";

import initialOptions from "../helpers/TrunkSipInitialOptions";
import hostOptions from "../helpers/TrunkHostOptions";
import typeOptions from "../helpers/TrunkTypeOptions";
import trunkOutgoingCallerIdFormatOptions from "../helpers/TrunkOutgoingCallerIdFormatOptions";

const TrunkCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { sipTransportsGet, endpointsSipTemplatesGet, trunkCreate } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // states
  const [type, setType] = useState("none");
  const [typeSelected, setTypeSelected] = useState(false);
  const [pluginSelected, setPluginSelected] = useState(false);
  const [providersList, setProvidersList] = useState([]);
  const [isChildComponentVisible, setIsChildComponentVisible] = useState(false);

  // context form
  const [context, setContext] = useState(null);
  useEffect(() => {
    if (context) {
      setTrunk({
        ...trunk,
        context: context.name,
      });
    } else {
      setTrunk({
        ...trunk,
        context: null,
      });
    }
  }, [context]);

  // resource
  const [trunk, setTrunk] = useState({
    label: null,
    context: null,
    endpoint_sip: initialOptions,
    outgoing_caller_id_format: trunkOutgoingCallerIdFormatOptions[0],
    endpoint_custom: {
      interface: null,
    },
    endpoint_iax: {
      options: [],
      host: hostOptions[0],
      type: typeOptions[0],
    },
    register_iax: false,
    register: {
      auth_password: null,
      auth_username: null,
      callback_context: null,
      callback_extension: null,
      remote_host: null,
      remote_port: null,
    },
  });

  // update trunk
  useEffect(() => {
    if (type === "sip") {
      setTrunk({
        ...trunk,
        endpoint_custom: null,
        endpoint_iax: null,
      });
    }
    if (type === "custom") {
      setTrunk({
        ...trunk,
        endpoint_iax: null,
        endpoint_sip: null,
      });
    }
    if (type === "iax") {
      setTrunk({
        ...trunk,
        endpoint_custom: null,
        endpoint_sip: null,
      });
    }
  }, [type]);

  const [selectedProvider, setSelectedProvider] = useState(null);

  const trunksOptions = [
    { label: t("trunks.protocol_select"), value: "none" },
    { label: "SIP", value: "sip" },
    { label: "IAX", value: "iax" },
    { label: "Custom", value: "custom" },
  ];

  const handleSetType = (e) => {
    const selectedType = e.target.value;
    setType(selectedType);
    setSelectedProvider(null); // Reset provider selection
    setPluginSelected(false); // Reset plugin selection

    // Mettez à jour isChildComponentVisible en fonction du type sélectionné
    if (selectedType === "sip") {
      setIsChildComponentVisible(false); // Afficher les selects pour SIP
    } else {
      setIsChildComponentVisible(true); // Cacher les selects pour IAX et custom
      setTypeSelected(true);
    }
  };

  useEffect(() => {
    const loadProvidersList = async () => {
      try {
        const response = await fetch("/plugins/sip/list.json");
        const data = await response.json();
        setProvidersList(data.items);
      } catch (error) {
        console.error("Error loading providers list:", error);
      }
    };
    loadProvidersList();
    sipTransportsGet();
    endpointsSipTemplatesGet();
  }, []);

  const handleSetProvider = (value) => {
    setSelectedProvider(value);
    setPluginSelected(value !== "manual" && value !== "none");
    setIsChildComponentVisible(value !== "none"); // Cache les selects si un provider est sélectionné
    setTypeSelected(true);
  };

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await trunkCreate(trunk);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("trunks");
    }
  };

  return (
    <TemplatePage
      title={t("trunks.create.title")}
      setSelectedComponent={setSelectedComponent}
      route="trunks"
      submit={submit}
      isCreate={typeSelected}
      hasTabs={!pluginSelected}
      errors={errors}
      loading={loading}
    >
      {/* Affiche les selects uniquement si aucun composant enfant n'est affiché */}
      {!isChildComponentVisible && (
        <Box width="50%" m="8" alignSelf="center">
          <Field.Root>
            <Field.Label>{t("common.protocol")} :</Field.Label>
            <NativeSelectUi onChange={handleSetType}>
              {trunksOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </NativeSelectUi>
          </Field.Root>

          {type === "sip" && (
            <Field.Root mt="4">
              <Field.Label>{t("trunks.operator_select")} :</Field.Label>
              <NativeSelectUi onChange={(e) => handleSetProvider(e.target.value)}>
                <option value="none">{t("trunks.operator_select")}</option>
                <option value="manual">{t("trunks.config_manual")}</option>
                {providersList.map((provider, index) => (
                  <option key={index} value={provider.slug}>
                    {provider.name}
                  </option>
                ))}
              </NativeSelectUi>
            </Field.Root>
          )}
        </Box>
      )}

      {/* Affiche les composants enfants en fonction de la sélection */}
      {type === "sip" && pluginSelected && (
        <TrunkCreateSipPlugins
          provider={selectedProvider}
          trunk={trunk}
          setTrunk={setTrunk}
          context={context}
          setContext={setContext}
        />
      )}
      {type === "sip" && selectedProvider === "manual" && (
        <TrunkSipForm trunk={trunk} setTrunk={setTrunk} context={context} setContext={setContext} />
      )}
      {type === "iax" && <TrunkIaxForm trunk={trunk} setTrunk={setTrunk} context={context} setContext={setContext} />}
      {type === "custom" && (
        <TrunkCustomform trunk={trunk} setTrunk={setTrunk} context={context} setContext={setContext} />
      )}
    </TemplatePage>
  );
};

export default TrunkCreate;
