import { useEffect, useState } from "react";
import { Button, Code, Dialog, Table, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { toaster } from "../../../../components/ui/toaster";

import { useApis } from "../../../../ApiProvider";

import WebhookLogsContent from "./WebhookLogsContent";
import TemplatePage from "../../../templates/TemplatePage";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const WebhookLogs = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // api
  const { subscriptionSelected, subscriptionLogs, subscriptionLogsGet } = useApis();

  // selected log
  const [selectedLog, setSelectedLog] = useState({});

  // load
  useEffect(() => {
    subscriptionLogsGet(subscriptionSelected);
  }, []);

  const handleCopyToClipboard = () => {
    const content = JSON.stringify(selectedLog.event.data, null, 2);
    navigator.clipboard.writeText(content).then(() => {
      toaster.create({
        title: t("common.copy_title"),
        description: t("common.copy_description"),
        type: "success",
        duration: 3000,
        closable: true,
      });
    });
  };

  return (
    <>
      <TemplatePage
        title={t("webhooks.logs.title") + " " + subscriptionSelected.name}
        setSelectedComponent={setSelectedComponent}
        route={"webhooks"}
        isBack={true}
        isList={true}
      >
        {subscriptionLogs?.items && (
          <TemplateTable>
            <Table.Caption></Table.Caption>
            <Table.Header>
              <Table.Row bg="TableHeaderBg">
                <Table.ColumnHeader>{t("webhooks.uuid")}</Table.ColumnHeader>
                <Table.ColumnHeader>{t("webhooks.attempts")}</Table.ColumnHeader>
                <Table.ColumnHeader>{t("webhooks.status")}</Table.ColumnHeader>
                <Table.ColumnHeader>{t("common.start")}</Table.ColumnHeader>
                <Table.ColumnHeader>{t("common.end")}</Table.ColumnHeader>
                <Table.ColumnHeader>{t("common.events")}</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {subscriptionLogs.items.length == 0 ? (
                <TemplateTableEmpty colSpan="6" />
              ) : (
                subscriptionLogs.items.map((log, index) => <WebhookLogsContent log={log} key={index} onOpen={onOpen} setSelectedLog={setSelectedLog} />)
              )}
            </Table.Body>
          </TemplateTable>
        )}
      </TemplatePage>
      <Dialog.Root open={open} onOpenChange={onClose} scrollBehavior="inside" size="xl">
        <Dialog.Backdrop width="100%" />
        <Dialog.Positioner>
          <Dialog.Content bg="bgDefault">
            <Dialog.Header alignSelf="center">
              <Dialog.Title>{t("webhooks.logs.event")}</Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger />
            <Dialog.Body>
              <Code width="full" whiteSpace="pre-wrap">
                {selectedLog.event && JSON.stringify(selectedLog.event.data, null, 2)}
              </Code>
            </Dialog.Body>

            <Dialog.Footer>
              <Button colorPalette="primary" mr="3" onClick={handleCopyToClipboard}>
                {t("common.copy")}
              </Button>
              <Button colorPalette="danger" onClick={onClose}>
                {t("common.close")}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  );
};

export default WebhookLogs;
