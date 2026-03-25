import { useTranslation } from "react-i18next";
import SelectForm from "./SelectForm";
import { useApis } from "../../../ApiProvider";

const Switchboards = ({ destination, setDestination, destinationType }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { switchboardsGet } = useApis();

  const load = () => {
    return new Promise(async (resolve) => {
      const res = await switchboardsGet();
      const filtered = res.items.map((item) => ({
        label: item.name,
        value: item.uuid,
      }));
      resolve(filtered);
    });
  };

  const change = (item) => {
    const destination = {
      switchboard_uuid: item.value,
      type: destinationType,
      label: item.label,
    };
    setDestination(destination);
  };

  return (
    <SelectForm load={load} change={change} destination={destination} placeholder={t("common.switchboard_select")}/>
  );
};

export default Switchboards;
