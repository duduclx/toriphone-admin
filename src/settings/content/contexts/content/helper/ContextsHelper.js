import { useTranslation } from "react-i18next"

const ContextsHelper = () => {

    const {t} = useTranslation("admin");

    const typeOptions = [
        {label: t("common.internal"), value: "internal"},
        {label: t("common.incall"), value: "incall"},
        {label: t("common.outcall"), value: "outcall"},
        //{label: "services", value: "services"},
        //{label: "autres", value: "others"},
    ]

  return { typeOptions }
}

export default ContextsHelper