import { Tabs } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import ConfigForm from "./forms/ConfigForm";
import NetForm from "./forms/NetForm";

const ProvisioningForm = ({ configs, setConfigs, network, setNetwork }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <Tabs.Root defaultValue="general">
      <Tabs.List>
        <Tabs.Trigger value="general">{t("provisioning.general")}</Tabs.Trigger>
        <Tabs.Trigger value="advanced">{t("provisioning.advanced")}</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content width="50%" m="auto" value="general">
        {configs?.params && <ConfigForm configs={configs} setConfigs={setConfigs} />}
      </Tabs.Content>
      
      <Tabs.Content width="50%" m="auto" value="advanced">
        {network?.provision_http_port && <NetForm network={network} setNetwork={setNetwork} />}
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default ProvisioningForm;
