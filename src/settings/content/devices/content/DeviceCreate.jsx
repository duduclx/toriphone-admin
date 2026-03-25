import { useState } from "react";
import { Field } from "@chakra-ui/react";
import { CheckboxUi, InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplatePage from "../../../templates/TemplatePage";
import FormContainer from "../../../templates/forms/FormContainer";

const DeviceCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { deviceAdd } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [device, setDevice] = useState({
    options: { switchboard: false },
  });

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await deviceAdd(device);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("devices");
    }
  };

  return (
    <TemplatePage
      title={t("devices.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"devices"}
      submit={submit}
      isCreate
      errors={errors}
      loading={loading}
    >
      <FormContainer>
        <Field.Root>
          <Field.Label>{t("devices.ip")}:</Field.Label>
          <InputUi
            required
            placeholder={t("devices.ip")}
            value={device.ip}
            onChange={(e) => setDevice({ ...device, ip: e.target.value })}
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>{t("devices.mac")} :</Field.Label>
          <InputUi
            required
            placeholder={t("devices.mac")}
            value={device.mac}
            onChange={(e) => setDevice({ ...device, mac: e.target.value })}
          />
        </Field.Root>
        <CheckboxUi
          checked={device.options.switchboard}
          onCheckedChange={(e) => setDevice({ ...device, options: { switchboard: e.checked } })}
        >
          {t("devices.switchboard")}
        </CheckboxUi>
        <Field.Root>
          <Field.Label>{t("common.description")} :</Field.Label>
          <InputUi
            required
            placeholder={t("common.description")}
            value={device.description}
            onChange={(e) => setDevice({ ...device, description: e.target.value })}
          />
        </Field.Root>
      </FormContainer>
    </TemplatePage>
  );
};

export default DeviceCreate;
