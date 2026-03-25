import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import TemplatePage from "../../templates/TemplatePage";
import IngressesList from "./content/IngressesList";
import { useApis } from "../../../ApiProvider";

const Ingresses = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { ingresses, ingressesGet } = useApis();

  useEffect(() => {
    ingressesGet();
  }, []);

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("ingresses.list.title")}
      route={"ingressCreate"}
      isList
      hasNoAdd={ingresses && ingresses.total > 0 ? true : false}
    >
      <IngressesList setSelectedComponent={setSelectedComponent} />
    </TemplatePage>
  );
};

export default Ingresses;
