import { Tabs } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import ConfigForm from "./forms/ConfigForm";
import AdvancedForm from "./forms/AdvancedForm";

const ProvisioningDeviceForm = ({ config, setConfig, timezones }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <Tabs.Root defaultValue="general">
      <Tabs.List>
        <Tabs.Trigger value="general">{t("provisioningDevice.general")}</Tabs.Trigger>
        <Tabs.Trigger value="advanced">{t("provisioningDevice.advanced")}</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content width="50%" m="auto" value="general">
        {config?.config && <ConfigForm config={config} setConfig={setConfig} timezones={timezones} />}
      </Tabs.Content>
      
      <Tabs.Content width="50%" m="auto" value="advanced">
        {config?.config && <AdvancedForm config={config} setConfig={setConfig} />}
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default ProvisioningDeviceForm;
