import { Flex, Field } from "@chakra-ui/react";
import { NativeSelectUi } from "../../ui";
import { useTranslation } from "react-i18next";

const LocalizationForm = ({ item, setItem }) => {
  // requirements
  const { t } = useTranslation("admin");

  // options
  const lnOptions = ["FR", "CA"];

  return (
    <Flex>
      <Field.Root>
        <Field.Label>{t("localization.select")}</Field.Label>
        <NativeSelectUi value={item.country || ""} onChange={(e) => setItem({ country: e.target.value })}>
          <option>{t("localization.select")}</option>
          {lnOptions.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </NativeSelectUi>
      </Field.Root>
    </Flex>
  );
};

export default LocalizationForm;
