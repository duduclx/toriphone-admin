import { Tabs } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import GeneralForm from "./forms/GeneralForm";
import IceForm from "./forms/IceForm";

const RtpForm = ({ rtp, setRtp, ice, setIce }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <Tabs.Root defaultValue="general">
      <Tabs.List>
        <Tabs.Trigger value="general">{t("rtp.general")}</Tabs.Trigger>
        <Tabs.Trigger value="ice">{t("rtp.ice")}</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content width="50%" m="auto" value="general">
        {rtp?.options && <GeneralForm rtp={rtp} setRtp={setRtp} />}
      </Tabs.Content>
      
      <Tabs.Content width="50%" m="auto" value="ice">
        {ice?.options && <IceForm ice={ice} setIce={setIce} />}
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default RtpForm;
