import { Tabs } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import GeneralForm from "./forms/GeneralForm";
import LimitsForm from "./forms/LimitsForm";

const IaxForm = ({ general, setGeneral, limits, setLimits }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <Tabs.Root defaultValue="general">
      <Tabs.List>
        <Tabs.Trigger value="general">{t("iax.general")}</Tabs.Trigger>
        <Tabs.Trigger value="limits">{t("iax.limits")}</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content width="50%" m="auto" value="general">
        {general?.options && <GeneralForm general={general} setGeneral={setGeneral} />}
      </Tabs.Content>
      
      <Tabs.Content width="80%" m="auto" value="limits">
        {limits?.items && <LimitsForm limits={limits} setLimits={setLimits} />}
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default IaxForm;
