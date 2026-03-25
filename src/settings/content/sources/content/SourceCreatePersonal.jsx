import { useEffect } from "react";
import { Tabs } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import SourceName from "../helper/SourceName";
import SourceSearch from "../helper/SourceSearch";
import SourceFormat from "../helper/SourceFormat";
import SourceMatched from "../helper/SourceMatched";

const SourceCreatePersonal = ({ source, setSource }) => {
  // requirements
  const { t } = useTranslation("admin");

  // default conference source
  useEffect(() => {
    setSource({
      first_matched_columns: [],
      format_columns: {},
      name: null,
      file: null,
      separator: null,
      unique_column: null,
      searched_columns: [],
    });
  }, []);

  return (
    <Tabs.Root defaultValue="personal">
      <Tabs.List>
        <Tabs.Trigger value="personal">{t("sources.personal")}</Tabs.Trigger>
        <Tabs.Trigger value="first">{t("sources.first_matched_columns")}</Tabs.Trigger>
        <Tabs.Trigger value="format">{t("sources.format_columns")}</Tabs.Trigger>
        <Tabs.Trigger value="search">{t("sources.search_columns")}</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content width="50%" m="auto" value="personal">
        <SourceName source={source} setSource={setSource} />
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

export default SourceCreatePersonal;
