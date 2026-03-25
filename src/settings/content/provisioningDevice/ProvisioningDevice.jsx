import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toaster } from "../../../components/ui/toaster";

import { useApis } from "../../../ApiProvider";

import TemplatePage from "../../templates/TemplatePage";
import ProvisioningDeviceForm from "./ProvisioningDeviceForm";

const ProvisioningDevice = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { asteriskVoicemailZonemessagesGet, provdConfigMgrConfigGet, provdConfigMgrConfigEdit } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // ressource
  const [config, setConfig] = useState({});
  const [timezones, setTimeszones] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const conf = await provdConfigMgrConfigGet("defaultconfigdevice");
      setConfig(conf);
      const tz = await asteriskVoicemailZonemessagesGet();
      const timezones = tz.items.map((item) => ({
        value: item.name,
        label: item.timezone,
      }));
      setTimeszones(timezones);
    };
    fetch();
  }, []);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await provdConfigMgrConfigEdit(config);
    if (res.status) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      toaster.create({
        title: t("provisioningDevice.success.title"),
        description: t("provisioningDevice.success.description"),
        type: "success",
        duration: 4000,
        closable: true,
      });
    }
  };

  return (
    <TemplatePage
      title={t("provisioningDevice.list.title")}
      setSelectedComponent={setSelectedComponent}
      errors={errors}
      loading={loading}
      submit={submit}
      route={"none"}
      isEdit
      hasTabs
      hasNoAdd
    >
      <ProvisioningDeviceForm config={config} setConfig={setConfig} timezones={timezones} />
    </TemplatePage>
  );
};

export default ProvisioningDevice;
