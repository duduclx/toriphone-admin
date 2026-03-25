import { useTranslation } from "react-i18next";
import TemplatePage from "../../templates/TemplatePage";
import BackendLdapForm from "./content/BackendLdapForm";

const BackendLdap = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <TemplatePage title={t("backendLdap.list.title")} isList hasNoAdd>
      <BackendLdapForm setSelectedComponent={setSelectedComponent} />
    </TemplatePage>
  );
};

export default BackendLdap;
