import { useTranslation } from "react-i18next";

const VoicemailHelper = () => {
    // requirements
    const { t } = useTranslation("admin");

    // functions
    const languagesOptions = [
        { label: t("common.none"), value: "none" },
        { label: t("common.french"), value: "fr_FR" },
        { label: t("common.french_canadian"), value: "fr_CA" },
        { label: t("common.english"), value: "en_US" },
      ];

  return { languagesOptions }
}

export default VoicemailHelper