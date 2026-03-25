import { Field } from "@chakra-ui/react";
import { NativeSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

const LineContext = ({ contextsOptions, line, setLine }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <Field.Root>
      <Field.Label>{t("lines.context")} :</Field.Label>
        <NativeSelectUi
          value={line.context || ""}
          onChange={(e) =>
            setLine({
              ...line,
              context: e.target.value,
            })
          }
        >
          {contextsOptions &&
            contextsOptions.map((item, index) => (
              <option key={index} value={item.name}>
                {item.label}
              </option>
            ))}
        </NativeSelectUi>
    </Field.Root>
  );
};

export default LineContext;
