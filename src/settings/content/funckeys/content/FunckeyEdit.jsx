import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";
import FunckeyForm from "../forms/FunckeyForm";

const FunckeyEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { funckeyTemplateSelected, funckeysTemplateEdit } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [funckeys, setFunckeys] = useState([]);

  useEffect(() => {
    const update = async () => {
      const keysArray = Object.entries(funckeyTemplateSelected.keys).map(([position, key]) => ({
        ...key,
        position: parseInt(position),
      }));

      setFunckeys(keysArray);
    };
    update();
  }, [funckeyTemplateSelected]);

  // funckeys form
  const [fk, setFk] = useState({
    name: funckeyTemplateSelected.name,
    id: funckeyTemplateSelected.id,
  });

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const fks = {
      name: fk.name,
      id: fk.id,
      keys: funckeys.reduce((acc, funckey) => {
        acc[funckey.position] = funckey;
        return acc;
      }, {}),
    };
    const res = await funckeysTemplateEdit(fks);
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
      title={t("funckeys.edit.title", { name: funckeyTemplateSelected.name })}
      setSelectedComponent={setSelectedComponent}
      route={"funckeys"}
      submit={submit}
      isEdit
      hasTabs
      errors={errors}
      loading={loading}
    >
      <FunckeyForm fk={fk} setFk={setFk} funckeys={funckeys} setFunckeys={setFunckeys}/>
    </TemplatePage>
  );
};

export default FunckeyEdit;
