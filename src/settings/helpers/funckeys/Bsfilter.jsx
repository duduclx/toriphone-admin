import { useTranslation } from "react-i18next";
import SelectForm from "./SelectForm";

import { useApis } from "../../../ApiProvider";

const Bsfilter = ({ destination, setDestination, destinationType }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { callfiltersGet } = useApis();

  const load = () => {
    return new Promise(async (resolve) => {
      const res = await callfiltersGet();
      const filtered = res.items.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      resolve(filtered);
    });
  };

  const change = (item) => {
    const res = {
      ...destination,
      value: item.value,
      type: destinationType,
      label: item.label,
    };
    setDestination(res);
  };

  return <SelectForm load={load} change={change} destination={destination} placeholder={t("common.group_select")} />;
};

export default Bsfilter;
