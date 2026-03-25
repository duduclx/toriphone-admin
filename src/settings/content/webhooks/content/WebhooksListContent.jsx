import { useEffect, useState } from "react";
import { Table, IconButton, useDisclosure } from "@chakra-ui/react";
import { Tooltip } from "../../../../components/ui/tooltip";
import { FaFileAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import WebhooksHelper from "../forms/WebhooksHelper";

import TemplateListContent from "../../../templates/TemplateListContent";

const WebhooksListContent = ({ webhook, setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();
  const { getUserFromUuid } = WebhooksHelper();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { setSubscriptionSelected, subscriptionDelete, subscriptionsGet } = useApis();

  // value
  const [subscription, setSubscription] = useState(webhook);

  useEffect(() => {
    const fetchUser = async () => {
      if (webhook.events_user_uuid) {
        try {
          const myuser = await getUserFromUuid(webhook.events_user_uuid);
          setSubscription({
            ...webhook,
            user: myuser,
          });
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    setSubscription(webhook);
    fetchUser();
  }, [webhook]);

  const handleDelete = async () => {
    setLoading(true);
    await subscriptionDelete(subscription);
    await subscriptionsGet();
    setLoading(false);
    onClose();
  };

  const onEdit = () => {
    setSubscriptionSelected(subscription);
    setSelectedComponent("webhookEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("webhooks.delete.title")}
      ressource={subscription}
      subTitle={t("webhooks.delete.subTitle", { name: subscription.name })}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>{subscription.name}</Table.Cell>
      <Table.Cell>{subscription.service}</Table.Cell>
      <Table.Cell>{subscription.config?.method}</Table.Cell>
      <Table.Cell>{subscription.config?.url}</Table.Cell>
      <Table.Cell>{subscription.user?.label || ""}</Table.Cell>
      <Table.Cell>
        <Tooltip
          content={subscription.events.map((event, index) => (
            <div key={index}>{event}</div>
          ))}
          aria-label="events"
        >
          <span>{subscription.events.length}</span>
        </Tooltip>
      </Table.Cell>
      <Table.Cell>
          <IconButton
            variant="ghost"
            colorPalette="secondary"
            onClick={() => {
              setSubscriptionSelected(subscription);
              setSelectedComponent("webhookLogs");
            }}
          >
            <FaFileAlt />
          </IconButton>
      </Table.Cell>
    </TemplateListContent>
  );
};

export default WebhooksListContent;
