import { useEffect } from "react";
import { Tabs } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import SourceAuth from "../helper/SourceAuth";
import SourceConfd from "../helper/SourceConfd";
import SourceName from "../helper/SourceName";
import SourceSearch from "../helper/SourceSearch";
import SourceFormat from "../helper/SourceFormat";
import SourceMatched from "../helper/SourceMatched";

const SourceCreateConference = ({ source, setSource }) => {
  // requirements
  const { t } = useTranslation("admin");

  // default conference source
  useEffect(() => {
    setSource({
      auth: {
        host: "localhost",
        port: "9497",
        prefix: null,
        https: false,
        verify_certificate: false,
        certificate_path: null,
        timeout: null,
        key_file: "/var/lib/wazo-auth-keys/wazo-dird-conference-backend-key.yml",
        username: null,
        password: null,
        version: "0.1",
      },
      confd: {
        host: "localhost",
        port: "9486",
        prefix: null,
        verify_certificate: false,
        certificate_path: null,
        timeout: null,
        https: false,
        version: "1.1",
      },
      first_matched_columns: ["extensions", "incalls"],
      format_columns: {
        phone: "{extensions[0]}",
        reverse: "{name}",
      },
      name: null,
      searched_columns: ["name", "extensions", "incalls"],
    });
  }, []);

  return (
    <Tabs.Root defaultValue="conferences">
      <Tabs.List>
        <Tabs.Trigger value="conferences">{t("sources.conference")}</Tabs.Trigger>
        <Tabs.Trigger value="auth">{t("sources.conference_auth")}</Tabs.Trigger>
        <Tabs.Trigger value="confd">{t("sources.conference_confd")}</Tabs.Trigger>
        <Tabs.Trigger value="first">{t("sources.first_matched_columns")}</Tabs.Trigger>
        <Tabs.Trigger value="format">{t("sources.format_columns")}</Tabs.Trigger>
        <Tabs.Trigger value="search">{t("sources.search_columns")}</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content width="50%" m="auto" value="conferences">
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

export default SourceCreateConference;
