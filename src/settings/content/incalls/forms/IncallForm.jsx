import { useEffect } from "react";
import { Field, Flex } from "@chakra-ui/react";
import { InputUi, NativeSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import CallerForm from "../../../helpers/forms/CallerForm";
import DestinationsForm from "../../../helpers/DestinationsForm";
import SoundForm from "../../../helpers/forms/SoundForm";
import SchedulesForm from "../../../helpers/forms/SchedulesForm";
import FormContainer from "../../../templates/forms/FormContainer";

const IncallForm = ({
  incall,
  setIncall,
  availableExtensions,
  line,
  setLine,
  destination,
  setDestination,
  schedule,
  setSchedule,
  greetingsound,
  setGreetingsound,
  isEdit = false,
}) => {
  // requirements
  const { t } = useTranslation("admin");

  // destination
  useEffect(() => {
    setIncall((prev) => ({
      ...prev,
      destination: destination,
    }));
  }, [destination]);

  // schedule
  useEffect(() => {
    setIncall((prev) => ({
      ...prev,
      schedules: schedule,
    }));
  }, [schedule]);

  // greetingsound
  useEffect(() => {
    setIncall((prev) => ({
      ...prev,
      greeting_sound: greetingsound?.value || null,
    }));
  }, [greetingsound]);

  return (
    <FormContainer>
      <Field.Root>
        <Field.Label>{t("common.did")} :</Field.Label>
        <NativeSelectUi
          value={line.exten}
          onChange={(e) => {
            setLine((prev) => ({ ...prev, exten: e.target.value }));
            setIncall((prev) => ({ ...prev, description: e.target.value }));
          }}
        >
          {isEdit && <option value={incall.extensions[0].exten}>{incall.extensions[0].exten}</option>}
          {availableExtensions.map((exten) => (
            <option value={exten} key={exten}>
              {exten}
            </option>
          ))}
        </NativeSelectUi>
      </Field.Root>
      <DestinationsForm
        label={t("common.destination")}
        newDestination={destination}
        setNewDestination={setDestination}
      />
      <SchedulesForm schedule={schedule} setSchedule={setSchedule} />
      <Field.Root>
        <Field.Label>{t("common.subroutine")} :</Field.Label>
        <InputUi
          required
          placeholder={t("common.subroutine")}
          value={incall.preprocess_subroutine}
          onChange={(e) => setIncall({ ...incall, preprocess_subroutine: e.target.value })}
        />
      </Field.Root>
      <SoundForm
        label={t("incalls.greeting_sound")}
        sound={greetingsound}
        setSound={setGreetingsound}
        helperText={t("incalls.greeting_sound_helper")}
      />
      <CallerForm caller={incall} setCaller={setIncall} />
    </FormContainer>
  );
};

export default IncallForm;
