import { Button, Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const ButtonsFormsAdd = ({ setSelectedComponent, route, submit, loading }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <Flex justifyContent="space-between">
      <Button colorPalette="danger" mt="4" onClick={() => setSelectedComponent(route)} disabled={loading}>
        {t("common.cancel")}
      </Button>
      <Button colorPalette="primary"  mt="4" onClick={submit} disabled={loading}>
        {t("common.add")}
      </Button>
    </Flex>
  );
};

export default ButtonsFormsAdd;
