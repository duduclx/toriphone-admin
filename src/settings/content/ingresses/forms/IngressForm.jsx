import { Field } from "@chakra-ui/react";
import { InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

const IngressForm = ({ ingress, setIngress }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <Field.Root>
      <Field.Label>{t("common.uri")} :</Field.Label>
      <InputUi
        required
        placeholder={t("common.uri")}
        value={ingress.uri}
        onChange={(e) => setIngress({ ...ingress, uri: e.target.value })}
      />
    </Field.Root>
  );
};

export default IngressForm;
