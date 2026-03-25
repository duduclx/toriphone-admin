import { useTranslation } from "react-i18next";

const useProtocolOptions = () => {
    // requirements
    const { t } = useTranslation();

    const protocolOptions = [
        { label: "SIP", value: "sip" },
        { label: "SCCP", value: "sccp" },
        { label: "CUSTOM", value: "custom" },
      ];

  return {
    protocolOptions
  }
}

export default useProtocolOptions
