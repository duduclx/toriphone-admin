import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";
import FunckeyForm from "../forms/FunckeyForm";

const FunckeyCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { funckeysTemplateCreate } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [fk, setFk] = useState({
    name: "",
  });

  // funckeys form
  const [funckeys, setFunckeys] = useState([]);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const fks = {
      name: fk.name,
      keys: funckeys.reduce((acc, funckey) => {
        acc[funckey.position] = funckey;
        return acc;
      }, {}),
    };
    const res = await funckeysTemplateCreate(fks);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("funckeys");
    }
  };

  return (
    <TemplatePage
      title={t("funckeys.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"funckeys"}
      submit={submit}
      isCreate
      hasTabs
      errors={errors}
      loading={loading}
    >
      <FunckeyForm fk={fk} setFk={setFk} funckeys={funckeys} setFunckeys={setFunckeys}/>
    </TemplatePage>
  );
};

export default FunckeyCreate;
