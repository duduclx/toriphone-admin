import { Box } from "@chakra-ui/react";
import { InputUi } from "../../ui";
import { useTranslation } from "react-i18next";

const ForwardOptions = ({ destination, setDestination, destinationType }) => {
  // requirements
  const { t } = useTranslation("admin");

  const changeExten = (e) => {
    const updt = {
      ...destination,
      type: destinationType,
      exten: e.target.value,
    };
    setDestination(updt);
  };

  return (
      <InputUi
        placeholder={t("common.number_select")}
        value={destination?.exten || ""}
        onChange={(e) => changeExten(e)}
      />
  );
};

export default ForwardOptions;
