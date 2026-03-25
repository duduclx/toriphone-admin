import { useTranslation } from "react-i18next";
import SelectForm from "./SelectForm";
import { useApis } from "../../../ApiProvider";

const Conference = ({ destination, setDestination, destinationType }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { conferencesGet } = useApis();

  const load = () => {
    return new Promise(async (resolve) => {
      const res = await conferencesGet();
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
        conference_id: item.value,
        conference_name: item.label,
        type: destinationType,
        label: item.label,
        value: item.value
      };
      setDestination(destination);
    } else {
      setDestination(null)
    }
  };

  return (
    <SelectForm load={load} change={change} destination={destination} placeholder={t("common.conference_select")} />
  );
};

export default Conference;
