import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toaster } from "../../../components/ui/toaster";

import { useApis } from "../../../ApiProvider";

import TemplatePage from "../../templates/TemplatePage";
import PjSipform from "./PjSipform";

const PjSip = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [global, setGlobal] = useState(null);
  const [system, setSystem] = useState(null);

  // api
  const { 
    asteriskPjsipGlobalGet,
    asteriskPjsipGlobalEdit,
    asteriskPjsipSystemGet,
    asteriskPjsipSystemEdit
  } = useApis();

  useEffect(() => {
    const fetch = async () => {
      const glob = await asteriskPjsipGlobalGet();
      const globArray = Object.entries(glob.options);
      setGlobal({
        ...global,
        options: globArray,
      });

      const sys = await asteriskPjsipSystemGet();
      const sysArray = Object.entries(sys.options);
      setSystem({
        ...sys,
        options: sysArray,
      });
    };
    fetch();
  }, []);

  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const globAsObject = {
      ...global,
      options: Object.fromEntries(global.options),
    };
    const glob = await asteriskPjsipGlobalEdit(globAsObject);
    if (glob.error) {
      setLoading(false);
      setErrors({ title: glob.status, description: glob.error.reason[0] });
    }
    // Transformer ice.options de tableau à objet
    const sysAsObject = {
      ...system,
      options: Object.fromEntries(system.options),
    };
    const sys = await asteriskPjsipSystemEdit(sysAsObject);
    if (sys.error) {
      setLoading(false);
      setErrors({ title: sys.status, description: sys.error.reason[0] });
    }
    if (!glob.error && !sys.error) {
      setLoading(false);
      toaster.create({
        title: t("pjsip.success.title"),
        description: t("pjsip.success.description"),
        type: "success",
        duration: 4000,
        closable: true,
      });
    }
  };

  return (
    <TemplatePage
      title={t("pjsip.list.title")}
      setSelectedComponent={setSelectedComponent}
      errors={errors}
      loading={loading}
      submit={submit}
      route={"none"}
      isEdit
      hasNoAdd
      hasTabs
    >
      <PjSipform global={global} setGlobal={setGlobal} system={system} setSystem={setSystem} />
    </TemplatePage>
  );
};

export default PjSip;
