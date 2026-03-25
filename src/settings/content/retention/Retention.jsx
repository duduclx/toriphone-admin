import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toaster } from "../../../components/ui/toaster";

import { useApis } from "../../../ApiProvider";

import TemplatePage from "../../templates/TemplatePage";
import RetentionForm from "./content/RetentionForm";

const Retention = () => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { retention, retentionGet, retentionUpdate } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // value
  const [item, setItem] = useState({});

  // load
  useEffect(() => {
    retentionGet();
  }, []);

  // update initial value
  useEffect(() => {
    setItem(retention);
  }, [retention]);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await retentionUpdate(item);
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
        colorPalette: "red"
      });
    }
  };

  return (
    <TemplatePage
      title={t("retention.title")}
      route={"none"}
      isEdit
      hasNoAdd
      errors={errors}
      loading={loading}
      submit={submit}
    >
      <RetentionForm item={item} setItem={setItem} />
    </TemplatePage>
  );
};

export default Retention;
