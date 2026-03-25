import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toaster } from "../../../components/ui/toaster";

import { useApis } from "../../../ApiProvider";

import TemplatePage from "../../templates/TemplatePage";
import IaxForm from "./IaxForm";

const Iax = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [general, setGeneral] = useState(null);
  const [limits, setLimits] = useState(null);

  // api
  const {
    asteriskIaxCallnumberlimitsGet,
    asteriskIaxCallnumberlimitsEdit,
    asteriskIaxGeneralGet,
    asteriskIaxGeneralEdit,
  } = useApis();

  useEffect(() => {
    const fetch = async () => {
      const gen = await asteriskIaxGeneralGet();
      const genArray = Object.entries(gen.options);
      setGeneral({
        ...general,
        options: genArray,
      });

      const lim = await asteriskIaxCallnumberlimitsGet();
      setLimits(lim);
    };
    fetch();
  }, []);

  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const genAsObject = {
      ...general,
      options: Object.fromEntries(general.options),
      ordered_options: [...general.options]
    };
    const gen = await asteriskIaxGeneralEdit(genAsObject);
    if (gen.error) {
      setLoading(false);
      setErrors({ title: gen.status, description: gen.error });
    }
    const lim = await asteriskIaxCallnumberlimitsEdit(limits);
    if (lim.error) {
      setLoading(false);
      setErrors({ title: lim.status, description: lim.error.reason[0] });
    }

    if (!gen.error && !lim.error) {
      setLoading(false);
      toaster.create({
        title: t("iax.success.title"),
        description: t("iax.success.description"),
        type: "success",
        duration: 4000,
        closable: true,
      });
    }
  };

  return (
    <TemplatePage
      title={t("iax.list.title")}
      setSelectedComponent={setSelectedComponent}
      errors={errors}
      loading={loading}
      submit={submit}
      route={"none"}
      isEdit
      hasNoAdd
      hasTabs
    >
      <IaxForm general={general} setGeneral={setGeneral} limits={limits} setLimits={setLimits} />
    </TemplatePage>
  );
};

export default Iax;
