import { useState } from "react";

export const useProvdPlugins = ({ apiClient }) => {

  // values
  const [provdPluginMgr, setProvdPluginMgr] = useState({});
  const [provdPluginService, setProvdPluginService] = useState({});
  const [provdPluginsInstallable, setProvdPluginsInstallable] = useState({});
  const [provdPluginsInstalled, setProvdPluginsInstalled] = useState({});
  const [provdPlugins, setProvdPlugins] = useState({});
  const [provdPluginSelected, setProvdPluginSelected] = useState({});

  // functions
  const provdPluginMgrGet = async () => {
    const res = await apiClient.client.get(`provd/0.2/pg_mgr`);
    setProvdPluginMgr(res);
    return res;
  };

  const provdPluginServiceGet = async () => {
    const res = await apiClient.client.get(`provd/0.2/pg_mgr/install`);
    setProvdPluginService(res);
    return res;
  };

  const provdPluginsInstallableGet = async () => {
    apiClient.client.setFetchOptions({
      headers: {
        "Accept": "application/vnd.proformatique.provd+json",
      },
    })
    const res = await apiClient.client.get(`provd/0.2/pg_mgr/install/installable`);
    setProvdPluginsInstallable(res);
    return res;
  };

  const provdPluginsInstallableUpdate = async () => {
    await apiClient.client.post(`provd/0.2/pg_mgr/install/update`)
    return true
  }

  const provdPluginsInstallableUpdateOperationDelete = async (operation) => {
    const operationId = operation.id
    await apiClient.client.delete(`provd/0.2/pg_mgr/install/update/${operationId}`)
    return true
  }

  const provdPluginsInstallableUpdateOperationGetStatus = async (operation) => {
    const operationId = operation.id
    await apiClient.client.get(`provd/0.2/pg_mgr/install/update/${operationId}`)
    return true
  }

  const provdPluginsInstalledGet = async () => {
    apiClient.client.setFetchOptions({
      headers: {
        "Accept": "application/vnd.proformatique.provd+json",
      },
    })
    const res = await apiClient.client.get(`provd/0.2/pg_mgr/install/installed`);
    setProvdPluginsInstalled(res);
    return res;
  };

  const provdPluginInstall = async (plugin) => {
    const pluginId = plugin.name
    apiClient.client.setFetchOptions({
      headers: {
        "Accept": "application/vnd.proformatique.provd+json",
        "Content-Type": "application/vnd.proformatique.provd+json",
      },
    });
    try {
      const res = await apiClient.client.post(`provd/0.2/pg_mgr/install/install`, {id: pluginId});
      return res;
    } catch (e) {
      return e;
    }
  };

  const provdPluginInstallOperationDelete = async (operation) => {
    const operationId = operation.id
    try {
      const res = await apiClient.client.delete(`provd/0.2/pg_mgr/install/install/${operationId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const provdPluginInstallOperationGetStatus = async (operation) => {
    const operationId = operation.id
    try {
      const res = await apiClient.client.get(`provd/0.2/pg_mgr/install/install/${operationId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const provdPluginUninstall = async (plugin) => {
    const pluginId = plugin.name
    apiClient.client.setFetchOptions({
      headers: {
        "Accept": "application/vnd.proformatique.provd+json",
        "Content-Type": "application/vnd.proformatique.provd+json",
      },
    });
    try {
      const res = await apiClient.client.post(`provd/0.2/pg_mgr/install/uninstall`, {id: pluginId});
      return res;
    } catch (e) {
      return e;
    }
  };

  const provdPluginUpgrade = async (plugin) => {
    try {
      const res = await apiClient.client.post(`provd/0.2/pg_mgr/install/upgrade`, plugin);
      return res;
    } catch (e) {
      return e;
    }
  };

  const provdPluginUpgradeOperationGetStatus = async (operation) => {
    const operationId = operation.id
    try {
      const res = await apiClient.client.get(`provd/0.2/pg_mgr/install/upgrade/${operationId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const provdPluginUpgradeOperationDelete = async (operation) => {
    const operationId = operation.id
    try {
      const res = await apiClient.client.delete(`provd/0.2/pg_mgr/install/upgrade/${operationId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const provdPluginsGet = async () => {
    apiClient.client.setFetchOptions({
      headers: {
        "Accept": "application/vnd.proformatique.provd+json",
      },
    })
    const res = await apiClient.client.get(`provd/0.2/pg_mgr/plugins`)
    setProvdPlugins(res)
    return res
  }

  const provdPluginGet = async (plugin) => {
    const pluginId = plugin.id
    try {
      const res = await apiClient.client.get(`provd/0.2/pg_mgr/plugins/${pluginId}`)
      return res
    } catch (e) {
      return e
    }
  }

  const provdPluginGetInfo = async (plugin) => {
    const pluginId = plugin.id
    try {
      const res = await apiClient.client.get(`provd/0.2/pg_mgr/plugins/${pluginId}/info`)
      return res
    } catch (e) {
      return e
    }
  }

  const provdPluginGetPackage = async (plugin) => {
    const pluginId = plugin.id
    try {
      const res = await apiClient.client.get(`provd/0.2/pg_mgr/plugins/${pluginId}/install`)
      return res
    } catch (e) {
      return e
    }
  }

  const provdPluginPackageAdd = async (plugin, pkg) => {
    const pluginId = plugin.id
    try {
      const res = await apiClient.client.post(`provd/0.2/pg_mgr/plugins/${pluginId}/install/install`, pkg)
      return res
    } catch (e) {
      return e
    }
  }

  const provdPluginPackageOperationGet = async (plugin, operation) => {
    const pluginId = plugin.id
    const operationId = operation.id
    try {
      const res = await apiClient.client.get(`provd/0.2/pg_mgr/plugins/${pluginId}/install/install/${operationId}`)
      return res
    } catch (e) {
      return e
    }
  }

  const provdPluginPackageOperationDelete = async (plugin, operation) => {
    const pluginId = plugin.id
    const operationId = operation.id
    try {
      const res = await apiClient.client.delete(`provd/0.2/pg_mgr/plugins/${pluginId}/install/install/${operationId}`)
      return res
    } catch (e) {
      return e
    }
  }

  const provdPluginPackageInstallable = async (plugin) => {
    const pluginId = plugin.id
    apiClient.client.setFetchOptions({
      headers: {
        "Accept": "application/vnd.proformatique.provd+json",
      },
    })
    try {
      const res = await apiClient.client.get(`provd/0.2/pg_mgr/plugins/${pluginId}/install/installable`)
      return res
    } catch (e) {
      return e
    }
  }

  const provdPluginPackageInstalled = async (plugin) => {
    apiClient.client.setFetchOptions({
      headers: {
        "Accept": "application/vnd.proformatique.provd+json",
      },
    })
    const pluginId = plugin.id
    try {
      const res = await apiClient.client.get(`provd/0.2/pg_mgr/plugins/${pluginId}/install/installed`)
      return res
    } catch (e) {
      return e
    }
  }

  const provdPluginPackageDelete = async (plugin, pkg) => {
    const pluginId = plugin.id
    try {
      const res = await apiClient.client.post(`provd/0.2/pg_mgr/plugins/${pluginId}/install/uninstall`, pkg)
      return res
    } catch (e) {
      return e
    }
  }

  const provdPluginPackageUpgradeOperationGet = async (plugin, operation) => {
    const pluginId = plugin.id
    const operationId = operation.id
    try {
      const res = await apiClient.client.get(`provd/0.2/pg_mgr/plugins/${pluginId}/install/upgrade/${operationId}`)
      return res
    } catch (e) {
      return e
    }
  }

  const provdPluginPackageUpgradeOperationDelete = async (plugin, operation) => {
    const pluginId = plugin.id
    const operationId = operation.id
    try {
      const res = await apiClient.client.delete(`provd/0.2/pg_mgr/plugins/${pluginId}/install/upgrade/${operationId}`)
      return res
    } catch (e) {
      return e
    }
  }

  const provdPluginReload = async (plugin) => {
    try {
      const res = await apiClient.client.post(`provd/0.2/pg_mgr/reload`, plugin)
      return res
    } catch (e) {
      return e
    }
  }

  return {
    provdPluginMgr,
    setProvdPluginMgr,
    provdPluginService,
    setProvdPluginService,
    provdPluginsInstallable,
    setProvdPluginsInstallable,
    provdPluginsInstalled,
    setProvdPluginsInstalled,
    provdPlugins,
    setProvdPlugins,
    provdPluginSelected,
    setProvdPluginSelected,
    provdPluginMgrGet,
    provdPluginServiceGet,
    provdPluginsInstallableGet,
    provdPluginsInstallableUpdate,
    provdPluginsInstallableUpdateOperationDelete,
    provdPluginsInstallableUpdateOperationGetStatus,
    provdPluginsInstalledGet,
    provdPluginInstall,
    provdPluginInstallOperationDelete,
    provdPluginInstallOperationGetStatus,
    provdPluginUninstall,
    provdPluginUpgrade,
    provdPluginUpgradeOperationGetStatus,
    provdPluginUpgradeOperationDelete,
    provdPluginsGet,
    provdPluginGet,
    provdPluginGetInfo,
    provdPluginGetPackage,
    provdPluginPackageAdd,
    provdPluginPackageOperationGet,
    provdPluginPackageOperationDelete,
    provdPluginPackageInstallable,
    provdPluginPackageInstalled,
    provdPluginPackageDelete,
    provdPluginPackageUpgradeOperationGet,
    provdPluginPackageUpgradeOperationDelete,
    provdPluginReload
  };
};
