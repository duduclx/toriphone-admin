import { Field } from "@chakra-ui/react";
import { InputUi } from "../../ui";
import { useTranslation } from "react-i18next";

const Custom = ({ destination, setDestination, destinationType }) => {
  // requirements
  const { t } = useTranslation("admin");

  const handleChange = (item) => {
    const transformedDestination = {
      command: item.target.value,
      type: destinationType,
    };
    setDestination(transformedDestination);
  };

  return (
    <Field.Root>
      <InputUi
        required
        placeholder={t("common.command_select")}
        value={destination?.command || ""}
        onChange={handleChange}
      />
      <Field.HelperText>{t("common.command_helper")}</Field.HelperText>
    </Field.Root>
  );
};

export default Custom;
