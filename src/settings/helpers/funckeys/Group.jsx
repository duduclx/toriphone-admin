import { useTranslation } from "react-i18next";
import SelectForm from "./SelectForm";
import { useApis } from "../../../ApiProvider";

const Group = ({ destination, setDestination, destinationType }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { groupsGet } = useApis();

  const load = () => {
    return new Promise(async (resolve) => {
      const res = await groupsGet();
      const filtered = res.items.map((item) => ({
        label: item.label,
        name: item.name,
        value: item.id
      }));
      resolve(filtered);
    });
  };

  const change = (item) => {
    if(item) {
      const res = {
        ...destination,
        group_id: item.value,
        group_name: item.name,
        value: item.value,
        type: destinationType,
        label: item.label,
      };
      setDestination(res);
    } else {
      setDestination(null)
    }
  };

  return <SelectForm load={load} change={change} destination={destination} placeholder={t("common.group_select")} />;
};

export default Group;
