import { Button } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const ButtonAdd = ({ setSelectedComponent, route }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <Button colorPalette="primary" onClick={() => setSelectedComponent(route)}>
      <FaPlus />
      {t("common.add")}
    </Button>
  );
};

export default ButtonAdd;
