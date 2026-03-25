import { Field } from "@chakra-ui/react";
import { InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import LineContext from "../helper/LineContext";

const LineEditCustom = ({ contextsOptions, line, setLine, endpointSip, setEndpointSip }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      <LineContext contextsOptions={contextsOptions} line={line} setLine={setLine} />
      {endpointSip && (
        <>
          <Field.Root>
            <Field.Label>{t("lines.interface")} :</Field.Label>
            <InputUi
              required
              placeholder={t("lines.interface")}
              value={endpointSip.interface || ""}
              onChange={(e) =>
                setEndpointSip({
                  ...endpointSip,
                  interface: e.target.value,
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
              value={endpointSip.interface_suffix || ""}
              onChange={(e) =>
                setEndpointSip({
                  ...endpointSip,
                  interface_suffix: e.target.value,
                })
              }
            />
          </Field.Root>
        </>
      )}
    </>
  );
};

export default LineEditCustom;
