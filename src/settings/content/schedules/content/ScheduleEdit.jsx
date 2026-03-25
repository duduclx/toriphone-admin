import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import getLabelForFallback from "../../../helpers/DestinationsHelper";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";
import ScheduleForm from "../forms/ScheduleForm";

const ScheduleEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { scheduleSelected, scheduleEdit, timezones, timezonesGet } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // timezone
  const [timezone, setTimezone] = useState({
    label: scheduleSelected.timezone,
    value: scheduleSelected.timezone,
  });

  // resource
  const [schedule, setSchedule] = useState({
    ...scheduleSelected,
    timezone: timezone.value,
    exceptional_periods: scheduleSelected.exceptional_periods
      ? scheduleSelected.exceptional_periods.map((period) => ({
          ...period,
          destination: getLabelForFallback(period.destination),
        }))
      : [],
  });

  // destination form
  const [destination, setDestination] = useState(getLabelForFallback(scheduleSelected.closed_destination));

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const updatedSchedule = { ...schedule, timezone: schedule.timezone.value };

    const res = await scheduleEdit(updatedSchedule);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("schedules");
    }
  };

  useEffect(() => {
    timezonesGet();
  }, []);

  return (
    <TemplatePage
      title={t("schedules.edit.title", { name: scheduleSelected.name })}
      setSelectedComponent={setSelectedComponent}
      route={"schedules"}
      submit={submit}
      isEdit
      hasTabs
      errors={errors}
      loading={loading}
    >
      <ScheduleForm
        schedule={schedule}
        setSchedule={setSchedule}
        timezones={timezones}
        timezone={timezone}
        setTimezone={setTimezone}
        destination={destination}
        setDestination={setDestination}
      />
    </TemplatePage>
  );
};

export default ScheduleEdit;
