import { useTranslation } from "react-i18next";
import SelectForm from "./SelectForm";
import { useApis } from "../../../ApiProvider";

const Ivr = ({ destination, setDestination, destinationType }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { ivrsGet } = useApis();

  const load = () => {
    return new Promise(async (resolve) => {
      const res = await ivrsGet();
      const filtered = res.items.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      resolve(filtered);
    });
  };

  const change = (item) => {
    const destination = {
      ivr_id: item.value,
      ivr_name: item.label,
      type: destinationType,
      label: item.label,
    };
    setDestination(destination);
  };

  return <SelectForm load={load} change={change} destination={destination} placeholder={t("common.ivr_select")} />;
};

export default Ivr;
