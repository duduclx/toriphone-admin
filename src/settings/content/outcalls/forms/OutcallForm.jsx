import { useEffect } from "react";
import { Flex, Field, Tabs } from "@chakra-ui/react";
import { CheckboxUi, InputUi, NumberInputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import TrunksForm from "../forms/TrunksForm";
import SchedulesForm from "../../../helpers/forms/SchedulesForm";
import CallpermissionsForm from "../../../helpers/forms/CallpermissionsForm";
import OutcallExtensions from "./OutcallExtensions";
import FormContainer from "../../../templates/forms/FormContainer";

const OutcallForm = ({
  outcall,
  setOutcall,
  trunks,
  setTrunks,
  schedule,
  setSchedule,
  callpermissions,
  setCallpermissions,
}) => {
  // requirements
  const { t } = useTranslation("admin");

  // ring time
  const handleRingTime = (e) => {
    setOutcall((prev) => ({
      ...prev,
      ring_time: e.value === "" ? null : e.value,
    }));
  };

  // trunks
  useEffect(() => {
    setOutcall((prev) => ({
      ...prev,
      trunks: trunks,
    }));
  }, [trunks]);

  // schedule
  useEffect(() => {
    setOutcall((prev) => ({
      ...prev,
      schedule: schedule,
    }));
  }, [schedule]);

  // callpermissions
  useEffect(() => {
    setOutcall((prev) => ({
      ...prev,
      call_permissions: callpermissions,
    }));
  }, [callpermissions]);

  return (
    <Tabs.Root defaultValue="general">
      <Tabs.List>
        <Tabs.Trigger value="general">{t("common.general")}</Tabs.Trigger>
        <Tabs.Trigger value="extensions">{t("common.extensions")}</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="general">
        <Flex flex="1" flexDirection="column" py="12">
          <FormContainer alignSelf="center" width="50%" justifyContent="center">
            <Field.Root>
              <Field.Label>{t("common.name")} :</Field.Label>
              <InputUi
                required
                placeholder={t("common.name")}
                value={outcall.name}
                onChange={(e) => setOutcall({ ...outcall, name: e.target.value })}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>{t("common.description")} :</Field.Label>
              <InputUi
                required
                placeholder={t("common.description")}
                value={outcall.description}
                onChange={(e) => setOutcall({ ...outcall, description: e.target.value })}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>{t("common.subroutine")}:</Field.Label>
              <InputUi
                placeholder={t("common.subroutine")}
                value={outcall.preprocess_subroutine}
                onChange={(e) => setOutcall({ ...outcall, preprocess_subroutine: e.target.value })}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>{t("outcalls.ring_time")} :</Field.Label>
              <NumberInputUi
                min={0}
                value={outcall.ring_time === null ? "" : outcall.ring_time}
                allowMouseWheel
                onValueChange={handleRingTime}
              />
            </Field.Root>
            <CheckboxUi
              checked={outcall.internal_caller_id}
              onCheckedChange={(e) => setOutcall({ ...outcall, internal_caller_id: e.checked })}
            >
              {t("outcalls.internal_caller_id")}
            </CheckboxUi>
            <TrunksForm trunks={trunks} setTrunks={setTrunks} />
            <SchedulesForm schedule={schedule} setSchedule={setSchedule} />
            <CallpermissionsForm callpermissions={callpermissions} setCallpermissions={setCallpermissions} />
          </FormContainer>
        </Flex>
      </Tabs.Content>

      <Tabs.Content value="extensions">
        <OutcallExtensions outcall={outcall} setOutcall={setOutcall} />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default OutcallForm;
