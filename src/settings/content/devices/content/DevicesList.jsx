import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import DevicesListContent from "./DevicesListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const DevicesList = ({ setSelectedComponent, devices, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {devices?.items && (
        <TemplateTable>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("devices.synchronize")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("devices.ip")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("devices.mac")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("devices.description")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("devices.status")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("devices.model")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("devices.plugin")}</Table.ColumnHeader>
              {/*
              <Table.ColumnHeader>{t("devices.vendor")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("devices.version")}</Table.ColumnHeader>
              */}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {devices.items.length == 0 ? (
              <TemplateTableEmpty colSpan="8"/>
            ) : (
              devices.items.map((device, index) => (
                <DevicesListContent device={device} setSelectedComponent={setSelectedComponent} key={index} page={page} setPage={setPage} search={search} />
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
};

export default DevicesList;
