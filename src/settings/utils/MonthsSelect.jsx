import { Flex, Text } from "@chakra-ui/react";
import ReactSelectUi from "../ui/ReactSelectUi";
import { useTranslation } from "react-i18next";

const monthsOptions = [
  { value: 1, label: "Janvier" },
  { value: 2, label: "Février" },
  { value: 3, label: "Mars" },
  { value: 4, label: "Avril" },
  { value: 5, label: "Mai" },
  { value: 6, label: "Juin" },
  { value: 7, label: "Juillet" },
  { value: 8, label: "Août" },
  { value: 9, label: "Septembre" },
  { value: 10, label: "Octobre" },
  { value: 11, label: "Novembre" },
  { value: 12, label: "Décembre" },
];

const MonthsSelect = ({ value, onChange }) => {
  // requirements
  const { t } = useTranslation("admin");

  const handleSelectAll = () => {
    onChange(monthsOptions.map((option) => option.value));
  };

  const handleChange = (selectedOptions) => {
    onChange(selectedOptions ? selectedOptions.map((option) => option.value) : []);
  };

  return (
    <Flex flexDirection="column">
      <Flex justifyContent="space-between">
        <Text p="8px 0 8px 0">{t("common.month")} :</Text> //
        <button onClick={handleSelectAll} style={{ padding: "8px 0 8px 0", alignSelf: "end" }}>
          {t("common.select_all")}
        </button>
      </Flex>
      <ReactSelectUi
        isMulti
        options={monthsOptions}
        value={monthsOptions.filter((option) => value.includes(option.value))}
        onChange={handleChange}
        placeholder={t("common.month_select")}
      />
    </Flex>
  );
};

export default MonthsSelect;
