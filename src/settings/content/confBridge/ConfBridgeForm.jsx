import { Tabs } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import UserForm from "./forms/UserForm";
import BridgeForm from "./forms/BridgeForm";

const ConfBridgeForm = ({ userDefault, setUserDefault, bridgeDefault, setBridgeDefault }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <Tabs.Root defaultValue="user">
      <Tabs.List>
        <Tabs.Trigger value="user">{t("confbridge.default_user")}</Tabs.Trigger>
        <Tabs.Trigger value="bridge">{t("confbridge.default_bridge")}</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content width="50%" m="auto" value="user">
        {userDefault?.options && <UserForm userDefault={userDefault} setUserDefault={setUserDefault} />}
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="bridge">
        {bridgeDefault?.options && <BridgeForm bridgeDefault={bridgeDefault} setBridgeDefault={setBridgeDefault} />}
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default ConfBridgeForm;
