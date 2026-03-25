import { Box, Flex } from "@chakra-ui/react";
import { InputUi } from "../../ui";
import { useTranslation } from "react-i18next";

const Extension = ({ destination, setDestination, destinationType }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <Box minW="300px" width="full">
      <Flex gap="4" w="100%">
          <InputUi
          placeholder={t("common.context")}
          value={destination?.context || ""}
          onChange={(e) => setDestination((prev) => ({
            ...prev,
            type: destinationType,
            context: e.target.value
          }))}
          />
          <InputUi
          placeholder={t("common.extension")}
          value={destination?.exten || ""}
          onChange={(e) => setDestination((prev) => ({
            ...prev,
            type: destinationType,
            exten: e.target.value
          }))}
          />
      </Flex>

    </Box>
  );
};

export default Extension;
