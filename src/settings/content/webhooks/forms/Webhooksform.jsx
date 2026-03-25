import { useEffect } from "react";
import { Text, Field, Textarea } from "@chakra-ui/react";
import { CheckboxUi, InputUi, NativeSelectUi, AsyncSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import WebhooksHelper from "./WebhooksHelper";
import UserForm from "../../../helpers/forms/UserForm";
import FormContainer from "../../../templates/forms/FormContainer";

const Webhooksform = ({ webhook, setWebhook, user, setUser }) => {
  // requirements
  const { t } = useTranslation("admin");

  // helper
  const { webhooksService, webhooksEventsOptions, webhooksMethodOptions, webhooksContentTypeOptions } =
    WebhooksHelper();

  // handler
  const handleEventsChange = (selectedOptions) => {
    if (selectedOptions) {
      const updatedEvents = selectedOptions.map((option) => option.value);
      setWebhook((prev) => ({
        ...prev,
        events: updatedEvents,
      }));
    } else {
      setWebhook((prev) => ({
        ...prev,
        events: [],
      }));
    }
  };

  // user
  useEffect(() => {
    if (user) {
      setWebhook((prev) => ({
        ...prev,
        events_user_uuid: user.uuid,
      }));
    } else {
      setWebhook((prev) => ({
        ...prev,
        events_user_uuid: null,
      }));
    }
  }, [user]);

  // filterOptions
  const filterOptions = (input) => {
    return webhooksEventsOptions.filter((i) => i.label.toLocaleLowerCase().includes(input.toLocaleLowerCase()));
  };

  // promiseOptions
  const promiseOptions = (input) => {
    return new Promise((resolve) => {
      resolve(filterOptions(input));
    });
  };

  return (
    <FormContainer>
      <Field.Root>
        <Field.Label>{t("common.name")} :</Field.Label>
        <InputUi
          required
          placeholder={t("common.name")}
          value={webhook.name}
          onChange={(e) => setWebhook({ ...webhook, name: e.target.value, metadata: { name: e.target.value } })}
        />
      </Field.Root>
      <UserForm user={user} setUser={setUser} />
      <Field.Root>
        <Field.Label>{t("common.events")} :</Field.Label>
        <AsyncSelectUi
          cacheOptions
          loadOptions={promiseOptions}
          defaultOptions={webhooksEventsOptions}
          isClearable
          isMulti
          onChange={handleEventsChange}
          value={webhook.events.map((eventValue) => {
            const correspondingOption = webhooksEventsOptions.find((option) => option.value === eventValue);
            return correspondingOption || null;
          })}
          placeholder={t("common.events")}
        />
        <Field.HelperText>{t("webhooks.events_helper")}</Field.HelperText>
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.url")} :</Field.Label>
        <InputUi
          required
          placeholder={t("common.url")}
          value={webhook.config.url}
          onChange={(e) => setWebhook({ ...webhook, config: { ...webhook.config, url: e.target.value } })}
        />
      </Field.Root>
      <Field.Root>
        <Text mb="2">{t("common.service")} :</Text>
        <NativeSelectUi
          value={webhook.service}
          onChange={(e) => {
            setWebhook({ ...webhook, service: e.target.value });
          }}
        >
          {webhooksService.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </NativeSelectUi>
      </Field.Root>
      <Field.Root>
        <Text mb="2">{t("common.method")} :</Text>
        <NativeSelectUi
          value={webhook.config.method}
          onChange={(e) => {
            setWebhook({ ...webhook, config: { ...webhook.config, method: e.target.value } });
          }}
        >
          {webhooksMethodOptions.map((item, index) => (
            <option value={item.value} key={index}>
              {item.label}
            </option>
          ))}
        </NativeSelectUi>
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("webhooks.content_type")} :</Field.Label>
        <NativeSelectUi
          value={webhook.config.content_type}
          onChange={(e) => {
            setWebhook({ ...webhook, config: { ...webhook.config, content_type: e.target.value } });
          }}
        >
          {webhooksContentTypeOptions.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </NativeSelectUi>
      </Field.Root>
      <CheckboxUi
        checked={webhook.config.verify_certificate === "true"}
        onCheckedChange={(e) =>
          setWebhook({
            ...webhook,
            config: { ...webhook.config, verify_certificate: e.checked ? "true" : "false" },
          })
        }
      >
        {t("webhooks.verify_certificate")}
      </CheckboxUi>
      <Field.Root>
        <Field.Label>{t("webhooks.body")}</Field.Label>
        <Textarea
          value={webhook.config.body}
          placeholder={t("webhooks.body_placeholder")}
          onChange={(e) =>
            setWebhook({
              ...webhook,
              config: { ...webhook.config, body: e.target.value },
            })
          }
        />
      </Field.Root>
    </FormContainer>
  );
};

export default Webhooksform;
