import { Tabs } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import GenForm from "./forms/GenForm";
import AppForm from "./forms/AppForm";
import FeatForm from "./forms/FeatForm";
import ExtenForm from "./forms/ExtenForm";

const FeaturesForm = ({ genmap, setGenmap, appmap, setAppmap, featmap, setFeatmap, exten, setExten }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <Tabs.Root defaultValue="general">
      <Tabs.List>
        <Tabs.Trigger value="general">{t("features.general")}</Tabs.Trigger>
        <Tabs.Trigger value="app">{t("features.app")}</Tabs.Trigger>
        <Tabs.Trigger value="feat">{t("features.feat")}</Tabs.Trigger>
        <Tabs.Trigger value="extension">{t("features.exten")}</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content width="50%" m="auto" value="general">
        {genmap?.options && <GenForm genmap={genmap} setGenmap={setGenmap} />}
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="app">
        {appmap?.options && <AppForm appmap={appmap} setAppmap={setAppmap} />}
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="feat">
        {featmap?.options && <FeatForm featmap={featmap} setFeatmap={setFeatmap} />}
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="extension">
        {exten?.items && <ExtenForm exten={exten} setExten={setExten} />}
      </Tabs.Content>
      
    </Tabs.Root>
  );
};

export default FeaturesForm;
