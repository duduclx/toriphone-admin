import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toaster } from "../../../components/ui/toaster";

// applicationmap
//https://docs.asterisk.org/Configuration/Features/Custom-Dynamic-Features/

import { useApis } from "../../../ApiProvider";

import TemplatePage from "../../templates/TemplatePage";
import FeaturesForm from "./FeaturesForm";

const Features = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // api
  const {
    asteriskFeaturesApplicationmapGet,
    asteriskFeaturesApplicationmapEdit,
    asteriskFeaturesFeaturemapGet,
    asteriskFeaturesFeaturemapEdit,
    asteriskFeaturesGeneralGet,
    asteriskFeaturesGeneralEdit,
    extensionsFeature,
    extensionsFeaturesGet,
    extensionsFeatureEdit
  } = useApis();

  // resources
  const [genmap, setGenmap] = useState(null);
  const [appmap, setAppmap] = useState(null);
  const [featmap, setFeatmap] = useState(null);
  const [exten, setExten] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const gen = await asteriskFeaturesGeneralGet();
      const genArray = Object.entries(gen.options);
      setGenmap({
        ...genmap,
        options: genArray,
      });
      const app = await asteriskFeaturesApplicationmapGet();
      const appArray = Object.entries(app.options);
      setAppmap({
        ...appmap,
        options: appArray,
      });
      const feat = await asteriskFeaturesFeaturemapGet();
      const featArray = Object.entries(feat.options);
      setFeatmap({
        ...featmap,
        options: featArray,
      });
      const ext = await extensionsFeaturesGet();
      setExten(ext);
    };
    fetch();
  }, []);

  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const genAsObject = {
      ...genmap,
      options: Object.fromEntries(genmap.options),
    };
    const gen = await asteriskFeaturesGeneralEdit(genAsObject);
    if (gen.error) {
      setLoading(false);
      setErrors({ title: gen.status, description: gen.error.reason[0] });
    }

    const appAsObject = {
      ...appmap,
      options: Object.fromEntries(appmap.options),
    };
    const app = await asteriskFeaturesApplicationmapEdit(appAsObject);
    if (app.error) {
      setLoading(false);
      setErrors({ title: app.status, description: app.error.reason[0] });
    }

    const featAsObject = {
      ...featmap,
      options: Object.fromEntries(featmap.options),
    };
    const feat = await asteriskFeaturesFeaturemapEdit(featAsObject);
    if (feat.error) {
      setLoading(false);
      setErrors({ title: feat.status, description: feat.error.reason[0] });
    }

    const updates = exten.items.filter((item, index) => {
      const feature = extensionsFeature.items[index];
      return item.enabled !== feature.enabled || item.exten !== feature.exten;
    });

    for (const item of updates) {
        const ext = await extensionsFeatureEdit(item);
        if(ext.error) {
          setLoading(false);
          setErrors({ title: ext.status, description: ext.message });
        }
    }

    if (!errors) {
      setLoading(false);
        toaster.create({
          title: t("features.success.title"),
          description: t("features.success.description"),
          type: "success",
          duration: 4000,
          closable: true,
        });
      }
  };

  return (
    <TemplatePage
      title={t("features.list.title")}
      setSelectedComponent={setSelectedComponent}
      errors={errors}
      loading={loading}
      submit={submit}
      route={"none"}
      isEdit
      hasNoAdd
      hasTabs
    >
      <FeaturesForm
        appmap={appmap}
        setAppmap={setAppmap}
        featmap={featmap}
        setFeatmap={setFeatmap}
        genmap={genmap}
        setGenmap={setGenmap}
        exten={exten}
        setExten={setExten}
      />
    </TemplatePage>
  );
};

export default Features;
