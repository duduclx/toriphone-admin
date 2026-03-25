import { useTranslation } from "react-i18next";
import TemplatePage from "../../templates/TemplatePage";
import ProfilesList from "./content/ProfilesList";

const Profiles = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <TemplatePage title={t("profiles.list.title")} isList hasNoAdd>
      <ProfilesList setSelectedComponent={setSelectedComponent} />
    </TemplatePage>
  );
};

export default Profiles;
