import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toaster } from "../../../components/ui/toaster";

import { useApis } from "../../../ApiProvider";

import TemplatePage from "../../templates/TemplatePage";
import ProvisioningForm from "./ProvisioningForm";

const Provisioning = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { provdConfigs, provdConfigGet, provdConfigParamEdit, provisioningNetworking,
    provisioningNetworkingGet,
    provisioningNetworkingEdit, } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // ressource
  const [configs, setConfigs] = useState({});
  const [network, setNetwork] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const conf = await provdConfigGet();
      setConfigs(conf);
      const net = await provisioningNetworkingGet()
      setNetwork(net)
    };
    fetch();
  }, []);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    let hasErrors = false;
    // Compare les paramètres et récupère ceux qui ont changé
    const updates = configs.params.filter((item, index) => {
      return item.value !== provdConfigs.params[index]?.value;
    });

    // Pour chaque paramètre modifié, appelez `provdConfigParamEdit`
    for (const item of updates) {
      const res = await provdConfigParamEdit(item);
      if (res.status) {
        hasErrors = true;
        setLoading(false);
        setErrors({ title: res.status, description: res.message });
      }
    }

    // network
    const net = await provisioningNetworkingEdit(network)
    if (net.status) {
      hasErrors = true;
      setLoading(false);
      setErrors({ title: net.status, description: net.message });
    }

    // Affiche un message de succès si tout s'est bien passé
    if (!hasErrors) {
      setLoading(false);
      toaster.create({
        title: t("provisioning.success.title"),
        description: t("provisioning.success.description"),
        type: "success",
        duration: 4000,
        closable: true,
      });
    }
  };

  return (
    <TemplatePage
      title={t("provisioning.list.title")}
      setSelectedComponent={setSelectedComponent}
      errors={errors}
      loading={loading}
      submit={submit}
      route={"none"}
      isEdit
      hasTabs
      hasNoAdd
    >
      <ProvisioningForm configs={configs} setConfigs={setConfigs} network={network} setNetwork={setNetwork} />
    </TemplatePage>
  );
};

export default Provisioning;
