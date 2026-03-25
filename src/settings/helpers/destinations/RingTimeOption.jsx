import { Box, Field } from "@chakra-ui/react";
import { NumberInputUi } from "../../ui";
import { useTranslation } from "react-i18next";

const RingTimeOption = ({ destination, setDestination, destinationType }) => {
  // requirements
  const { t } = useTranslation("admin");

  const change = (e) => {
    setDestination((prev) => ({
      ...prev,
      type: destinationType,
      ring_time: e.value === "" ? null : e.value,
    }));
  };

  return (
    <Box mt="4">
      <Field.Root>
        <Field.Label>{t("common.ring_time")} :</Field.Label>
        <NumberInputUi
          minW="300px"
          width="fit-content"
          min={0}
          value={destination?.ring_time === null ? "" : destination?.ring_time || ""}
          allowMouseWheel
          onValueChange={change}
        />
        <Field.HelperText>{t("common.ring_time_helper")}</Field.HelperText>
      </Field.Root>
    </Box>
  );
};

export default RingTimeOption;
