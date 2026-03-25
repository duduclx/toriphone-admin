import { Button, Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const ButtonsFormsEdit = ({ setSelectedComponent, route, submit, loading, text = null }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <Flex justifyContent={route == "none" ? "center" : "space-between"}>
      {route !== "none" && (
      <Button colorPalette="danger" mt="4" onClick={() => setSelectedComponent(route)} disabled={loading}>
        {t("common.cancel")}
      </Button>
      )}
      <Button colorPalette="secondary" mt="4" onClick={submit} disabled={loading}>
        {text ? text : t("common.update")}
      </Button>
    </Flex>
  );
};

export default ButtonsFormsEdit;
