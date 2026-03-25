import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import WebhooksListContent from "./WebhooksListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const WebhooksList = ({ setSelectedComponent, subscriptions }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {subscriptions?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.service")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.method")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.url")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.user")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.events")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.logs")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {subscriptions.items.length == 0 ? (
              <TemplateTableEmpty colSpan="8"/>
            ) : (
              subscriptions.items.map((webhook, index) => (
                <WebhooksListContent webhook={webhook} key={index} setSelectedComponent={setSelectedComponent} />
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
};

export default WebhooksList;
