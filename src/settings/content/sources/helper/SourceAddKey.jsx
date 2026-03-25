import { useTranslation } from "react-i18next";
import { ButtonAddUi } from "../../../ui";

const SourceAddKey = ({addKey}) => {
    // requirements
    const { t } = useTranslation("admin");

  return (
    <ButtonAddUi text={t("sources.add")} onClick={addKey}/>
  )
}

export default SourceAddKey
