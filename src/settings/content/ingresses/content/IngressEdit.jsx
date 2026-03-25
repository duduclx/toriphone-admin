import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplatePage from "../../../templates/TemplatePage";
import IngressForm from "../forms/IngressForm";

const IngressEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { ingressEdit, ingressSelected } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [ingress, setIngress] = useState(ingressSelected);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await ingressEdit(ingress);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("ingresses");
    }
  };

  return (
    <TemplatePage
      title={t("ingresses.edit.title", { name: ingressSelected.uri })}
      setSelectedComponent={setSelectedComponent}
      route={"ingresses"}
      submit={submit}
      isCreate
      errors={errors}
      loading={loading}
    >
      <IngressForm ingress={ingress} setIngress={setIngress}/>
    </TemplatePage>
  );
};

export default IngressEdit;
