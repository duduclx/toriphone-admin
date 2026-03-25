import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import ExternalMobile from "./ExternalMobile";
import ExternalOthers from "./ExternalOthers";
import TemplatePage from "../../../templates/TemplatePage";

const ExternalEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { externalSelected, externalEdit } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [external, setExternal] = useState(externalSelected);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await externalEdit(external.type, external);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.error_id, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("externals");
    }
  };

  return (
    <TemplatePage
      title={t("external.edit.title", { name: externalSelected.type })}
      setSelectedComponent={setSelectedComponent}
      route={"externals"}
      submit={submit}
      isEdit
      errors={errors}
      loading={loading}
    >
      {externalSelected.type === "mobile" ? (
        <ExternalMobile external={external} setExternal={setExternal} />
      ) : (
        <ExternalOthers external={external} setExternal={setExternal} />
      )}
    </TemplatePage>
  );
};

export default ExternalEdit;
