import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplatePage from "../../../templates/TemplatePage";

import SiptransportForm from "../forms/SiptransportForm";

const SiptransportEdit = ({ setSelectedComponent }) => {
   // requirements
  const { t } = useTranslation("admin");

  // api
  const { sipTransportSelected, sipTransportAdd } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [transport, setTransport] = useState(sipTransportSelected);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await sipTransportAdd(transport);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("siptransports");
    }
  };

  return (
    <TemplatePage
      title={t("sipTransports.edit.title", {name: sipTransportSelected.name})}
      setSelectedComponent={setSelectedComponent}
      route={"siptransports"}
      submit={submit}
      isEdit
      errors={errors}
      loading={loading}
    >
      <SiptransportForm transport={transport} setTransport={setTransport}/>
    </TemplatePage>
  );
}

export default SiptransportEdit