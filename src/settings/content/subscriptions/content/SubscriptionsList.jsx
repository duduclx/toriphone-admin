import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import SubscriptionsListContent from "./SubscriptionsListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const SubscriptionsList = ({ subscriptions }) => {
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
              <Table.ColumnHeader>{t("subscriptions.list.type")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("subscriptions.list.count")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {subscriptions.items.length == 0 ? (
              <TemplateTableEmpty colSpan="3"/>
            ) : (
              subscriptions.items.map((subscription, index) => (
                <SubscriptionsListContent subscription={subscription} key={index} />
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
}

export default SubscriptionsList
