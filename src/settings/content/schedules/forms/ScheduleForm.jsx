import { useEffect } from "react";
import { Flex, Button, Field, Tabs } from "@chakra-ui/react";
import { ButtonAddUi, InputUi, ReactSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import DestinationsForm from "../../../helpers/DestinationsForm";
import TimeSelect from "../../../utils/TimeSelect";
import WeekDaysSelect from "../../../utils/WeekDaysSelect";
import MonthDaysSelect from "../../../utils/MonthDaysSelect";
import MonthsSelect from "../../../utils/MonthsSelect";
import FormContainer from "../../../templates/forms/FormContainer";

const ScheduleForm = ({ schedule, setSchedule, timezones, timezone, setTimezone, destination, setDestination }) => {
  // requirements
  const { t } = useTranslation("admin");

  // helper
  const timezoneOptions = timezones?.items?.map((timezone) => ({
    label: timezone.zone_name,
    value: timezone.zone_name,
  }));

  // timezone
  useEffect(() => {
    setSchedule((prev) => ({
      ...prev,
      timezone: timezone.value,
    }));
  }, [timezone]);

  // destination
  useEffect(() => {
    setSchedule((prev) => ({
      ...prev,
      closed_destination: destination,
    }));
  }, [destination]);

  const handlePeriodChange = (type, index, field, value) => {
    const updatedPeriods = [...schedule[type]];
    updatedPeriods[index] = { ...updatedPeriods[index], [field]: value };
    setSchedule({ ...schedule, [type]: updatedPeriods });
  };

  const addOpenPeriod = () => {
    setSchedule((prev) => ({
      ...prev,
      open_periods: [
        ...prev.open_periods,
        {
          hours_start: "",
          hours_end: "",
          week_days: [],
          month_days: [],
          months: [],
        },
      ],
    }));
  };

  const addExceptionalPeriod = () => {
    setSchedule((prev) => ({
      ...prev,
      exceptional_periods: [
        ...(prev.exceptional_periods || []),
        {
          hours_start: "",
          hours_end: "",
          week_days: [],
          month_days: [],
          months: [],
          destination: { type: "none" },
        },
      ],
    }));
  };

  const removePeriod = (type, index) => {
    const updatedPeriods = schedule[type].filter((_, i) => i !== index);
    setSchedule({ ...schedule, [type]: updatedPeriods });
  };

  return (
    <Tabs.Root defaultValue="general">
      <Tabs.List>
        <Tabs.Trigger value="general">{t("common.general")}</Tabs.Trigger>
        <Tabs.Trigger value="open">{t("common.open_periods")}</Tabs.Trigger>
        <Tabs.Trigger value="exceptional">{t("common.exceptional_periods")}</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content width="50%" m="auto" value="general">
        <FormContainer alignSelf="center" justifyContent="center">
          <Field.Root>
            <Field.Label>{t("common.name")} :</Field.Label>
            <InputUi
              required
              placeholder={t("common.name")}
              value={schedule.name}
              onChange={(e) => setSchedule({ ...schedule, name: e.target.value })}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("common.timezone")} :</Field.Label>
            <ReactSelectUi
              value={timezone}
              options={timezoneOptions}
              placeholder={t("common.timezone")}
              onChange={(tz) => setTimezone(tz)}
            />
          </Field.Root>
          <Field.Root>
            <DestinationsForm
              newDestination={destination}
              setNewDestination={setDestination}
              label={t("schedules.closed_destination")}
            />
          </Field.Root>
        </FormContainer>
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="open">
        <Field.Root>
          {schedule.open_periods?.map((period, index) => (
            <Flex key={index} flexDirection="column" gap="4" mb="4" background="bgElevated" borderRadius="12" p="8">
              <TimeSelect
                label={t("common.start")}
                value={period.hours_start}
                onChange={(value) => handlePeriodChange("open_periods", index, "hours_start", value)}
              />
              <TimeSelect
                label={t("common.end")}
                value={period.hours_end}
                onChange={(value) => handlePeriodChange("open_periods", index, "hours_end", value)}
              />
              <WeekDaysSelect
                value={period.week_days}
                onChange={(value) => handlePeriodChange("open_periods", index, "week_days", value)}
              />
              <MonthDaysSelect
                value={period.month_days}
                onChange={(value) => handlePeriodChange("open_periods", index, "month_days", value)}
              />
              <MonthsSelect
                value={period.months}
                onChange={(value) => handlePeriodChange("open_periods", index, "months", value)}
              />
              {index > 0 && (
                <Button colorPalette="danger" onClick={() => removePeriod("open_periods", index)}>
                  {t("schedules.period_remove")}
                </Button>
              )}
            </Flex>
          ))}
          <Flex justifyContent="center" mt="4">
            <ButtonAddUi onClick={addOpenPeriod}>
              {t("schedules.period_add")}
            </ButtonAddUi>
          </Flex>
        </Field.Root>
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="exceptional">
        <Field.Root>
          {schedule.exceptional_periods?.map((period, index) => (
            <Flex key={index} flexDirection="column" gap="4" mb="4" background="bgElevated" borderRadius="12" p="8">
              <TimeSelect
                label={t("common.start")}
                value={period.hours_start}
                onChange={(value) => handlePeriodChange("exceptional_periods", index, "hours_start", value)}
              />
              <TimeSelect
                label={t("common.end")}
                value={period.hours_end}
                onChange={(value) => handlePeriodChange("exceptional_periods", index, "hours_end", value)}
              />
              <WeekDaysSelect
                value={period.week_days}
                onChange={(value) => handlePeriodChange("exceptional_periods", index, "week_days", value)}
              />
              <MonthDaysSelect
                value={period.month_days}
                onChange={(value) => handlePeriodChange("exceptional_periods", index, "month_days", value)}
              />
              <MonthsSelect
                value={period.months}
                onChange={(value) => handlePeriodChange("exceptional_periods", index, "months", value)}
              />
              <DestinationsForm
                label={t("common.destination")}
                newDestination={period.destination}
                setNewDestination={(value) => handlePeriodChange("exceptional_periods", index, "destination", value)}
              />
              {
                <Button colorPalette="danger" onClick={() => removePeriod("exceptional_periods", index)}>
                  {t("schedules.period_remove")}
                </Button>
              }
            </Flex>
          ))}
          <Flex justifyContent="center" mt="4">
            <ButtonAddUi onClick={addExceptionalPeriod}>
              {t("schedules.period_add")}
            </ButtonAddUi>
          </Flex>
        </Field.Root>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default ScheduleForm;
