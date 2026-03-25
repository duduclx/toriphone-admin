import { useState } from "react";
import { Field } from "@chakra-ui/react";
import { InputUi, NativeSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import ContextsHelper from "./helper/ContextsHelper";
import TemplatePage from "../../../templates/TemplatePage";
import FormContainer from "../../../templates/forms/FormContainer";

const ContextCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // helper
  const { typeOptions } = ContextsHelper();

  // api
  const { contextAdd } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [newContext, setNewContext] = useState({
    label: "",
    description: "",
    type: typeOptions[0].value,
  });

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await contextAdd(newContext);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("contexts");
    }
  };

  return (
    <TemplatePage
      title={t("contexts.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"contexts"}
      submit={submit}
      isCreate
      errors={errors}
      loading={loading}
    >
      <FormContainer>
        <Field.Root>
          <Field.Label>{t("common.name")} :</Field.Label>
          <InputUi
            required
            placeholder={t("common.name")}
            value={newContext.label}
            onChange={(e) => setNewContext({ ...newContext, label: e.target.value })}
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>{t("common.description")} :</Field.Label>
          <InputUi
            placeholder={t("common.description")}
            value={newContext.description}
            onChange={(e) => setNewContext({ ...newContext, description: e.target.value })}
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>{t("common.mode")} :</Field.Label>
            <NativeSelectUi
              value={newContext.type}
              onChange={(e) => setNewContext({ ...newContext, type: e.target.value })}
            >
              {typeOptions.map((type, index) => (
                <option value={type.value} key={index}>
                  {type.label}
                </option>
              ))}
            </NativeSelectUi>
        </Field.Root>
      </FormContainer>
    </TemplatePage>
  );
};

export default ContextCreate;
