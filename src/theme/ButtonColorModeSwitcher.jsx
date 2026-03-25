import { Button } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useColorModeValue, useColorMode } from "../components/ui/color-mode";

const ButtonColorModeSwitcher = () => {
  const { t } = useTranslation("admin");
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaSun, FaMoon);

  return (
    <Button
      variant="ghost"
      _hover={{ bg: "btnMenuHover" }}
      borderRadius={0}
      my={1}
      w="100%"
      justifyContent="flex-start"
      onClick={() => toggleColorMode()}
    >
      <SwitchIcon /> {t("about.theme")}
    </Button>
  );
};

export default ButtonColorModeSwitcher;
