import { useState } from "react";
import { NativeSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import ExternalMobile from "./ExternalMobile";
import ExternalOthers from "./ExternalOthers";
import TemplatePage from "../../../templates/TemplatePage";
import FormContainer from "../../../templates/forms/FormContainer";

const ExternalCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { externalServices, externalAdd } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [external, setExternal] = useState({
    type: externalServices[0] || null,
  });

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await externalAdd(external.type, external);
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
      title={t("external.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"externals"}
      submit={submit}
      isCreate
      errors={errors}
      loading={loading}
    >
      <FormContainer>
        <NativeSelectUi value={external.type} onChange={(e) => setExternal({ ...external, type: e.target.value })}>
          {externalServices.map((service, index) => (
            <option key={index}>{service}</option>
          ))}
        </NativeSelectUi>
        {external.type === "mobile" ? (
          <ExternalMobile external={external} setExternal={setExternal} />
        ) : (
          <ExternalOthers external={external} setExternal={setExternal} />
        )}
      </FormContainer>
    </TemplatePage>
  );
};

export default ExternalCreate;
