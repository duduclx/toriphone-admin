import { Field } from "@chakra-ui/react";
import { InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import TrunkContextForm from "./TrunkContextForm";
import FormContainer from "../../../templates/forms/FormContainer";

const TrunkCustomform = ({ trunk, setTrunk, context, setContext }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <FormContainer width="50%" m="auto" mt="8">
      <TrunkContextForm context={context} setContext={setContext} />
      <Field.Root>
        <Field.Label>{t("trunks.interface")} :</Field.Label>
        <InputUi
          required
          placeholder={t("trunks.interface")}
          value={trunk.endpoint_custom?.interface}
          onChange={(e) =>
            setTrunk({
              ...trunk,
              endpoint_custom: {
                ...trunk.endpoint_custom,
                interface: e.target.value,
                label: e.target.value,
              },
            })
          }
        />
        <Field.HelperText>{t("trunks.interface_helper")}</Field.HelperText>
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("trunks.interface_suffix")} :</Field.Label>
        <InputUi
          placeholder={t("trunks.interface_suffix")}
          value={trunk.endpoint_custom?.interface_suffix}
          onChange={(e) =>
            setTrunk({
              ...trunk,
              endpoint_custom: {
                ...trunk.endpoint_custom,
                interface_suffix: e.target.value,
              },
            })
          }
        />
      </Field.Root>
    </FormContainer>
  );
}

export default TrunkCustomform
