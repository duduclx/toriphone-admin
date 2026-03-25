import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";


import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";

import ScheduleForm from "../forms/ScheduleForm";

const ScheduleCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { scheduleAdd, timezones, timezonesGet } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // timezone
  const [timezone, setTimezone] = useState({});

  // resource
  const [schedule, setSchedule] = useState({
    name: "",
    timezone: null,
    closed_destination: {
      type: "none",
    },
    open_periods: [
      {
        hours_start: "",
        hours_end: "",
        week_days: [],
        month_days: [],
        months: [],
      },
    ],
  });

  // destination form
  const [destination, setDestination] = useState(null);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    let newScheduleUpdated = { ...schedule };
    if (!schedule.closed_destination) {
      newScheduleUpdated.closed_destination = { type: "none" };
    }
    const res = await scheduleAdd(newScheduleUpdated);
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
      title={t("schedules.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"schedules"}
      submit={submit}
      isCreate
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

export default ScheduleCreate;
