import { useState } from "react";
import { Flex, Box, Button, IconButton, Field, Text } from "@chakra-ui/react";
import { InputUi } from "../../../ui";
import { FaX } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const ExternalAppCustom = ({ externalapp, setExternalapp }) => {
  // requirements
  const { t } = useTranslation("admin");

  // values
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  // submit on key down
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      submit();
    }
  };

  return (
    <Box width="100%" textAlign="center" mt="8">
      <Text fontWeight="bold" fontSize="2xl">
        {t("external_apps.custom_title")}
      </Text>
      {externalapp.configuration && Object.keys(externalapp.configuration).length > 0 && (
        <Flex direction="column" gap="4" py="4">
          {Object.entries(externalapp.configuration)
            .filter(([key]) => key !== "purpose" && key !== "users")
            .map(([key, value]) => (
              <Flex key={key} align="center" justify="space-between" px="2" bg="bgElevated" borderRadius="8px">
                <Box maxW="90%" whiteSpace="normal" wordBreak="break-word">
                  <strong>{key}</strong>: <span>{value}</span>
                </Box>
                <IconButton
                  size="sm"
                  variant="ghost"
                  colorPalette="danger"
                  aria-label="Supprimer"
                  onClick={() =>
                    setExternalapp((prev) => {
                      const newConfig = { ...prev.configuration };
                      delete newConfig[key];
                      return { ...prev, configuration: newConfig };
                    })
                  }
                >
                  <FaX />
                </IconButton>
              </Flex>
            ))}
        </Flex>
      )}
      <Field.Root>
        <Field.Label>{t("external_apps.custom_config_key")} :</Field.Label>
        <InputUi
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          placeholder={t("external_apps.custom_config_key")}
          onKeyDown={handleKeyDown}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("external_apps.custom_config_value")} :</Field.Label>
        <InputUi
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder={t("external_apps.custom_config_value")}
          onKeyDown={handleKeyDown}
        />
        <Field.HelperText>{t("external_apps.custom_config_helper")}</Field.HelperText>
      </Field.Root>

      <Button
        colorPalette="primary"
        disabled={!newKey || !newValue}
        onClick={() => {
          setExternalapp((prev) => ({
            ...prev,
            configuration: {
              ...(prev.configuration || {}),
              [newKey]: newValue,
            },
          }));
          setNewKey("");
          setNewValue("");
        }}
      >
        {t("external_apps.custom_config_add")}
      </Button>
    </Box>
  );
};

export default ExternalAppCustom;
