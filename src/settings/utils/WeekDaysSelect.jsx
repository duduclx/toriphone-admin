import { Flex, Text } from '@chakra-ui/react';
import { ReactSelectUi } from '../ui';
import { useTranslation } from 'react-i18next';

const weekDaysOptions = [
  { value: 1, label: 'Lundi' },
  { value: 2, label: 'Mardi' },
  { value: 3, label: 'Mercredi' },
  { value: 4, label: 'Jeudi' },
  { value: 5, label: 'Vendredi' },
  { value: 6, label: 'Samedi' },
  { value: 7, label: 'Dimanche' }
];

const WeekDaysSelect = ({ value, onChange }) => {
  // requirements
  const { t } = useTranslation("admin");
  
  const handleSelectAll = () => {
    onChange(weekDaysOptions.map(option => option.value));
  };

  const handleChange = (selectedOptions) => {
    onChange(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  return (
    <Flex flexDirection="column">
      <Flex justifyContent="space-between" >
        <Text p="8px 0 8px 0">{t("common.week_day")} :</Text> //
      <button onClick={handleSelectAll} style={{padding: '8px 0 8px 0', alignSelf: "end"}}>Sélectionner tout</button>
      </Flex>
      <ReactSelectUi
        isMulti
        options={weekDaysOptions}
        value={weekDaysOptions.filter(option => value.includes(option.value))}
        onChange={handleChange}
        placeholder={t("common.week_day_select")}
      />
    </Flex>
  );
};

export default WeekDaysSelect;
