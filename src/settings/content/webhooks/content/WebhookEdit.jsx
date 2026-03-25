import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";
import Webhooksform from "../forms/Webhooksform";

const WebhookEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { subscriptionSelected, subscriptionEdit, subscriptionsGet } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [webhook, setWebhook] = useState(subscriptionSelected);

  // user form
  const [user, setUser] = useState(subscriptionSelected.user);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await subscriptionEdit(webhook);
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
      title={t("webhooks.edit.title", {name: subscriptionSelected.name})}
      setSelectedComponent={setSelectedComponent}
      route={"webhooks"}
      submit={submit}
      isEdit
      errors={errors}
      loading={loading}
    >
      <Webhooksform webhook={webhook} setWebhook={setWebhook} user={user} setUser={setUser}/>
    </TemplatePage>
  );
};

export default WebhookEdit;
