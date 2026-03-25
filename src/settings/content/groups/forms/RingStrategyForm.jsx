import { Field } from "@chakra-ui/react";
import { NativeSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

/*
usage in
GroupCreate
GroupEdit
*/

const RingStrategyForm = ({ ringstrategy, setRingstrategy }) => {
  // requirements
  const { t } = useTranslation("admin");

  const ringStrategyOptions = [
    { label: t("groups.ring_strategy.all"), value: "all" },
    { label: t("groups.ring_strategy.random"), value: "random" },
    { label: t("groups.ring_strategy.least_recent"), value: "least_recent" },
    { label: t("groups.ring_strategy.linear"), value: "linear" },
    { label: t("groups.ring_strategy.fewest_calls"), value: "fewest_calls" },
    { label: t("groups.ring_strategy.memorized_round_robin"), value: "memorized_round_robin" },
  ];

  return (
    <Field.Root>
      <Field.Label>{t("common.ring_strategy")} :</Field.Label>
      <NativeSelectUi
        value={ringstrategy}
        onChange={(e) => {
          setRingstrategy(e.target.value);
        }}
      >
        {ringStrategyOptions.map((ring) => (
          <option value={ring.value} key={ring.value}>
            {ring.label}
          </option>
        ))}
      </NativeSelectUi>
    </Field.Root>
  );
};

export default RingStrategyForm;
