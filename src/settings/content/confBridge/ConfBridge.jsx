import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toaster } from "../../../components/ui/toaster";

import TemplatePage from "../../templates/TemplatePage";
import ConfBridgeForm from "./ConfBridgeForm";

import { useApis } from "../../../ApiProvider";

const ConfBridge = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // api
  const {
    asteriskConfbridgeWazoGet,
    asteriskConfbridgeWazoEdit,
    asteriskConfbridgeUserGet,
    asteriskConfbridgeUserEdit,
  } = useApis();

  const [userDefault, setUserDefault] = useState(null);
  const [bridgeDefault, setBridgeDefault] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const bridge = await asteriskConfbridgeWazoGet();
      setBridgeDefault(bridge);
      const user = await asteriskConfbridgeUserGet();
      setUserDefault(user);
    };

    fetch();
  }, []);

  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const bridge = await asteriskConfbridgeWazoEdit(bridgeDefault);
    if (bridge.error) {
      setLoading(false);
      setErrors({ title: bridge.status, description: bridge.error.reason[0] });
    }
    const user = await asteriskConfbridgeUserEdit(userDefault);
    if (user.error) {
      setLoading(false);
      setErrors({ title: user.status, description: user.error.reason[0] });
    }
    if (!bridge.error && !user.error) {
      setLoading(false);
      toaster.create({
        title: t("confbridge.success_title"),
        description: t("confbridge.success_description"),
        type: "success",
        duration: 4000,
        closable: true,
      });
    }
  };

  return (
    <TemplatePage
      title={t("confbridge.list.title")}
      setSelectedComponent={setSelectedComponent}
      errors={errors}
      loading={loading}
      submit={submit}
      route={"none"}
      isEdit
      hasNoAdd
      hasTabs
    >
      <ConfBridgeForm
        userDefault={userDefault}
        setUserDefault={setUserDefault}
        bridgeDefault={bridgeDefault}
        setBridgeDefault={setBridgeDefault}
      />
    </TemplatePage>
  );
};

export default ConfBridge;
