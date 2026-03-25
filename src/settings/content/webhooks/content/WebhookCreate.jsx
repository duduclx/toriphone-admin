import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";
import WebhooksHelper from "../forms/WebhooksHelper";
import Webhooksform from "../forms/Webhooksform";

const WebhookCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // helper
  const { webhooksMethodOptions, webhooksContentTypeOptions } = WebhooksHelper();

  // api
  const { subscriptionAdd, subscriptionsGet } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [webhook, setWebhook] = useState({
    config: {
      method: webhooksMethodOptions[0].value,
      content_type: webhooksContentTypeOptions[0],
      verify_certificate: "false",
      body: "",
      url: "https://",
    },
    events: [],
    service: "http",
    tags: ["test"],
  });


  // user form
  const [user, setUser] = useState(null);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await subscriptionAdd(webhook);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      await subscriptionsGet();
      setLoading(false);
      setSelectedComponent("webhooks");
    }
  };

  return (
    <TemplatePage
      title={t("webhooks.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"webhooks"}
      submit={submit}
      isCreate
      errors={errors}
      loading={loading}
    >
      <Webhooksform webhook={webhook} setWebhook={setWebhook} user={user} setUser={setUser}/>
    </TemplatePage>
  );
};

export default WebhookCreate;
