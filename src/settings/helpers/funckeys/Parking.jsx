import { useTranslation } from "react-i18next";
import SelectForm from "./SelectForm";
import { useApis } from "../../../ApiProvider";

const Parking = ({ destination, setDestination, destinationType }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { parkingLotsGet } = useApis();

  const load = () => {
    return new Promise(async (resolve) => {
      const res = await parkingLotsGet();
      const filtered = res.items.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      resolve(filtered);
    });
  };

  const change = (item) => {
    if(item) {
      const res = {
        ...destination,
        value: item.value,
        type: destinationType,
        label: item.label,
        parking_lot_id: item.value,
        parking_lot_name: item.label
      };
      setDestination(res);
    } else {
      setDestination(null)
    }
  };

  return <SelectForm load={load} change={change} destination={destination} placeholder={t("common.parking_select")} />;
};

export default Parking;
