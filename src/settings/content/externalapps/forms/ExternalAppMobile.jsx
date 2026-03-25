import { Box, Field, Text } from "@chakra-ui/react";
import { InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

const ExternalAppMobile = ({ externalapp, setExternalapp }) => {
    // requirements
    const { t } = useTranslation("admin");

  return (
    <Box width="100%" textAlign="center" mt="8">
      <Text fontWeight="bold" fontSize="2xl">
        {t("external_apps.mobile_title")}
      </Text>
      <Field.Root>
        <Field.Label>{t("external_apps.turn_hostname")} :</Field.Label>
        <InputUi
          value={externalapp.configuration.turn_mobile_hostname}
          placeholder="server.turn.com"
          onChange={(e) =>
            setExternalapp({
              ...externalapp,
              configuration: {
                ...externalapp.configuration,
                turn_mobile_hostname: e.target.value,
              },
            })
          }
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("external_apps.turn_port")}:</Field.Label>
        <InputUi
          value={externalapp.configuration.turn_mobile_port}
          placeholder="3478"
          onChange={(e) =>
            setExternalapp({
              ...externalapp,
              configuration: {
                ...externalapp.configuration,
                turn_mobile_port: e.target.value,
              },
            })
          }
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.username")} :</Field.Label>
        <InputUi
          value={externalapp.configuration.turn_mobile_username}
          placeholder={t("common.username")}
          onChange={(e) =>
            setExternalapp({
              ...externalapp,
              configuration: {
                ...externalapp.configuration,
                turn_mobile_username: e.target.value,
              },
            })
          }
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.password")} :</Field.Label>
        <InputUi
          value={externalapp.configuration.turn_mobile_password}
          placeholder={t("common.password")}
          onChange={(e) =>
            setExternalapp({
              ...externalapp,
              configuration: {
                ...externalapp.configuration,
                turn_mobile_password: e.target.value,
              },
            })
          }
        />
      </Field.Root>
    </Box>
  );
};

export default ExternalAppMobile;
