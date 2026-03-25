import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../ApiProvider";
import DevicesPluginsForm from "./DevicesPluginsForm";
import TemplatePage from "../../templates/TemplatePage";

const DevicesPlugins = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { provdPluginsInstallableGet, provdPluginsInstalledGet } = useApis();

  // filter
  const [filter, setFilter] = useState("");
  const [filtered, setFiltered] = useState([]);

  // errors
  const [errors, setErrors] = useState(null);

  // resource
  const [installable, setInstallable] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const installed = await provdPluginsInstalledGet();
      const installedArray = Object.entries(installed.pkgs).map(([key, value]) => ({
        name: key,
        ...value,
      }));
      const installable = await provdPluginsInstallableGet();
      const installableArray = Object.entries(installable.pkgs).map(([key, value]) => ({
        name: key,
        ...value,
        installed: installedArray.some((installedItem) => installedItem.name === key),
      }));
      setInstallable(installableArray);
    };
    fetch();
  }, []);

  return (
    <TemplatePage
      title={t("devicesPlugins.list.title")}
      setSelectedComponent={setSelectedComponent}
      errors={errors}
      route={"none"}
      hasNoAdd
      hasTabs
      isList
      filter={filter}
      setFilter={setFilter}
    >
      {installable.length > 0 && (
        <DevicesPluginsForm installable={installable} setInstallable={setInstallable} setErrors={setErrors} filter={filter} filtered={filtered} setFiltered={setFiltered}/>
      )}
    </TemplatePage>
  );
};

export default DevicesPlugins;
