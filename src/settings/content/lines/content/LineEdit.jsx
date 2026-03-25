import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";

import LineEditSip from "./LineEditSip";
import LineEditSccp from "./LineEditSccp";
import LineEditCustom from "./LineEditCustom";

const LineEdit = ({ setSelectedComponent }) => {
  //requirements
  const { t } = useTranslation("admin");

  // api
  const { contextsGet, lineSelected, lineEdit, endpointTypeGet, endpointTypeEdit } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  const [contextsOptions, setContextsOptions] = useState(null);

  useEffect(() => {
    const fetchContext = async () => {
      const res = await contextsGet();
      const internals = res.items.filter((item) => item.type === "internal");
      setContextsOptions(internals);
    };
    fetchContext();
  }, []);

  // resource
  const [line, setLine] = useState({
    caller_id_name: lineSelected.caller_id_name,
    caller_id_num: lineSelected.caller_id_num,
    context: lineSelected.context,
    id: lineSelected.id,
    position: lineSelected.position,
    protocol: lineSelected.protocol,
    provisioning_code: lineSelected.provisioning_code,
    registrar: lineSelected.registrar,
    name: lineSelected.name
  });

  const [endpointSip, setEndpointSip] = useState(null);

  useEffect(() => {
    const endpoint = async () => {
      const lineEndpoint =
        lineSelected.protocol === "sip"
          ? lineSelected.endpoint_sip
          : lineSelected.protocol === "sccp"
          ? lineSelected.endpoint_sccp
          : lineSelected.endpoint_custom;
      const res = await endpointTypeGet(lineSelected.protocol, lineEndpoint);
      setEndpointSip(res);
    };
    endpoint();
  }, []);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    // editline
    let updatedLine;

    // retire les champs null pour éviter une erreur à la mise à jour de la line
    updatedLine = Object.fromEntries(Object.entries(line).filter(([key, value]) => value !== null));

    // mise à jour caller_id_num et caller_id_name si SCCP
    if (lineSelected.protocol === "sccp") {
      const { caller_id_name, caller_id_num, ...remainingLine } = line;
      updatedLine = remainingLine;
    }

    // Appeler `lineEdit` avec la version filtrée de `line`
    const res = await lineEdit(updatedLine);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
      return
    }

    const endpoint = await endpointTypeEdit(lineSelected.protocol, endpointSip);
    if (endpoint.error) {
      setLoading(false);
      setErrors({ title: endpoint.status, description: endpoint.message });
      return
    }

    // no errors
    setLoading(false);
    setSelectedComponent("lines");
  };

  return (
    <TemplatePage
      title={t("lines.edit.title", {
        name: lineSelected.endpoint_sip ? lineSelected.endpoint_sip.label : lineSelected.name,
      })}
      setSelectedComponent={setSelectedComponent}
      route={"lines"}
      submit={submit}
      isEdit
      hasTabs={line.protocol === "sip" ? true : false}
      errors={errors}
      loading={loading}
    >
      {lineSelected.protocol === "sip" && (
        <LineEditSip
          contextsOptions={contextsOptions}
          line={line}
          setLine={setLine}
          endpointSip={endpointSip}
          setEndpointSip={setEndpointSip}
        />
      )}
      {lineSelected.protocol === "sccp" && (
        <LineEditSccp
          contextsOptions={contextsOptions}
          line={line}
          setLine={setLine}
          endpointSip={endpointSip}
          setEndpointSip={setEndpointSip}
        />
      )}
      {lineSelected.protocol === "custom" && (
        <LineEditCustom
          contextsOptions={contextsOptions}
          line={line}
          setLine={setLine}
          endpointSip={endpointSip}
          setEndpointSip={setEndpointSip}
        />
      )}
    </TemplatePage>
  );
};

export default LineEdit;
