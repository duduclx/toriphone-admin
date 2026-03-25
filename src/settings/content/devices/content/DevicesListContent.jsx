import { useState } from "react";
import { Table, IconButton, useDisclosure} from "@chakra-ui/react";
import { toaster } from "../../../../components/ui/toaster";
import { FaCompressAlt, FaExpandAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";

const DevicesListContent = ({ device, setSelectedComponent, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { devices, devicesPageGet, itemsPerPage, setDeviceSelected, deviceDelete, deviceSynchronize, deviceResetAutoprov } = useApis();

  const handleDelete = async () => {
    setLoading(true);
    await deviceDelete(device);
    const newTotal = devices.total - 1;
    const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);

    // Vérifier si la page actuelle est toujours valide
    if (page > maxPage) {
      setPage(maxPage); // Mettre à jour la page
    } else {
      const offset = page * parseInt(itemsPerPage, 10);
      await devicesPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
    setLoading(false);
    onClose();
  };

  const onEdit = () => {
    setDeviceSelected(device);
    setSelectedComponent("deviceEdit");
  };

  const onSync = async () => {
    const res = await deviceSynchronize(device);
    if (res.status) {
      toaster.create({
        title: t("devices.sync.fail.title"),
        description: t("devices.sync.fail.description"),
        type: "error",
        duration: 4000,
        closable: true,
      });
    } else {
      toaster.create({
        title: t("devices.sync.success.title"),
        description: t("devices.sync.success.description"),
        type: "success",
        duration: 4000,
        closable: true,
      });
    }
  }

  const onReset = async () => {
    const res = await deviceResetAutoprov(device);
    if (res.status) {
      toaster.create({
        title: t("devices.reset.fail.title"),
        description: t("devices.reset.fail.description"),
        type: "error",
        duration: 4000,
        closable: true,
      });
    } else {
      toaster.create({
        title: t("devices.reset.success.title"),
        description: t("devices.reset.success.description"),
        type: "success",
        duration: 4000,
        closable: true,
      });
    }
  }

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("devices.delete.title")}
      ressource={device}
      subTitle={t("devices.delete.subTitle", { name: device.ip })}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>
        <IconButton
          variant="ghost"
          colorPalette="secondary"
          title={t("devices.synchronize")}
          aria-label={t("devices.synchronize")}
          onClick={() => onSync()}
        >
          <FaCompressAlt />
        </IconButton>
        <IconButton
          variant="ghost"
          colorPalette="danger"
          title={t("devices.autoprov_reset")}
          aria-label={t("devices.autoprov_reset")}
          onClick={() => onReset()}
        >
          <FaExpandAlt />
        </IconButton>
      </Table.Cell>
      <Table.Cell>{device.ip}</Table.Cell>
      <Table.Cell>{device.mac}</Table.Cell>
      <Table.Cell>{device.description}</Table.Cell>
      <Table.Cell>{device.status}</Table.Cell>
      <Table.Cell>{device.model}</Table.Cell>
      <Table.Cell>{device.plugin}</Table.Cell>
      {/*
      <Table.Cell>{device.vendor}</Table.Cell>
      <Table.Cell>{device.version}</Table.Cell>
      */}
    </TemplateListContent>
  );
};

export default DevicesListContent;
