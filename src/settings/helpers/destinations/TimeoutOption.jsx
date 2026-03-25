import { Field } from "@chakra-ui/react";
import { NumberInputUi } from "../../ui";
import { useTranslation } from "react-i18next";

const TimeoutOption = ({ destination, setDestination, destinationType }) => {
  // requirements
  const { t } = useTranslation("admin");

  const handleTimeoutChange = (e) => {
    setDestination((prev) => ({
      ...prev,
      type: destinationType,
      timeout: e.value === "" ? null : e.value,
    }));
  };

  return (
      <Field.Root>
        <Field.Label>{t("common.timeout_destination")} :</Field.Label>
        <NumberInputUi
          minW="300px"
          width="fit-content"
          min={0}
          value={destination?.timeout === null ? "" : destination.timeout || ""}
          allowMouseWheel
          onValueChange={handleTimeoutChange}
        />
        <Field.HelperText>{t("common.timeout_destination_helper")}</Field.HelperText>
      </Field.Root>
  );
};

export default TimeoutOption;
