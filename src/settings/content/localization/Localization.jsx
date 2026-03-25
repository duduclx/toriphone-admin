import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../ApiProvider";

import TemplatePage from "../../templates/TemplatePage";
import { toaster } from "../../../components/ui/toaster";
import LocalizationForm from "./LocalizationForm";

const Localization = () => {
  // requirements
  const { t } = useTranslation("admin");

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // value
  const [item, setItem] = useState({});

  // api
  const { localization, localizationGet, localizationUpdate } = useApis();

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await localizationUpdate(item);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
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

  // load
  useEffect(() => {
    localizationGet();
  }, []);

  // update value
  useEffect(() => {
    setItem(localization);
  }, [localization]);

  return (
    <TemplatePage title={t("localization.title")} route={"none"} isEdit hasNoAdd errors={errors} loading={loading} submit={submit}>
      <LocalizationForm item={item} setItem={setItem} />
    </TemplatePage>
  );
};

export default Localization;
