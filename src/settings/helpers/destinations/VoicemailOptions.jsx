import { Field, HStack } from "@chakra-ui/react";
import { CheckboxUi, NativeSelectUi } from "../../ui";
import { useTranslation } from "react-i18next";

const VoicemailOptions = ({ destination, setDestination, destinationType }) => {
  // requirements
  const { t } = useTranslation("admin");

  const voicemailGreetingOptions = [
    { label: t("common.voicemail_greeting_none"), value: "" },
    { label: t("common.voicemail_greeting_busy"), value: "busy" },
    { label: t("common.voicemail_greeting_unavailable"), value: "unavailable" },
  ];

  const handleVoicemailGreeting = (e) => {
    const value = e.target.value === "" ? null : e.target.value;
    setDestination((prev) => ({
      ...prev,
      type: destinationType,
      greeting: value,
    }));
  };

  return (
      <Field.Root>
        <Field.Label htmlFor="greeting">{t("common.voicemail_greeting_label")} :</Field.Label>
        <HStack gap="8">
          <NativeSelectUi
            minW="300px"
            w="full"
            id="greeting"
            value={destination?.greeting || ""}
            onChange={handleVoicemailGreeting}
          >
            {voicemailGreetingOptions.map((item) => (
              <option value={item.value} key={item.value}>
                {item.label}
              </option>
            ))}
          </NativeSelectUi>
          <CheckboxUi
            checked={destination?.skip_instructions || false}
            onCheckedChange={(e) => {
              setDestination({
                ...destination,
                type: destinationType,
                skip_instructions: e.checked,
              });
            }}
          >
            {t("common.voicemail_skip_instructions")}
          </CheckboxUi>
        </HStack>
      </Field.Root>
  );
};

export default VoicemailOptions;
