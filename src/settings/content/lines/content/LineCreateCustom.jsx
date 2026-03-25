import { Field } from "@chakra-ui/react";
import { InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import LineContext from "../helper/LineContext";

const LineCreateCustom = ({ contextsOptions, line, setLine }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      <LineContext contextsOptions={contextsOptions} line={line} setLine={setLine} />
      <Field.Root>
        <Field.Label>{t("lines.interface")} :</Field.Label>
        <InputUi
          required
          placeholder={t("lines.interface")}
          value={line.endpoint_custom?.interface || ""}
          onChange={(e) =>
            setLine({
              ...line,
              endpoint_custom: {
                ...line.endpoint_custom,
                interface: e.target.value,
              },
            })
          }
        />
        <Field.HelperText>{t("lines.interface_helper")}</Field.HelperText>
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("lines.interface_suffix")} :</Field.Label>
        <InputUi
          required
          placeholder={t("lines.interface_suffix")}
          value={line.endpoint_custom?.interface_suffix || ""}
          onChange={(e) =>
            setLine({
              ...line,
              endpoint_custom: {
                ...line.endpoint_custom,
                interface_suffix: e.target.value,
              },
            })
          }
        />
        <Field.HelperText>{t("lines.interface_helper")}</Field.HelperText>
      </Field.Root>
    </>
  );
};

export default LineCreateCustom;
