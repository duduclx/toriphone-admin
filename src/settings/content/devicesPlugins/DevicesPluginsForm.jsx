import { Flex, Table, Box, IconButton } from "@chakra-ui/react";
import { toaster } from "../../../components/ui/toaster";
import { useTranslation } from "react-i18next";
import { FaDownload, FaTrashAlt } from "react-icons/fa";

import { useApis } from "../../../ApiProvider";
import useFilteredItems from "../../templates/filter/filteredItems";

const DevicesPluginsForm = ({ installable, setInstallable, setErrors, filter, filtered, setFiltered }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { provdPluginInstall, provdPluginUninstall } = useApis();

  useFilteredItems({
    filter,
    setFiltered,
    items: installable || [],
  });

  // file size
  const formatBytesToHumanReadableSize = (size) => {
    const units = ["Bytes", "KB", "MB"];
    let formattedSize = size;

    for (let i = 0; i < units.length; i++) {
      if (formattedSize > -1024 && formattedSize < 1024) {
        return `${formattedSize.toFixed(1)} ${units[i]}`;
      }
      formattedSize /= 1024;
    }

    return `${formattedSize.toFixed(1)} GB`;
  };

  const install = async (item) => {
    setErrors(null);
    const res = await provdPluginInstall(item);
    if (res.status) {
      setErrors({ title: res.status, description: res.message });
    } else {
      setInstallable((prev) =>
        prev.map((prevItem) => (prevItem.name === item.name ? { ...prevItem, installed: true } : prevItem))
      );
      toaster.create({
        title: t("devicesPlugins.success.install"),
        description: t("devicesPlugins.success.install_description"),
        type: "success",
        duration: 4000,
        closable: true,
      });
    }
  };

  const uninstall = async (item) => {
    setErrors(null);
    const res = await provdPluginUninstall(item);
    if (res.status) {
      setErrors({ title: res.status, description: res.message });
    } else {
      setInstallable((prev) =>
        prev.map((prevItem) => (prevItem.name === item.name ? { ...prevItem, installed: false } : prevItem))
      );
      toaster.create({
        title: t("devicesPlugins.success.uninstall"),
        description: t("devicesPlugins.success.uninstall_description"),
        type: "success",
        duration: 4000,
        closable: true,
      });
    }
  };

  return (
    <Flex flexDirection="column" justifyContent="center" flex="1" alignItems="center">
      <Table.ScrollArea width="100%" height="calc(100vh - 220px)" overflowY="auto" className="hide-scrollbar">
        <Table.Root variant="line">
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.description")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.version")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("devicesPlugins.size")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filtered.map((item, index) => (
              <Table.Row bg="TableBodyBg" key={index} >
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell style={{ whiteSpace: "normal" }}>
                  <Box dangerouslySetInnerHTML={{ __html: item.description }} />
                </Table.Cell>
                <Table.Cell>{item.version}</Table.Cell>
                <Table.Cell>{formatBytesToHumanReadableSize(item.dsize)}</Table.Cell>
                <Table.Cell>
                  <IconButton
                    variant="ghost"
                    colorPalette={item.installed ? "danger" : "secondary"}
                    onClick={() => (item.installed ? uninstall(item) : install(item))}
                  >
                    {item.installed ? <FaTrashAlt /> : <FaDownload />}
                  </IconButton>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </Flex>
  );
};

export default DevicesPluginsForm;
