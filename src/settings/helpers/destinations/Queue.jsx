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
    const res = {
      ...destination,
      skill_rule_id: destination?.skill_rule_id ? destination.skill_rule_id : null,
      skill_rule: destination?.skill_rule ? destination.skill_rule : null,
      queue_id: item.value,
      queue_label: item.label,
      type: destinationType,
      label: item.label,
    };
    setDestination(res);
  };

  return <SelectForm load={load} change={change} destination={destination} placeholder={t("common.queue_select")} />;
};

export default Queue;
