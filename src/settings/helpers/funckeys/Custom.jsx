import { Box } from "@chakra-ui/react";
import { InputUi } from "../../ui";
import { useTranslation } from "react-i18next";

const Custom = ({ destination, setDestination, destinationType }) => {
  // requirements
  const { t } = useTranslation("admin");

  const change = (e) => {
    const destination = {
      exten: e.target.value,
      type: destinationType,
    };
    setDestination(destination);
  };

  return (
      <InputUi placeholder={t("common.extension_select")} value={destination?.exten || ""} onChange={(e) => change(e)} />
  );
};

export default Custom;
