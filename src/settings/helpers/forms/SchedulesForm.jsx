import { Field } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../ApiProvider";
import { AsyncSelectUi } from "../../ui";

/*
usage in
IncallsForm
GroupCreate
GroupEdit
QueueCreate
QueueEdit
OutcallsEdit
*/

const SchedulesForm = ({ schedule, setSchedule }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { schedulesGet } = useApis()

  // shedules
  const loadSchedules = () => {
      return new Promise(async (resolve) => {
          const schedules = await schedulesGet();
          const filteredSchedules = schedules.items.map((schedule) => ({
          ...schedule,
          label: schedule.name,
          value: schedule.id,
          }));
          resolve(filteredSchedules);
      });
  };
  
  // onchange
  const handleScheduleChange = (selectedOptions) => {
    setSchedule(selectedOptions)
  };

  return (
    <Field.Root>
      <Field.Label>{t("common.schedule")} :</Field.Label>
      <AsyncSelectUi
        cacheOptions
        loadOptions={loadSchedules}
        defaultOptions
        isClearable
        onChange={handleScheduleChange}
        value={schedule}
        placeholder={t("common.schedule_select")} 
      />
    </Field.Root>
  );
};

export default SchedulesForm;
