import { Box, Field, Text } from "@chakra-ui/react";
import { InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

const ExternalAppWeb = ({ externalapp, setExternalapp }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <Box width="100%" textAlign="center" mt="8">
      <Text fontWeight="bold" fontSize="2xl">
        {t("external_apps.web_title")}
      </Text>
      <Field.Root>
        <Field.Label>{t("external_apps.stun_hostname")} :</Field.Label>
        <InputUi
          value={externalapp.configuration.stun_web_hostname}
          placeholder="server.stun.com"
          onChange={(e) =>
            setExternalapp({
              ...externalapp,
              configuration: {
                ...externalapp.configuration,
                stun_web_hostname: e.target.value,
              },
            })
          }
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("external_apps.stun_port")} :</Field.Label>
        <InputUi
          value={externalapp.configuration.stun_web_port}
          placeholder="3478"
          onChange={(e) =>
            setExternalapp({
              ...externalapp,
              configuration: {
                ...externalapp.configuration,
                stun_web_port: e.target.value,
              },
            })
          }
        />
      </Field.Root>
    </Box>
  );
};

export default ExternalAppWeb;
