import { Box, Field, Text } from "@chakra-ui/react";
import { CheckboxUi, InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

const ExternalAppPortal = ({ externalapp, setExternalapp }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <Box width="100%" textAlign="center" mt="8">
      <Text fontWeight="bold" fontSize="2xl">
        {t("external_apps.portal_title")}
      </Text>
      <Field.Root>
        <Field.Label>{t("external_apps.portal_label")}</Field.Label>
        <CheckboxUi
          checked={externalapp.configuration.portal}
          onCheckedChange={(e) =>
            setExternalapp({
              ...externalapp,
              configuration: {
                ...externalapp.configuration,
                portal: e.checked,
              },
            })
          }
        >
          {t("external_apps.portal_active")}
        </CheckboxUi>
        <Field.HelperText>{t("external_apps.portal_helper")}</Field.HelperText>
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("external_apps.portal_url")}</Field.Label>
        <InputUi
          value={externalapp.configuration.portal_url}
          placeholder={t("external_apps.portal_url_placeholder")}
          onChange={(e) =>
            setExternalapp({
              ...externalapp,
              configuration: {
                ...externalapp.configuration,
                portal_url: e.target.value,
              },
            })
          }
        />
        <Field.HelperText>{t("external_apps.portal_url_helper")}</Field.HelperText>
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("external_apps.portal_username")}</Field.Label>
        <InputUi
          value={externalapp.configuration.portal_username}
          placeholder={t("external_apps.portal_username_placeholder")}
          onChange={(e) =>
            setExternalapp({
              ...externalapp,
              configuration: {
                ...externalapp.configuration,
                portal_username: e.target.value,
              },
            })
          }
        />
        <Field.HelperText>{t("external_apps.portal_username_helper")}</Field.HelperText>
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("external_apps.portal_password")}</Field.Label>
        <InputUi
          value={externalapp.configuration.portal_username}
          onChange={(e) =>
            setExternalapp({
              ...externalapp,
              configuration: {
                ...externalapp.configuration,
                portal_password: e.target.value,
              },
            })
          }
        />
        <Field.HelperText>{t("external_apps.portal_password_helper")}</Field.HelperText>
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("external_apps.licence")}</Field.Label>
        <CheckboxUi
          checked={externalapp.configuration.licence}
          onCheckedChange={(e) =>
            setExternalapp({
              ...externalapp,
              configuration: {
                ...externalapp.configuration,
                licence: e.checked,
              },
            })
          }
        >
          {t("external_apps.licence_active")}
        </CheckboxUi>
        <Field.HelperText>{t("external_apps.licence_helper")}</Field.HelperText>
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("external_apps.licence_number")}</Field.Label>
        <InputUi
          value={externalapp.configuration.licence_number}
          placeholder="myStrongLicence"
          onChange={(e) =>
            setExternalapp({
              ...externalapp,
              configuration: {
                ...externalapp.configuration,
                licence_number: e.target.value,
              },
            })
          }
        />
        <Field.HelperText>{t("external_apps.licence_number_helper")}</Field.HelperText>
      </Field.Root>
    </Box>
  );
};

export default ExternalAppPortal;
