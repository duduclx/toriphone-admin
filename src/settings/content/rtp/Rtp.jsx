import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toaster } from "../../../components/ui/toaster";

import { useApis } from "../../../ApiProvider";

import TemplatePage from "../../templates/TemplatePage";
import RtpForm from "./RtpForm";

const Rtp = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [rtp, setRtp] = useState(null);
  const [ice, setIce] = useState(null);

  // api
  const {
    asteriskRtpGeneralGet,
    asteriskRtpGeneralEdit,
    asteriskRtpIcehostcandidatesGet,
    asteriskRtpIcehostcandidatesEdit,
  } = useApis();

  useEffect(() => {
    const fetch = async () => {
      const rtp = await asteriskRtpGeneralGet();
      setRtp(rtp);
      const ice = await asteriskRtpIcehostcandidatesGet();
      // Transformer ice.options en tableau
      const iceOptionsArray = Object.entries(ice.options);

      setIce({
        ...ice,
        options: iceOptionsArray, 
      });
    };
    fetch();
  }, []);

  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const resRtp = await asteriskRtpGeneralEdit(rtp);
    if (resRtp.error) {
      setLoading(false);
      setErrors({ title: resRtp.status, description: resRtp.error.reason[0] });
    }
    // Transformer ice.options de tableau à objet
    const iceWithOptionsAsObject = {
      ...ice,
      options: Object.fromEntries(ice.options),
    };
    const resIce = await asteriskRtpIcehostcandidatesEdit(iceWithOptionsAsObject);
    if (resIce.error) {
      setLoading(false);
      setErrors({ title: resIce.status, description: resIce.error.reason[0] });
    }
    if (!resRtp.error && !resIce.error) {
      setLoading(false);
      toaster.create({
        title: t("rtp.success.title"),
        description: t("rtp.success.description"),
        type: "success",
        duration: 4000,
        closable: true,
      });
    }
  };

  return (
    <TemplatePage
      title={t("rtp.list.title")}
      setSelectedComponent={setSelectedComponent}
      errors={errors}
      loading={loading}
      submit={submit}
      route={"none"}
      isEdit
      hasNoAdd
      hasTabs
    >
      <RtpForm rtp={rtp} setRtp={setRtp} ice={ice} setIce={setIce} />
    </TemplatePage>
  );
};

export default Rtp;
