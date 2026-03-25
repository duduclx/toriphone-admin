import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";

import TrunkSipForm from "../forms/TrunkSipForm";
import TrunkCustomform from "../forms/TrunkCustomform";
import TrunkIaxForm from "../forms/TrunkIaxForm";

const TrunkEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const {
    trunkSelected,
    endpointTypeGet,
    registersIaxGet,
    sipTransportsGet,
    endpointsSipTemplatesGet,
    contextsGet,
    contexts,
    trunkUpdate
  } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [trunk, setTrunk] = useState(null);

  // initialize resource
  useEffect(() => {
    const fetchItems = async () => {
      const transports = await sipTransportsGet(); // me permet d'avoir transports.items
      const templates = await endpointsSipTemplatesGet(); // me permet d'avoir templates.items
      const contexts = await contextsGet(); // me permet d'avoir contexts.items
  
      if (trunkSelected) {
        // Transport labelled
        const updateTransport = (transport) => {
          if (!transport || !transport.uuid) return transport;
  
          const matchedTransport = transports.items.find(
            (item) => item.uuid === transport.uuid
          );
  
          if (matchedTransport) {
            return {
              ...transport,
              label: matchedTransport.name,
              value: transport.uuid,
            };
          }
  
          return transport;
        };
  
        // Templates labelled
        const updateTemplates = (templatesList) => {
          if (!templatesList || !Array.isArray(templatesList)) return templatesList;
  
          return templatesList.map((template) => {
            const matchedTemplate = templates.items.find(
              (item) => item.uuid === template.uuid
            );
  
            if (matchedTemplate) {
              return {
                ...template,
                label: matchedTemplate.label,
                value: template.uuid,
              };
            }
  
            return template;
          });
        };
  
        // Mise à jour des endpoints
        if (trunkSelected.endpoint_sip) {
          const res = await endpointTypeGet("sip", trunkSelected.endpoint_sip);
  
          res.transport = updateTransport(res.transport);
          res.templates = updateTemplates(res.templates);
  
          trunkSelected.endpoint_sip = res;
        }
  
        if (trunkSelected.endpoint_custom) {
          const res = await endpointTypeGet("custom", trunkSelected.endpoint_custom);
  
          trunkSelected.endpoint_custom = res;
        }
  
        if (trunkSelected.endpoint_iax) {
          const res = await endpointTypeGet("iax", trunkSelected.endpoint_iax);
          if (trunkSelected.register_iax) {
            const register = await registersIaxGet(trunkSelected.register_iax)
            trunkSelected.register = register
          }
  
          trunkSelected.endpoint_iax = res;
        }
  
        setTrunk(trunkSelected);
      }
    };
  
    fetchItems();
  }, []);

  // context form
  const [context, setContext] = useState(() => {
    if (trunkSelected.context) {
      const matchedContext = contexts.items.find(
        (item) => item.name === trunkSelected.context
      );
      if (matchedContext) {
        return { name: trunkSelected.context, label: matchedContext.label };
      }
    }
    return null;
  });
  
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

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await trunkUpdate(trunk, trunkSelected);
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
      title={t("trunks.edit.title", {
        name: trunk?.endpoint_sip?.label || trunk?.endpoint_custom?.interface || trunk?.endpoint_iax?.name || "",
      })}
      setSelectedComponent={setSelectedComponent}
      route="trunks"
      submit={submit}
      isEdit
      hasTabs={!trunk?.endpoint_custom}
      errors={errors}
      loading={loading}
    >
      {trunk && trunk.endpoint_sip && (
        <TrunkSipForm trunk={trunk} setTrunk={setTrunk} context={context} setContext={setContext} />
      )}
      {trunk && trunk.endpoint_custom && (
        <TrunkCustomform trunk={trunk} setTrunk={setTrunk} context={context} setContext={setContext} />
      )}
      {trunk && trunk.endpoint_iax && (
        <TrunkIaxForm trunk={trunk} setTrunk={setTrunk} context={context} setContext={setContext} />
      )}
    </TemplatePage>
  );
};

export default TrunkEdit;
