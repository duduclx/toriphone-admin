import { Field } from "@chakra-ui/react";
import { CheckboxUi, InputUi, NativeSelectUi, ReactSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import localeOptions from "../helpers/localeOptions";
import protocolOptions from "../helpers/protocolOptions";
import sipDtmfModeOptions from "../helpers/sipDtmfModeOptions";
import FormContainer from "../../../templates/forms/FormContainer";

const ConfigForm = ({ config, setConfig, timezones }) => {
  // requirements
  const { t } = useTranslation("admin");

  const handleChangeTimezone = (selected) => {
    if (selected === null) {
      setConfig((prev) => ({
        ...prev,
        config: {
          ...prev.config,
          raw_config: {
            ...prev.config.raw_config,
            timezone: null,
          },
        },
      }));
    } else {
      setConfig((prev) => ({
        ...prev,
        config: {
          ...prev.config,
          raw_config: {
            ...prev.config.raw_config,
            timezone: selected.label,
          },
        },
      }));
    }
  };

  return (
    <FormContainer>
      <Field.Root>
        <Field.Label>{t("provisioningDevice.label")}</Field.Label>
        <InputUi
          value={config.config.label || ""}
          onChange={(e) =>
            setConfig((prev) => ({
              ...prev,
              config: {
                ...prev.config,
                label: e.target.value,
              },
            }))
          }
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("provisioningDevice.language")}</Field.Label>
        <NativeSelectUi
          value={config.config.raw_config.locale || ""}
          onChange={(e) =>
            setConfig((prev) => ({
              ...prev,
              config: {
                ...prev.config,
                raw_config: {
                  ...prev.config.raw_config,
                  locale: e.target.value,
                },
              },
            }))
          }
        >
          {localeOptions.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </NativeSelectUi>
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("provisioningDevice.timezone")}</Field.Label>
        <ReactSelectUi
          name="timezones"
          isClearable
          options={timezones}
          value={timezones.find((tz) => tz.label === config.config.raw_config.timezone) || ""}
          onChange={handleChangeTimezone}
          placeholder={t("common.timezone_select")}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("provisioningDevice.protocol")}</Field.Label>
        <NativeSelectUi
          value={config.config.raw_config.protocol}
          onChange={(e) =>
            setConfig((prev) => ({
              ...prev,
              config: {
                ...prev.config,
                raw_config: {
                  ...prev.config.raw_config,
                  protocol: e.target.value,
                },
              },
            }))
          }
        >
          {protocolOptions.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </NativeSelectUi>
      </Field.Root>
      <Field.Root>
        <CheckboxUi
          checked={config.config.raw_config.ntp_enabled}
          onCheckedChange={(e) =>
            setConfig((prev) => ({
              ...prev,
              config: {
                ...prev.config,
                raw_config: {
                  ...prev.config.raw_config,
                  ntp_enabled: e.checked,
                },
              },
            }))
          }
        >
          {t("provisioningDevice.ntp_enabled")}
        </CheckboxUi>
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("provisioningDevice.ntp_server")}</Field.Label>
        <InputUi
          value={config.config.raw_config.ntp_ip || ""}
          onChange={(e) =>
            setConfig((prev) => ({
              ...prev,
              config: {
                ...prev.config,
                raw_config: {
                  ...prev.config.raw_config,
                  ntp_ip: e.target.value,
                },
              },
            }))
          }
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("provisioningDevice.phonebook_server")}</Field.Label>
        <InputUi
          value={config.config.raw_config.X_xivo_phonebook_ip || ""}
          onChange={(e) => {
            const newValue = e.target.value;
            setConfig((prev) => {
              const updatedRawConfig = { ...prev.config.raw_config };

              if (newValue === null || newValue === "") {
                delete updatedRawConfig.X_xivo_phonebook_ip;
              } else {
                updatedRawConfig.X_xivo_phonebook_ip = newValue;
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
        <Field.Label>{t("provisioningDevice.sip_dtmf_mode")}</Field.Label>
        <NativeSelectUi
          value={config.config.raw_config.sip_dtmf_mode || ""}
          onChange={(e) =>
            setConfig((prev) => ({
              ...prev,
              config: {
                ...prev.config,
                raw_config: {
                  ...prev.config.raw_config,
                  sip_dtmf_mode: e.target.value,
                },
              },
            }))
          }
        >
          {sipDtmfModeOptions.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </NativeSelectUi>
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("provisioningDevice.user_username")}</Field.Label>
        <InputUi
          value={config.config.raw_config.user_username || ""}
          onChange={(e) =>
            setConfig((prev) => ({
              ...prev,
              config: {
                ...prev.config,
                raw_config: {
                  ...prev.config.raw_config,
                  user_username: e.target.value,
                },
              },
            }))
          }
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("provisioningDevice.user_password")}</Field.Label>
        <InputUi
          value={config.config.raw_config.user_password || ""}
          onChange={(e) =>
            setConfig((prev) => ({
              ...prev,
              config: {
                ...prev.config,
                raw_config: {
                  ...prev.config.raw_config,
                  user_password: e.target.value,
                },
              },
            }))
          }
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("provisioningDevice.admin_username")}</Field.Label>
        <InputUi
          value={config.config.raw_config.admin_username || ""}
          onChange={(e) =>
            setConfig((prev) => ({
              ...prev,
              config: {
                ...prev.config,
                raw_config: {
                  ...prev.config.raw_config,
                  admin_username: e.target.value,
                },
              },
            }))
          }
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("provisioningDevice.admin_password")}</Field.Label>
        <InputUi
          value={config.config.raw_config.admin_password || ""}
          onChange={(e) =>
            setConfig((prev) => ({
              ...prev,
              config: {
                ...prev.config,
                raw_config: {
                  ...prev.config.raw_config,
                  admin_password: e.target.value,
                },
              },
            }))
          }
        />
      </Field.Root>
      <Field.Root>
        <CheckboxUi
          checked={config.config.raw_config.sip_subscribe_mwi}
          onCheckedChange={(e) =>
            setConfig((prev) => ({
              ...prev,
              config: {
                ...prev.config,
                raw_config: {
                  ...prev.config.raw_config,
                  sip_subscribe_mwi: e.checked,
                },
              },
            }))
          }
        >
          {t("provisioningDevice.sip_subscribe_mwi")}
        </CheckboxUi>
      </Field.Root>
    </FormContainer>
  );
};

export default ConfigForm;
