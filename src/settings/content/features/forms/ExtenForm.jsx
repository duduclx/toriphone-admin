import { Box, Flex, Text } from "@chakra-ui/react";
import { CheckboxUi, InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../templates/forms/FormContainer";

const ExtenForm = ({ exten, setExten }) => {
  // requirements
  const { t } = useTranslation();

  return (
    <FormContainer>
      <Flex flexDirection="row" alignItems="center">
        <Box width="30%" textAlign="center">
          <Text>{t("common.enabled")}</Text>
        </Box>
        <Box width="30%" textAlign="center">
          <Text>{t("common.feature")}</Text>
        </Box>
        <Box width="30%" textAlign="center">
          <Text>{t("common.extension")}</Text>
        </Box>
      </Flex>
      {exten.items.map((item, index) => (
        <Flex flexDirection="row" gap="4" alignItems="center" justifyContent="center" key={index}>
          <Box width="30%">
            <CheckboxUi
              checked={item.enabled}
              onCheckedChange={(e) =>
                setExten((prev) => ({
                  ...prev,
                  items: prev.items.map((el, i) => (i === index ? { ...el, enabled: e.checked } : el)),
                }))
              }
            >
            </CheckboxUi>
          </Box>
          <Box width="30%">
            <Text>{item.feature}</Text>
          </Box>
          <Box width="30%">
            <InputUi
              value={item.exten}
              onChange={(e) =>
                setExten((prev) => ({
                  ...prev,
                  items: prev.items.map((el, i) => (i === index ? { ...el, exten: e.target.value } : el)),
                }))
              }
            />
          </Box>
        </Flex>
      ))}
    </FormContainer>
  );
};

export default ExtenForm;
