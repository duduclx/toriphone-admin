import { Tabs } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import SourceAuth from "../helper/SourceAuth";
import SourceConfd from "../helper/SourceConfd";
import SourceName from "../helper/SourceName";
import SourceSearch from "../helper/SourceSearch";
import SourceFormat from "../helper/SourceFormat";
import SourceMatched from "../helper/SourceMatched";

const SourceEditWazo = ({ source, setSource }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <Tabs.Root defaultValue="wazo">
      <Tabs.List>
        <Tabs.Trigger value="wazo">{t("sources.wazo")}</Tabs.Trigger>
        <Tabs.Trigger value="auth">{t("sources.wazo_auth")}</Tabs.Trigger>
        <Tabs.Trigger value="confd">{t("sources.wazo_confd")}</Tabs.Trigger>
        <Tabs.Trigger value="first">{t("sources.first_matched_columns")}</Tabs.Trigger>
        <Tabs.Trigger value="format">{t("sources.format_columns")}</Tabs.Trigger>
        <Tabs.Trigger value="search">{t("sources.search_columns")}</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content width="50%" m="auto" value="wazo">
        <SourceName source={source} setSource={setSource} />
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="auth">
        <SourceAuth source={source} setSource={setSource} />
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="confd">
        <SourceConfd source={source} setSource={setSource} />
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="first">
        <SourceMatched source={source} setSource={setSource} />
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="format">
        <SourceFormat source={source} setSource={setSource} />
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="search">
        <SourceSearch source={source} setSource={setSource} />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default SourceEditWazo;
