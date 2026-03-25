import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplatePage from "../../../templates/TemplatePage";
import siptransportsOptions from "../helper/SiptransportsOptions";

import SiptransportForm from "../forms/SiptransportForm";

const SiptransportCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { sipTransportAdd } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [transport, setTransport] = useState({ name: "", options: [[siptransportsOptions[0], ""]] });

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
      title={t("sipTransports.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"siptransports"}
      submit={submit}
      isCreate
      errors={errors}
      loading={loading}
    >
      <SiptransportForm transport={transport} setTransport={setTransport}/>
    </TemplatePage>
  );
};

export default SiptransportCreate;
