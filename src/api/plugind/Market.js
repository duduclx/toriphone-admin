import { useState } from "react";

export const useMarket = ({ apiClient }) => {

  // values
  const [marketPlugins, setMarketPlugins] = useState({});
  const [marketPlugin, setMarketPlugin] = useState({});

  // functions
  const marketPluginsGet = async () => {
    const plugins = await apiClient.client.get("plugind/0.2/market");
    setMarketPlugins(plugins);
    return plugins;
  };

  const marketPluginGet = async (namespace, name) => {
    const plugin = await apiClient.client.get(`plugind/0.2/market/${namespace}/${name}`);
    setMarketPlugin(plugin);
    return plugin;
  };

  return {
    marketPlugins,
    setMarketPlugins,
    marketPluginsGet,
    marketPlugin,
    setMarketPlugin,
    marketPluginGet
  }
}

