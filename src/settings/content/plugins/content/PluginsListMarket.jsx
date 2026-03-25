import { useState } from "react";
import { Flex, Box, IconButton, InputGroup, Field, CloseButton } from "@chakra-ui/react";
import { InputUi } from "../../../ui";
import { toaster } from "../../../../components/ui/toaster";
import { FaDownload, FaSearch } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import pluginsListOptions from "../helpers/pluginsListOptions";
import PluginCard from "../helpers/PluginCard";
import FormContainer from "../../../templates/forms/FormContainer";
import { useApis } from "../../../../ApiProvider";

const PluginsListMarket = () => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { pluginInstall, pluginsGet } = useApis();

  // git install
  const [plugin, setPlugin] = useState({
    method: "git",
    options: {
      url: "",
      ref: "",
    },
  });

  const onInstall = async () => {
    const res = await pluginInstall(plugin);
    if (!res.uuid) {
      toaster.create({
        title: t("plugins.error.title"),
        description: t("plugins.error.description"),
        type: "error",
        duration: 4000,
        closable: true,
      });
    } else {
      toaster.create({
        title: t("plugins.success.title"),
        description: t("plugins.success.description"),
        type: "success",
        duration: 4000,
        closable: true,
      });
      await pluginsGet();
    }
  };

  // list install
  const [pluginsList, setPluginsList] = useState(pluginsListOptions);
  const [filter, setFilter] = useState("");

  const onFilter = (e) => {
    // setPlugins
    const query = e.target.value.toLowerCase();
    setFilter(query);

    const filteredPlugins = pluginsListOptions.filter((plugin) => {
      const nameMatches = plugin.name.toLowerCase().includes(query);
      const authorMatches = plugin.author?.toLowerCase().includes(query);
      const tagsMatch = plugin.tags.some((tag) => tag.toLowerCase().includes(query));

      return nameMatches || authorMatches || tagsMatch;
    });

    setPluginsList(filteredPlugins);
  };

  const resetFilter = () => {
    setFilter("");
    setPluginsList(pluginsListOptions);
  };

  return (
    <>
      <Field.Root mb="8">
        <Field.Label>{t("plugins.git_url")}</Field.Label>
        <Flex gap="4">
          <InputUi
            width="500px"
            value={plugin.options.url}
            placeholder={t("plugins.git_url")}
            onChange={(e) =>
              setPlugin((prev) => ({
                ...prev,
                options: {
                  url: e.target.value,
                },
              }))
            }
          />
          <InputUi
            width="400px"
            value={plugin.options?.ref || ""}
            placeholder={t("plugins.ref")}
            onChange={(e) =>
              setPlugin((prev) => ({
                ...prev,
                options: {
                  ref: e.target.value,
                },
              }))
            }
          />
          <IconButton variant="ghost" colorPalette="secondary" onClick={() => onInstall()}>
            <FaDownload />
          </IconButton>
        </Flex>
      </Field.Root>
      <FormContainer>
        <Box width="300px">
          <Field.Root>
            <Field.Label>{t("plugins.filter")} :</Field.Label>
            <InputGroup startElement={<FaSearch/>} endElement={<CloseButton me="-2" onClick={() => resetFilter()} />}>
              <InputUi value={filter} placeholder={t("plugins.filter")} onChange={(e) => onFilter(e)} />
            </InputGroup>
          </Field.Root>
        </Box>
        <Flex flex="1" flexDirection="row" gap="4" width="100%" flexWrap="wrap">
          {pluginsList.map((plugin, index) => (
            <PluginCard key={index} plugin={plugin} index={index} />
          ))}
        </Flex>
      </FormContainer>
    </>
  );
};

export default PluginsListMarket;
