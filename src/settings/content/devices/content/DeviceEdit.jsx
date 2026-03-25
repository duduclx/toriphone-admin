import { useEffect, useState } from "react";
import { Flex, Field } from "@chakra-ui/react";
import { CheckboxUi, InputUi, NativeSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplatePage from "../../../templates/TemplatePage";
import FormContainer from "../../../templates/forms/FormContainer";

const DeviceEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const {
    deviceSelected,
    deviceEdit,
    provdCfgmgrConfig,
    provdConfigMgrConfigsGet,
    provdPluginsInstalled,
    provdPluginsInstalledGet,
  } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [device, setDevice] = useState(deviceSelected);

  // config list
  const [configs, setConfigs] = useState(null);
  useEffect(() => {
    if (provdCfgmgrConfig.configs) {
      const configs = provdCfgmgrConfig.configs.filter((item) => item.X_type === "device");
      setConfigs(configs);
    }
  }, [provdCfgmgrConfig]);

  // plugin list
  const [plugins, setPlugins] = useState(null);
  useEffect(() => {
    if (provdPluginsInstalled.pkgs) {
      const pluginOptions = Object.keys(provdPluginsInstalled.pkgs).map((key) => ({
        label: key,
        value: key,
      }));
      setPlugins(pluginOptions);
    }
  }, [provdPluginsInstalled]);

  useEffect(() => {
    provdConfigMgrConfigsGet();
    provdPluginsInstalledGet();
  }, []);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await deviceEdit(device);
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
      title={t("devices.edit.title", { name: deviceSelected.ip })}
      setSelectedComponent={setSelectedComponent}
      route={"devices"}
      submit={submit}
      isEdit
      errors={errors}
      loading={loading}
    >
      <Flex justifyContent="space-between" gap="4">
        <FormContainer>
          <Field.Root>
            <Field.Label>{t("devices.ip")}:</Field.Label>
            <InputUi
              required
              placeholder={t("devices.ip")}
              value={device.ip || ""}
              onChange={(e) => setDevice({ ...device, ip: e.target.value })}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("devices.mac")} :</Field.Label>
            <InputUi
              required
              placeholder={t("devices.mac")}
              value={device.mac || ""}
              onChange={(e) => setDevice({ ...device, mac: e.target.value })}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("common.description")} :</Field.Label>
            <InputUi
              required
              placeholder={t("common.description")}
              value={device.description || ""}
              onChange={(e) => setDevice({ ...device, description: e.target.value })}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("devices.config")} :</Field.Label>
            {configs && (
              <NativeSelectUi
                value={device.template_id}
                onChange={(e) => setDevice({ ...device, template_id: e.target.value })}
              >
                {configs.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </NativeSelectUi>
            )}
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("devices.plugin")} :</Field.Label>
            {plugins && (
              <NativeSelectUi value={device.plugin} onChange={(e) => setDevice({ ...device, plugin: e.target.value })}>
                {plugins.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </NativeSelectUi>
            )}
          </Field.Root>
          <CheckboxUi
            checked={device.options?.switchboard}
            onCheckedChange={(e) => setDevice({ ...device, options: { switchboard: e.checked } })}
          >
            {t("devices.switchboard")}
          </CheckboxUi>
        </FormContainer>
        <FormContainer>
          <Field.Root>
            <Field.Label>{t("devices.status")} :</Field.Label>
            <InputUi disabled value={device.status} />
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("devices.model")} :</Field.Label>
            <InputUi disabled value={device.model} />
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("devices.vendor")} :</Field.Label>
            <InputUi disabled value={device.vendor} />
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("devices.version")} :</Field.Label>
            <InputUi disabled value={device.version} />
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("devices.serial")} :</Field.Label>
            <InputUi disabled value={device.sn} />
          </Field.Root>
        </FormContainer>
      </Flex>
    </TemplatePage>
  );
};

export default DeviceEdit;
