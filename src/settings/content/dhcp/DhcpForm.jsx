import { Field } from "@chakra-ui/react";
import { CheckboxUi, InputUi } from "../../ui";
import { useTranslation } from "react-i18next";
import FormContainer from "../../templates/forms/FormContainer";

const DhcpForm = ({ dhcp, setDhcp }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <FormContainer>
      <Field.Root>
        <Field.Label>{t("dhcp.pool_start")}</Field.Label>
        <InputUi
          value={dhcp.pool_start || ""}
          placeholder={t("dhcp.pool_start_placeholder")}
          onChange={(e) =>
            setDhcp({
              ...dhcp,
              pool_start: e.target.value,
            })
          }
        />
        <Field.HelperText>{t("dhcp.pool_start_helper")}</Field.HelperText>
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("dhcp.pool_end")}</Field.Label>
        <InputUi
          value={dhcp.pool_end || ""}
          placeholder={t("dhcp.pool_end_placeholder")}
          onChange={(e) =>
            setDhcp({
              ...dhcp,
              pool_end: e.target.value,
            })
          }
        />
        <Field.HelperText>{t("dhcp.pool_end_helper")}</Field.HelperText>
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("dhcp.network_interfaces")}</Field.Label>
        <InputUi
          value={dhcp.network_interfaces?.[0] || ""}
          placeholder={t("dhcp.network_interfaces_placeholder")}
          onChange={(e) =>
            setDhcp({
              ...dhcp,
              network_interfaces: [e.target.value],
            })
          }
        />
        <Field.HelperText>{t("dhcp.network_interfaces_helper")}</Field.HelperText>
      </Field.Root>
      <CheckboxUi
        checked={dhcp.active}
        onCheckedChange={(e) =>
          setDhcp({
            ...dhcp,
            active: e.checked,
          })
        }
      >
        {t("common.enabled")}
      </CheckboxUi>
    </FormContainer>
  );
};

export default DhcpForm;
