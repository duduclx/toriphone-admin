import { Field } from "@chakra-ui/react";
import { CheckboxUi, InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../templates/forms/FormContainer";

const AdvancedForm = ({ config, setConfig }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <FormContainer>
      <Field.Root>
        <CheckboxUi
          checked={!!config.config.raw_config.vlan_enabled}
          onCheckedChange={(e) => {
            const isChecked = e.checked;
            setConfig((prev) => {
              const updatedRawConfig = { ...prev.config.raw_config };

              if (!isChecked) {
                // Retire vlan_enabled si le checkbox est décoché
                delete updatedRawConfig.vlan_enabled;
              } else {
                // Ajoute ou met à jour vlan_enabled si le checkbox est coché
                updatedRawConfig.vlan_enabled = true;
              }

              return {
                ...prev,
                config: {
                  ...prev.config,
                  raw_config: updatedRawConfig,
                },
              };
            });
          }}
        >
          {t("provisioningDevice.vlan_enabled")}
        </CheckboxUi>
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("provisioningDevice.vlan_id")}</Field.Label>
        <InputUi
          value={config.config.raw_config.vlan_id || ""}
          onChange={(e) => {
            const newValue = e.target.value;
            setConfig((prev) => {
              const updatedRawConfig = { ...prev.config.raw_config };

              if (newValue === null || newValue === "") {
                delete updatedRawConfig.vlan_id;
              } else {
                updatedRawConfig.vlan_id = newValue;
              }

              return {
                ...prev,
                config: {
                  ...prev.config,
                  raw_config: updatedRawConfig,
                },
              };
            });
          }}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("provisioningDevice.vlan_priority")}</Field.Label>
        <InputUi
          value={config.config.raw_config.vlan_priority || ""}
          onChange={(e) => {
            const newValue = e.target.value;
            setConfig((prev) => {
              const updatedRawConfig = { ...prev.config.raw_config };

              if (newValue === null || newValue === "") {
                delete updatedRawConfig.vlan_priority;
              } else {
                updatedRawConfig.vlan_priority = newValue;
              }

              return {
                ...prev,
                config: {
                  ...prev.config,
                  raw_config: updatedRawConfig,
                },
              };
            });
          }}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("provisioningDevice.vlan_pc_port_id")}</Field.Label>
        <InputUi
          value={config.config.raw_config.vlan_pc_port_id || ""}
          onChange={(e) => {
            const newValue = e.target.value;
            setConfig((prev) => {
              const updatedRawConfig = { ...prev.config.raw_config };

              if (newValue === null || newValue === "") {
                delete updatedRawConfig.vlan_pc_port_id;
              } else {
                updatedRawConfig.vlan_pc_port_id = newValue;
              }

              return {
                ...prev,
                config: {
                  ...prev.config,
                  raw_config: updatedRawConfig,
                },
              };
            });
          }}
        />
      </Field.Root>
    </FormContainer>
  );
};

export default AdvancedForm;
