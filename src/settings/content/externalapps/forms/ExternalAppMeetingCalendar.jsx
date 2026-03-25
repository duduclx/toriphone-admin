import { useEffect } from "react";
import { Box, Field, Text } from "@chakra-ui/react";
import { CheckboxUi } from "../../../ui";
import { useTranslation } from "react-i18next";

const ExternalAppMeetingCalendar = ({ externalapp, setExternalapp }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <Box width="100%" textAlign="center" mt="8">
      <Text fontWeight="bold" fontSize="2xl">
        {t("external_apps.meeting_title")}
      </Text>
      <Field.Root>
        <Field.Label>{t("external_apps.meeting_label")}</Field.Label>
        <CheckboxUi
          checked={externalapp.configuration.meetingCalendar || false}
          onCheckedChange={(e) =>
            setExternalapp({
              ...externalapp,
              configuration: {
                ...externalapp.configuration,
                meetingCalendar: e.checked,
              },
            })
          }
        >
          {t("external_apps.meeting_active")}
        </CheckboxUi>
        <Field.HelperText>{t("external_apps.meeting_helper")}</Field.HelperText>
      </Field.Root>
    </Box>
  );
};

export default ExternalAppMeetingCalendar;
