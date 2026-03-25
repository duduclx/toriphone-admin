import { Field, HStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { CheckboxUi, InputUi, NativeSelectUi, NumberInputUi, ReactSelectUi } from "../../../ui";

import UserForm from "../../../helpers/forms/UserForm";
import VoicemailHelper from "../helpers/VoicemailHelper";
import FormContainer from "../../../templates/forms/FormContainer";

const VoicemailForm = ({ voicemail, setVoicemail, user, setUser, availableExtensions, timezones }) => {
  // requirements
  const { t } = useTranslation("admin");

  // helper
  const { languagesOptions } = VoicemailHelper();

  const handleMaxMessages = (e) => {
    setVoicemail((prev) => ({
      ...prev,
      max_messages: e.value === "" ? null : e.value,
    }));
  };

  const handleChangeTimezone = (selected) => {
    setVoicemail({
      ...voicemail,
      timezone: selected === null ? null : selected.value,
      timezone_labelled: selected === null ? null : selected,
    });
  };

  return (
    <FormContainer>
      <UserForm user={user} setUser={setUser} />
      <Field.Root>
        <Field.Label>{t("common.name")} :</Field.Label>
        <InputUi
          required
          placeholder={t("common.name")}
          value={voicemail.name || ""}
          onChange={(e) => setVoicemail({ ...voicemail, name: e.target.value })}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.email")} :</Field.Label>
        <InputUi
          required
          placeholder={t("common.email")}
          value={voicemail.email || ""}
          onChange={(e) => setVoicemail({ ...voicemail, email: e.target.value })}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.number")} :</Field.Label>
        <NativeSelectUi
          value={voicemail.number || ""}
          onChange={(e) => {
            setVoicemail({ ...voicemail, number: e.target.value });
          }}
        >
          {voicemail.number && <option value={voicemail.number}>{voicemail.number}</option>}
          {availableExtensions.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </NativeSelectUi>
      </Field.Root>
      <HStack gap="4" alignItems="end">
        <Field.Root width="50%">
          <Field.Label>{t("common.password")} :</Field.Label>
          <InputUi
            placeholder={t("common.password")}
            value={voicemail.password}
            onChange={(e) => setVoicemail({ ...voicemail, password: e.target.value })}
          />
        </Field.Root>
        <CheckboxUi
          checked={voicemail.ask_password}
          onCheckedChange={(e) =>
            setVoicemail({
              ...voicemail,
              ask_password: e.checked,
            })
          }
        >
          {t("common.ask_password")}
        </CheckboxUi>
      </HStack>
      <Field.Root>
        <Field.Label>{t("common.max_messages")} :</Field.Label>
        <NumberInputUi
          min={0}
          value={voicemail.max_messages === null ? "" : voicemail.max_messages}
          allowMouseWheel
          onValueChange={handleMaxMessages}
        />
      </Field.Root>
      <HStack gap="4">
        <Field.Root>
          <Field.Label>{t("common.language")} :</Field.Label>
          <NativeSelectUi
            value={voicemail.language}
            onChange={(e) => {
              setVoicemail({ ...voicemail, language: e.target.value });
            }}
          >
            {languagesOptions.map((item, index) => (
              <option value={item.value} key={index}>
                {item.label}
              </option>
            ))}
          </NativeSelectUi>
        </Field.Root>
        <Field.Root>
          <Field.Label>{t("common.timezone")} :</Field.Label>
          <ReactSelectUi
            name="timezones"
            isClearable
            options={timezones}
            value={voicemail.timezone_labelled || voicemail.timezone}
            onChange={handleChangeTimezone}
            placeholder={t("common.timezone_select")}
          />
        </Field.Root>
      </HStack>
      <CheckboxUi
        checked={voicemail.attach_audio}
        onCheckedChange={(e) =>
          setVoicemail({
            ...voicemail,
            attach_audio: e.checked,
          })
        }
      >
        {t("common.attach_audio")}
      </CheckboxUi>
      <CheckboxUi
        checked={voicemail.delete_messages}
        onCheckedChange={(e) =>
          setVoicemail({
            ...voicemail,
            delete_messages: e.checked,
          })
        }
      >
        {t("common.delete_messages")}
      </CheckboxUi>
      <CheckboxUi
        checked={voicemail.enabled}
        onCheckedChange={(e) =>
          setVoicemail({
            ...voicemail,
            enabled: e.checked,
          })
        }
      >
        {t("common.enabled")}
      </CheckboxUi>
    </FormContainer>
  );
};

export default VoicemailForm;
