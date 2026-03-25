import { Flex, Text } from '@chakra-ui/react';
import { ReactSelectUi } from '../ui';
import { useTranslation } from 'react-i18next';

const monthDaysOptions = Array.from({ length: 31 }, (_, i) => ({
  value: i + 1,
  label: (i + 1).toString().padStart(2, '0')
}));

const MonthDaysSelect = ({ value, onChange }) => {
  // requirements
  const { t } = useTranslation("admin");
  
  const handleSelectAll = () => {
    onChange(monthDaysOptions.map(option => option.value));
  };

  const handleChange = (selectedOptions) => {
    onChange(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  return (
    <Flex flexDirection="column">
      <Flex justifyContent="space-between">
      <Text p="8px 0 8px 0">{t("common.month_day")} :</Text> //
      <button onClick={handleSelectAll} style={{padding: '8px 0 8px 0', alignSelf: "end"}}>Sélectionner tout</button>
      </Flex>
      <ReactSelectUi
        isMulti
        options={monthDaysOptions}
        value={monthDaysOptions.filter(option => value.includes(option.value))}
        onChange={handleChange}
        placeholder={t("common.month_day_select")}
      />
    </Flex>
  );
};

export default MonthDaysSelect;
