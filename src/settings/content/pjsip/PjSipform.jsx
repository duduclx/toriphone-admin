import { Tabs } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import GlobalForm from "./forms/GlobalForm";
import SystemForm from "./forms/SystemForm";

const PjSipform = ({ global, setGlobal, system, setSystem }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <Tabs.Root defaultValue="global">
      <Tabs.List>
        <Tabs.Trigger value="global">{t("pjsip.global")}</Tabs.Trigger>
        <Tabs.Trigger value="system">{t("pjsip.system")}</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content width="50%" m="auto" value="global">
        {global?.options && <GlobalForm global={global} setGlobal={setGlobal} />}
      </Tabs.Content>
      
      <Tabs.Content width="50%" m="auto" value="system">
        {system?.options && <SystemForm system={system} setSystem={setSystem} />}
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default PjSipform;
