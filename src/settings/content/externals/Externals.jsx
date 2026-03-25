import { useTranslation } from "react-i18next";
import ExternalList from "./content/ExternalList";
import TemplatePage from "../../templates/TemplatePage";
import { useApis } from "../../../ApiProvider";

const Externals = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { externalServices } = useApis();

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("external.list.title")}
      route={"externalCreate"}
      isList
      hasNoAdd={externalServices.length > 0 ? false : true}
    >
      <ExternalList setSelectedComponent={setSelectedComponent} />
    </TemplatePage>
  );
};

export default Externals;
