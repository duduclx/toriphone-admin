import { useTranslation } from "react-i18next";
import SelectForm from "./SelectForm";

import { useApis } from "../../../ApiProvider";

const Queue = ({ destination, setDestination, destinationType }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { queuesGet } = useApis();

  const load = () => {
    return new Promise(async (resolve) => {
      const res = await queuesGet();
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
        queue_id: item.value
      };
      setDestination(res);
    } else {
      setDestination(null)
    }
  };

  return <SelectForm load={load} change={change} destination={destination} placeholder={t("common.queue_select")} />;
};

export default Queue;
