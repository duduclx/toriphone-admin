import { useState } from "react";

export const usePlugins = ({ apiClient }) => {

  // values
  const [plugins, setPlugins] = useState({});

  // functions
  const pluginsGet = async () => {
    try {
      const response = await fetch(`https://${apiClient.client.server}/api/plugind/0.2/plugins`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": apiClient.client.token,
        },
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw {
          status: response.status,
          statusText: response.statusText,
          message: `HTTP error! status: ${response.status}`,
          body: errorBody ? JSON.parse(errorBody) : null,
        };
      }

      const data = await response.json(); 
      setPlugins(data); 
      return data; 
    } catch (error) {
      if (error instanceof SyntaxError) {
        return {
          message: "Error parsing JSON from response",
          error,
        };
      }
      return error;
    }
  };

  const pluginGet = async (namespace, name) => {
    try {
      const res = await apiClient.client.get(`plugind/0.2/plugins/${namespace}/${name}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const pluginInstall = async (plugin) => {
    try {
      const response = await fetch(`https://${apiClient.client.server}/api/plugind/0.2/plugins`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": apiClient.client.token,
        },
        body: JSON.stringify(plugin),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw {
          status: response.status,
          statusText: response.statusText,
          message: `HTTP error! status: ${response.status}`,
          body: errorBody ? JSON.parse(errorBody) : null,
        };
      }

      const data = await response.json();
      return data; 
    } catch (error) {
      if (error instanceof SyntaxError) {
        return {
          message: "Error parsing JSON from response",
          error,
        };
      }
      return error;
    }
  };

  const pluginReinstall = async (plugin) => {
    try {
      const res = await apiClient.client.post("plugind/0.2/plugins?reinstall=true", plugin);
      return res;
    } catch (e) {
      return e;
    }
  };

  const pluginUninstall = async (namespace, name) => {
    try {
      const response = await fetch(`https://${apiClient.client.server}/api/plugind/0.2/plugins/${namespace}/${name}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": apiClient.client.token,
        },
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw {
          status: response.status,
          statusText: response.statusText,
          message: `HTTP error! status: ${response.status}`,
          body: errorBody ? JSON.parse(errorBody) : null,
        };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof SyntaxError) {
        return {
          message: "Error parsing JSON from response",
          error,
        };
      }
      return error;
    }
  };

  return {
    plugins,
    setPlugins,
    pluginsGet,
    pluginGet,
    pluginInstall,
    pluginReinstall,
    pluginUninstall,
  };
};
