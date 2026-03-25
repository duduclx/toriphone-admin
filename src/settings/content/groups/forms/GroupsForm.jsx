import { useEffect } from "react";
import { Field, Tabs } from "@chakra-ui/react";
import { CheckboxUi, InputUi, NativeSelectUi, NumberInputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import GroupMembersForm from "../../../helpers/forms/GroupMembersForm";
import DestinationsForm from "../../../helpers/DestinationsForm";
import RingStrategyForm from "../forms/RingStrategyForm";
import SchedulesForm from "../../../helpers/forms/SchedulesForm";
import CallpermissionsForm from "../../../helpers/forms/CallpermissionsForm";
import MohForm from "../../../helpers/forms/MohForm";
import FormContainer from "../../../templates/forms/FormContainer";

const GroupsForm = ({
  group,
  setGroup,
  line,
  setLine,
  ringstrategy,
  setRingstrategy,
  moh,
  setMoh,
  groupMembers,
  setGroupMembers,
  destination,
  setDestination,
  destinationCongestion,
  setDestinationCongestion,
  schedule,
  setSchedule,
  callpermissions,
  setCallpermissions,
  availableExtensions,
}) => {
  // requirements
  const { t } = useTranslation("admin");

  // handlers
  const handleLineChange = (e) => {
    setLine({
      ...line,
      exten: e.target.value,
    });
  };

  const handleTimeoutChange = (e) => {
    setGroup((prevState) => ({
        ...prevState,
        timeout: e.value === "" ? null : e.value,
      }));
  };

  const handleRetryDelayChange = (e) => {
    setGroup((prevState) => ({
        ...prevState,
        retry_delay: e.value === "" ? null : e.value,
      }));
  };

  const handleUserTimeoutChange = (e) => {
    setGroup((prevState) => ({
        ...prevState,
        user_timeout: e.value === "" ? null : e.value,
      }));
  };

  const handleMaxCalls = (e) => {
    setGroup((prevState) => ({
        ...prevState,
        max_calls: e.value === "" ? null : e.value,
      }));
  };

  // destination no answer
  useEffect(() => {
    setGroup((prevGroup) => ({
      ...prevGroup,
      fallbacks: {
        ...prevGroup.fallbacks,
        noanswer_destination: destination,
      },
    }));
  }, [destination]);

  // destination Congestion
  useEffect(() => {
    setGroup((prevGroup) => ({
      ...prevGroup,
      fallbacks: {
        ...prevGroup.fallbacks,
        congestion_destination: destinationCongestion,
      },
    }));
  }, [destinationCongestion]);

  // callpermissions
  useEffect(() => {
    setGroup((prevGroup) => ({
      ...prevGroup,
      call_permissions: callpermissions,
    }));
  }, [callpermissions]);

  // moh
  useEffect(() => {
    setGroup((prevGroup) => ({
      ...prevGroup,
      music_on_hold: moh?.value || null,
      music_on_hold_with_label: moh,
    }));
  }, [moh]);

  // ringstrategy
  useEffect(() => {
    setGroup((prevGroup) => ({
      ...prevGroup,
      ring_strategy: ringstrategy,
    }));
  }, [ringstrategy]);

  // schedule
  useEffect(() => {
    setGroup((prevGroup) => ({
      ...prevGroup,
      schedule: schedule,
    }));
  }, [schedule]);

  // groupMembers
  useEffect(() => {
    setGroup((prevGroup) => ({
      ...prevGroup,
      members: {
        ...prevGroup.members,
        users: groupMembers,
      },
    }));
  }, [groupMembers]);

  return (
    <>
      <Tabs.Root defaultValue="general">
        <Tabs.List>
          <Tabs.Trigger value="general">{t("common.general")}</Tabs.Trigger>
          <Tabs.Trigger value="options">{t("common.options")}</Tabs.Trigger>
          <Tabs.Trigger value="members">{t("common.members")}</Tabs.Trigger>
          <Tabs.Trigger value="destination">{t("common.destination")}</Tabs.Trigger>
          <Tabs.Trigger value="schedule">{t("common.schedule")}</Tabs.Trigger>
          <Tabs.Trigger value="call">{t("common.call_permission")}</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content width="50%" m="auto" value="general">
          <FormContainer alignSelf="center" justifyContent="center">
            <Field.Root>
              <Field.Label>{t("common.name")} :</Field.Label>
              <InputUi
                required
                placeholder={t("common.name")}
                value={group.name}
                onChange={(e) => setGroup({ ...group, name: e.target.value })}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>{t("common.number")} :</Field.Label>
              <NativeSelectUi value={line.exten} onChange={handleLineChange}>
                {group.extensions?.length > 0 && (
                  <option value={group.extensions[0].exten} key={group.extensions[0].exten}>
                    {group.extensions[0].exten}
                  </option>
                )}
                {availableExtensions.map((exten) => (
                  <option value={exten} key={exten}>
                    {exten}
                  </option>
                ))}
              </NativeSelectUi>
            </Field.Root>
            <RingStrategyForm ringstrategy={ringstrategy} setRingstrategy={setRingstrategy} />
            <CheckboxUi
              checked={group.enabled}
              onCheckedChange={(e) =>
                setGroup({
                  ...group,
                  enabled: e.checked,
                })
              }
            >{t("common.enabled")}
            </CheckboxUi>
            <CheckboxUi
              checked={group.ignore_forward}
              onCheckedChange={(e) =>
                setGroup({
                  ...group,
                  ignore_forward: e.checked,
                })
              }
            >{t("common.ignore_forward")}
            </CheckboxUi>
            <CheckboxUi
              checked={group.ring_in_use}
              onCheckedChange={(e) =>
                setGroup({
                  ...group,
                  ring_in_use: e.checked,
                })
              }
            >{t("common.ring_in_use")}
            </CheckboxUi>
            <CheckboxUi
              checked={group.mark_answered_elsewhere}
              onCheckedChange={(e) =>
                setGroup({
                  ...group,
                  mark_answered_elsewhere: e.checked,
                })
              }
            >{t("common.mark_answered_elsewhere")}
            </CheckboxUi>
            <CheckboxUi
              checked={group.dtmf_record_toggle}
              onCheckedChange={(e) =>
                setGroup({
                  ...group,
                  dtmf_record_toggle: e.checked,
                })
              }
            >{t("groups.dtmf_record_toggle")}
            </CheckboxUi>
          </FormContainer>
        </Tabs.Content>

        <Tabs.Content width="50%" m="auto" value="options">
          <FormContainer alignSelf="center" justifyContent="center">
            <MohForm moh={moh} setMoh={setMoh} />
            <Field.Root>
              <Field.Label>{t("common.subroutine")} :</Field.Label>
              <InputUi
                required
                placeholder={t("common.subroutine")}
                value={group.preprocess_subroutine}
                onChange={(e) => setGroup({ ...group, preprocess_subroutine: e.target.value })}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>{t("common.retry_delay")} :</Field.Label>
              <NumberInputUi
                min={0}
                value={group.retry_delay === null ? "" : group.retry_delay}
                allowMouseWheel
                onValueChange={handleRetryDelayChange}
              />
              <Field.HelperText>{t("groups.retry_delay_helper")}</Field.HelperText>
            </Field.Root>
            <Field.Root>
              <Field.Label>{t("common.timeout")} :</Field.Label>
              <NumberInputUi
                min={0}
                value={group.timeout || ""}
                allowMouseWheel
                onValueChange={handleTimeoutChange}
              />
              <Field.HelperText>{t("groups.timeout_helper")}</Field.HelperText>
            </Field.Root>
            <Field.Root>
              <Field.Label>{t("common.user_timeout")} :</Field.Label>
              <NumberInputUi
                min={0}
                value={group.user_timeout || ""}
                allowMouseWheel
                onValueChange={handleUserTimeoutChange}
              />
              <Field.HelperText>{t("groups.user_timeout_helper")}</Field.HelperText>
            </Field.Root>
            <Field.Root>
              <Field.Label>{t("groups.max_calls")} :</Field.Label>
              <NumberInputUi
                min={0}
                value={group.max_calls || ""}
                allowMouseWheel
                onValueChange={handleMaxCalls}
              />
              <Field.HelperText>{t("groups.max_calls_helper")}</Field.HelperText>
            </Field.Root>
          </FormContainer>
        </Tabs.Content>

        <Tabs.Content width="50%" m="auto" value="members">
          <GroupMembersForm
            groupMembers={groupMembers}
            setGroupMembers={setGroupMembers}
            helpertext={t("groups.group_members_helper")}
          />
        </Tabs.Content>

        <Tabs.Content width="50%" m="auto" value="destination">
          <FormContainer>
            <DestinationsForm
              label={t("common.no_answer")}
              newDestination={destination}
              setNewDestination={setDestination}
              helperText={t("groups.no_answer_helper")}
            />
            <DestinationsForm
              label={t("common.congestion")}
              newDestination={destinationCongestion}
              setNewDestination={setDestinationCongestion}
              helperText={t("groups.congestion_helper")}
            />
          </FormContainer>
        </Tabs.Content>

        <Tabs.Content width="50%" m="auto" value="schedule">
          <SchedulesForm schedule={schedule} setSchedule={setSchedule} />
        </Tabs.Content>

        <Tabs.Content width="50%" m="auto" value="call">
          <CallpermissionsForm callpermissions={callpermissions} setCallpermissions={setCallpermissions} />
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
};

export default GroupsForm;
