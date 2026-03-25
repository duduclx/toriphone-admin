import { Flex, Field } from "@chakra-ui/react";
import { NativeSelectUi, InputUi, CheckboxUi } from "../../../ui";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../templates/forms/FormContainer";

const AccessFeatureForm = ({ accessFeature, setAccessFeature }) => {
  // requirements
  const { t } = useTranslation("admin");

  const accessFeatureOptions = [{ label: "phonebook", value: "phonebook" }];

  return (
    <FormContainer>
      <Field.Root>
        <Field.Label>{t("common.host")}:</Field.Label>
        <InputUi
          required
          placeholder={t("common.host")}
          value={accessFeature.host}
          onChange={(e) => setAccessFeature({ ...accessFeature, host: e.target.value })}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.feature")} :</Field.Label>
        <NativeSelectUi
          value={accessFeature.feature || ""}
          onChange={(e) => setAccessFeature({ ...accessFeature, feature: e.target.value })}
        >
          {accessFeatureOptions.map((item, index) => (
            <option value={item.value} key={index}>
              {item.label}
            </option>
          ))}
        </NativeSelectUi>
      </Field.Root>
      <CheckboxUi
        checked={accessFeature.enabled}
        onCheckedChange={(e) => setAccessFeature({ ...accessFeature, enabled: e.checked })}
      >
        {t("common.enabled")}
      </CheckboxUi>
    </FormContainer>
  );
};

export default AccessFeatureForm;
