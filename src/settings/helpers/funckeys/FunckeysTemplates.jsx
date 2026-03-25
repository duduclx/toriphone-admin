import { useTranslation } from "react-i18next";
import SelectForm from "./SelectForm";
import { useApis } from "../../../ApiProvider";

const FunckeysTemplates = ({ destination, setDestination, width }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { funckeysTemplatesGet } = useApis();

  const load = () => {
    return new Promise(async (resolve) => {
      const res = await funckeysTemplatesGet();
      const filtered = res.items.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      resolve(filtered);
    });
  };

  const change = (item) => {
    if(item) {
      const destination = {
        id: item.value,
        name: item.label,
        label: item.label,
      };
      setDestination(destination);
    } else {
      setDestination(null)
    }
  };

  return (
    <SelectForm load={load} change={change} destination={destination} placeholder={t("destinations.funckeys.funckey_select")} width={width}/>
  );
}

export default FunckeysTemplates
