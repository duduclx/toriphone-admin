import { Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { AsyncSelectUi } from "../../ui";

const Hangup = ({ destination, setDestination, destinationType }) => {
  // requirements
  const { t } = useTranslation("admin");

  const hangupOptions = [
    { label: t("common.hangup_normal"), value: "normal" },
    { label: t("common.hangup_busy"), value: "busy" },
    { label: t("common.hangup_congestion"), value: "congestion" },
  ];

  const handleHangupChange = (selectedhangup) => {
    const hang = {
      type: destinationType,
      label: selectedhangup.label,
      cause: selectedhangup.value,
    };
    setDestination(hang);
  };

  return (
    <Box minW="300px" width="full">
      <AsyncSelectUi
        defaultOptions={hangupOptions}
        onChange={handleHangupChange}
        value={destination || ""}
        placeholder={t("common.hangup_select")}
      />
    </Box>
  );
};

export default Hangup;
