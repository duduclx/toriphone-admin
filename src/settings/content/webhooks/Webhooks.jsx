import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import WebhooksList from "./content/WebhooksList";

import { useApis } from "../../../ApiProvider";

const Webhooks = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { subscriptions, subscriptionsGet } = useApis();

  useEffect(() => {
    subscriptionsGet();
  }, [])

  // filter
  // we can filter by tags
  const [filter, setFilter] = useState("");
  const [filtered, setFiltered] = useState([]);

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("webhooks.list.title")}
      route={"webhookCreate"}
      isList
    >
      <WebhooksList setSelectedComponent={setSelectedComponent} subscriptions={subscriptions}/>
    </TemplatePage>
  );
};

export default Webhooks;
