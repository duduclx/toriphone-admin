import { useState } from "react";
import { Field } from "@chakra-ui/react";
import { InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplatePage from "../../../templates/TemplatePage";

const SoundCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { soundCategoryAdd } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [sound, setSound] = useState({ name: null });

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await soundCategoryAdd(sound);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("sounds");
    }
  };

  return (
    <TemplatePage
      title={t("sounds.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"sounds"}
      submit={submit}
      isCreate
      errors={errors}
      loading={loading}
    >
      <Field.Root>
        <Field.Label>{t("common.name")} :</Field.Label>
        <InputUi
          required
          placeholder={t("common.name")}
          value={sound.name}
          onChange={(e) => setSound({ name: e.target.value })}
        />
      </Field.Root>
    </TemplatePage>
  );
};

export default SoundCreate;
