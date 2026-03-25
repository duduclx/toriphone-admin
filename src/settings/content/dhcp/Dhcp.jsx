import { useEffect, useState } from "react";
import { toaster } from "../../../components/ui/toaster";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../ApiProvider";

import TemplatePage from "../../templates/TemplatePage";
import DhcpForm from "./DhcpForm";

const Dhcp = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { dhcp, setDhcp, dhcpGet, dhcpEdit } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  useEffect(() => {
    dhcpGet();
  }, []);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await dhcpEdit(dhcp);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.error });
    } else {
      setLoading(false);
      toaster.create({
        title: t("dhcp.success.title"),
        description: t("dhcp.success.description"),
        type: "success",
        duration: 4000,
        closable: true,
      });
    }
  };

  return (
    <TemplatePage
      title={t("dhcp.list.title")}
      setSelectedComponent={setSelectedComponent}
      errors={errors}
      loading={loading}
      submit={submit}
      route={"none"}
      isEdit
      hasNoAdd
    >
      {dhcp && <DhcpForm dhcp={dhcp} setDhcp={setDhcp} />}
    </TemplatePage>
  );
};

export default Dhcp;
