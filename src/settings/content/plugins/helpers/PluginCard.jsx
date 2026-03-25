import { Text, Button, Card, Tag, Flex, Box, IconButton, useDisclosure, Dialog } from "@chakra-ui/react";
import { toaster } from "../../../../components/ui/toaster";
import { FaExternalLinkAlt, FaTrashAlt, FaDownload } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import FormContainer from "../../../templates/forms/FormContainer";

const PluginCard = ({ plugin, index, isInstalled = false }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // api
  const { plugins, setPlugins, pluginUninstall, pluginInstall } = useApis();

  const onDelete = async () => {
    const res = await pluginUninstall(plugin.namespace, plugin.name);
    const updatedItems = plugins.items.filter(
      (item) => !(item.name === plugin.name && item.namespace === plugin.namespace)
    );
    setPlugins((prev) => ({
      ...prev,
      items: updatedItems,
      total: updatedItems.length,
    }));
    onClose();
  };

  const onInstall = async () => {
    const plug = {
      method: "git",
      options: {
        url: plugin.homepage,
      },
    };
    const res = await pluginInstall(plug);
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
      setPlugins((prev) => ({
        ...prev,
        items: [...prev.items, plugin],
        total: prev.items.length + 1,
      }));
    }
    onClose();
  };

  const onSubmit = () => {
    isInstalled ? onDelete() : onInstall();
  };

  return (
    <>
      <Card.Root key={index} bg="bgSecondary" width="400px" borderRadius="8px">
        <Card.Header bg="bgPrimary" borderTopRadius="8px">
          <Flex justifyContent="space-between" alignItems="center" mb="4">
            <Box>
              <Text as="b">{plugin.name}</Text>
              <Text>
                v{plugin.version}
                <a href={plugin.homepage} target="_blank" style={{ paddingLeft: "8px" }}>
                  <IconButton variant="ghost" size="xs">
                    <FaExternalLinkAlt />
                  </IconButton>
                </a>
              </Text>
            </Box>
            {isInstalled ? (
              <IconButton variant="ghost" colorPalette="danger" onClick={() => onOpen()}>
                <FaTrashAlt />
              </IconButton>
            ) : (
              <IconButton variant="ghost" colorPalette="secondary" onClick={() => onOpen()}>
                <FaDownload />
              </IconButton>
            )}
          </Flex>
        </Card.Header>
        <Card.Body>
          <FormContainer>
            <Box>
              <Text as="b">{t("plugins.display_name")} :</Text>
              <Text>{plugin.display_name || ""}</Text>
            </Box>
            <Box>
              <Text as="b">{t("plugins.author")} :</Text>
              <Text>{plugin.author || ""}</Text>
            </Box>
            {!isInstalled && (
              <>
                <Box>
                  <Text as="b">{t("plugins.description")} :</Text>
                  <Text>{plugin.description || ""}</Text>
                </Box>
                <Box>
                  <Text as="b">{t("plugins.usage")} :</Text>
                  <Text>{plugin.usage || ""}</Text>
                </Box>
              </>
            )}
            <Box>
              <Text as="b">{t("plugins.min_wazo_version")} :</Text>
              <Text>{plugin.min_wazo_version || "unknow"}</Text>
            </Box>
            <Box>
              <Text as="b">{t("plugins.max_wazo_version")} :</Text>
              <Text>{plugin.max_wazo_version || "latest"}</Text>
            </Box>
            <Box>
              <Text as="b">{t("plugins.tags")} :</Text>
              <Flex gap="2" flexWrap="wrap">
                {plugin.tags.map((tag, index) => (
                  <Tag.Root key={index} colorPalette="secondary" borderRadius="full">
                    <Tag.Label>{tag}</Tag.Label>
                  </Tag.Root>
                ))}
              </Flex>
            </Box>
          </FormContainer>
        </Card.Body>
      </Card.Root>
      <Dialog.Root open={open} onOpenChange={onClose}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg="bgDefault">
            <Dialog.Header alignSelf="center">
              <Dialog.Title>{isInstalled ? t("plugins.delete.title") : t("plugins.install.title")}</Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger />
            <Dialog.Body>
              <Text>
                {isInstalled
                  ? t("plugins.delete.subTitle", { name: plugin.name })
                  : t("plugins.install.subTitle", { name: plugin.name })}
              </Text>
            </Dialog.Body>
            <Dialog.Footer>
              <Button colorPalette={isInstalled ? "danger" : "secondary"} onClick={() => onSubmit()}>
                {isInstalled ? t("common.delete") : t("plugins.install_button")}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  );
};

export default PluginCard;
