import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Tabs } from "@chakra-ui/react";

import TemplatePage from "../../templates/TemplatePage";
import SubscriptionsList from "./content/SubscriptionsList";
import SubscriptionDetails from "./content/SubscriptionDetails";

import { useApis } from "../../../ApiProvider";

const Subscriptions = () => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { usersSubscriptionsGet } = useApis();

  // values
  const [subscriptions, setSubscriptions] = useState({});

  // load
  useEffect(() => {
    const fetch = async () => {
      const res = await usersSubscriptionsGet();
      setSubscriptions(res);
    };
    fetch();
  }, []);

  return (
    <TemplatePage title={t("subscriptions.list.title")} isList hasNoAdd>
      <Tabs.Root defaultValue="list">
        <Tabs.List>
          <Tabs.Trigger value="list">{t("subscriptions.list.type")}</Tabs.Trigger>
          <Tabs.Trigger value="details">{t("subscriptions.details.title")}</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="list">
          <SubscriptionsList subscriptions={subscriptions} />
        </Tabs.Content>

        <Tabs.Content value="details">
          <SubscriptionDetails />
        </Tabs.Content>
      </Tabs.Root>
    </TemplatePage>
  );
};

export default Subscriptions;
