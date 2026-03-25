import { useEffect } from "react";
import { Tabs, Text, Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import PluginsListMarket from "./PluginsListMarket";

import PluginCard from "../helpers/PluginCard";

const PluginsList = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { plugins, pluginsGet } = useApis();

  useEffect(() => {
    pluginsGet();
  }, []);

  return (
    <Tabs.Root defaultValue="installed">
      <Tabs.List>
        <Tabs.Trigger value="installed">{t("plugins.installed")}</Tabs.Trigger>
        <Tabs.Trigger value="market">{t("plugins.market")}</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="installed">
        {plugins?.items && (
          <>
            {plugins.items.length === 0 ? (
              <Text padding="8" textAlign="center">
                {t("common.no_result")}
              </Text>
            ) : (
              <Flex flex="1" flexDirection="row" gap="4" flexWrap="wrap">
                {plugins.items.map((plugin, index) => (
                  <PluginCard key={index} plugin={plugin} index={index} isInstalled />
                ))}
              </Flex>
            )}
          </>
        )}
      </Tabs.Content>

      <Tabs.Content value="market">
        <PluginsListMarket />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default PluginsList;
