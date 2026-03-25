import { Flex, Field } from "@chakra-ui/react";
import { InputUi, NativeSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../templates/forms/FormContainer";

const GeneralForm = ({ rtp, setRtp }) => {
  // requirements
  const { t } = useTranslation("admin");

  // options
  const options = [
    { label: t("rtp.yes"), value: "yes" },
    { label: t("rtp.no"), value: "no" },
  ];

  const strictOptions = [
    { label: t("rtp.yes"), value: "yes" },
    { label: t("rtp.no"), value: "no" },
    { label: t("rtp.seqno"), value: "seqno" },
  ];

  // string forms
  const handleInputChange = (key, value) => {
    setRtp((prev) => {
      const newOptions = { ...prev.options };

      if (value === "") {
        delete newOptions[key];
      } else {
        newOptions[key] = value;
      }

      return {
        ...prev,
        options: newOptions,
      };
    });
  };

  return (
    <FormContainer>
      <Field.Root>
        <Flex flexDirection="row" gap="4" alignItems="center">
          <Field.Label width="300px">{t("rtp.rtp_start")}</Field.Label>
          <InputUi value={rtp.options.rtpstart || ""} onChange={(e) => handleInputChange("rtpstart", e.target.value)} />
        </Flex>
      </Field.Root>
      <Field.Root>
        <Flex flexDirection="row" gap="4" alignItems="center">
          <Field.Label width="300px">{t("rtp.rtp_end")}</Field.Label>
          <InputUi value={rtp.options.rtpend || ""} onChange={(e) => handleInputChange("rtpend", e.target.value)} />
        </Flex>
      </Field.Root>
      <Field.Root>
        <Flex flexDirection="row" gap="4" alignItems="center">
          <Field.Label width="300px">{t("rtp.rtp_check_sums")}</Field.Label>
          <NativeSelectUi
            value={rtp.options.rtpchecksums}
            onChange={(e) =>
              setRtp((prev) => ({
                ...prev,
                options: {
                  ...prev.options,
                  rtpchecksums: e.target.value,
                },
              }))
            }
          >
            {options.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </NativeSelectUi>
        </Flex>
      </Field.Root>
      <Field.Root>
        <Flex flexDirection="row" gap="4" alignItems="center">
          <Field.Label width="300px">{t("rtp.dtmf_timeout")}</Field.Label>
          <InputUi
            value={rtp.options.dtmftimeout || ""}
            onChange={(e) => handleInputChange("dtmftimeout", e.target.value)}
          />
        </Flex>
      </Field.Root>
      <Field.Root>
        <Flex flexDirection="row" gap="4" alignItems="center">
          <Field.Label width="300px">{t("rtp.rtcp_interval")}</Field.Label>
          <InputUi
            value={rtp.options.rtcpinterval || ""}
            onChange={(e) => handleInputChange("rtcpinterval", e.target.value)}
          />
        </Flex>
      </Field.Root>
      <Field.Root>
        <Flex flexDirection="row" gap="4" alignItems="center">
          <Field.Label width="300px">{t("rtp.strict_rtp")}</Field.Label>
          <NativeSelectUi
            value={rtp.options.strictrtp}
            onChange={(e) =>
              setRtp((prev) => ({
                ...prev,
                options: {
                  ...prev.options,
                  strictrtp: e.target.value,
                },
              }))
            }
          >
            {strictOptions.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </NativeSelectUi>
        </Flex>
      </Field.Root>
      <Field.Root>
        <Flex flexDirection="row" gap="4" alignItems="center">
          <Field.Label width="300px">{t("rtp.probation")}</Field.Label>
          <InputUi value={rtp.options.probation || ""} onChange={(e) => handleInputChange("probation", e.target.value)} />
        </Flex>
      </Field.Root>
      <Field.Root>
        <Flex flexDirection="row" gap="4" alignItems="center">
          <Field.Label width="300px">{t("rtp.ice_support")}</Field.Label>
          <NativeSelectUi
            value={rtp.options.icesupport}
            onChange={(e) =>
              setRtp((prev) => ({
                ...prev,
                options: {
                  ...prev.options,
                  icesupport: e.target.value,
                },
              }))
            }
          >
            {options.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </NativeSelectUi>
        </Flex>
      </Field.Root>
      <Field.Root>
        <Flex flexDirection="row" gap="4" alignItems="center">
          <Field.Label width="300px">{t("rtp.stun_address")}</Field.Label>
          <InputUi value={rtp.options.stunaddr || ""} onChange={(e) => handleInputChange("stunaddr", e.target.value)} />
        </Flex>
      </Field.Root>
      <Field.Root>
        <Flex flexDirection="row" gap="4" alignItems="center">
          <Field.Label width="300px">{t("rtp.stun_blacklist")}</Field.Label>
          <InputUi
            value={rtp.options.stun_blacklist || ""}
            onChange={(e) => handleInputChange("stun_blacklist", e.target.value)}
          />
        </Flex>
      </Field.Root>
      <Field.Root>
        <Flex flexDirection="row" gap="4" alignItems="center">
          <Field.Label width="300px">{t("rtp.turn_address")}</Field.Label>
          <InputUi value={rtp.options.turnaddr || ""} onChange={(e) => handleInputChange("turnaddr", e.target.value)} />
        </Flex>
      </Field.Root>
      <Field.Root>
        <Flex flexDirection="row" gap="4" alignItems="center">
          <Field.Label width="300px">{t("rtp.turn_username")}</Field.Label>
          <InputUi
            value={rtp.options.turnusername || ""}
            onChange={(e) => handleInputChange("turnusername", e.target.value)}
          />
        </Flex>
      </Field.Root>
      <Field.Root>
        <Flex flexDirection="row" gap="4" alignItems="center">
          <Field.Label width="300px">{t("rtp.turn_password")}</Field.Label>
          <InputUi
            value={rtp.options.turnpassword || ""}
            onChange={(e) => handleInputChange("turnpassword", e.target.value)}
          />
        </Flex>
      </Field.Root>
      <Field.Root>
        <Flex flexDirection="row" gap="4" alignItems="center">
          <Field.Label width="300px">{t("rtp.ice_blacklist")}</Field.Label>
          <InputUi
            value={rtp.options.ice_blacklist || ""}
            onChange={(e) => handleInputChange("ice_blacklist", e.target.value)}
          />
        </Flex>
      </Field.Root>
    </FormContainer>
  );
};

export default GeneralForm;
