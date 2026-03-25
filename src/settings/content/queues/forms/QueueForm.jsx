import { useEffect } from "react";
import { Field, Tabs } from "@chakra-ui/react";
import { CheckboxUi, InputUi, NativeSelectUi, NumberInputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import MembersForm from "../forms/MembersForm";
import AgentsForm from "../forms/AgentsForm";
import SchedulesForm from "../../../helpers/forms/SchedulesForm";
import DestinationsForm from "../../../helpers/DestinationsForm";
import MohForm from "../../../helpers/forms/MohForm";
import CallerForm from "../../../helpers/forms/CallerForm";

import getLabelForFallback from "../../../helpers/DestinationsHelper";

import { useApis } from "../../../../ApiProvider";
import FormContainer from "../../../templates/forms/FormContainer";

const QueueForm = ({
  queueSelected,
  queue,
  setQueue,
  line,
  setLine,
  moh,
  setMoh,
  membersTimeout,
  setMembersTimeout,
  retryDelay,
  setRetryDelay,
  maxlenValue,
  setMaxlenValue,
  queuemembers,
  setQueuemembers,
  agents,
  setAgents,
  schedule,
  setSchedule,
  fallbacks,
  setFallbacks,
  fallbacksBusy,
  setFallbacksBusy,
  fallbacksCongestion,
  setFallbacksCongestion,
  fallbacksFail,
  setFallbacksFail,
  fallbacksNoanswer,
  setFallbacksNoanswer,
  waitratiodestination,
  setWaitratiodestination,
  waittimedestination,
  setWaittimedestination,
  availableExtensions,
}) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { queueFallbacksGet } = useApis();

  // handlers

  // on change line
  const handleLineChange = (e) => {
    setLine({
      ...line,
      exten: e.target.value,
    });
  };

  // onchange option timeout
  const handleMembersTimeout = (e) => {
    let value = e.value === "" ? "15" : e.value;
    setMaxlenValue(value);
    const updatedOptions = queue.options.map((option) => (option[0] === "timeout" ? ["timeout", value] : option));
    setQueue({
      ...queue,
      options: updatedOptions,
    });
  };

  // on change retry delay
  const handleRetryDelay = (e) => {
    let value = e.value === "" ? "5" : e.value;
    setRetryDelay(value);
    const updatedOptions = queue.options.map((option) => (option[0] === "retry" ? ["retry", value] : option));
    setQueue({
      ...queue,
      options: updatedOptions,
    });
  };

  // on change maxlen
  const handleMaxlenChange = (valueString) => {
    let value = valueString;
    if (!valueString) {
      value = "0"; // Set to "0" when the input is cleared
    }
    setMaxlenValue(value);
    const updatedOptions = queue.options.map((option) => (option[0] === "maxlen" ? ["maxlen", value] : option));
    setQueue({
      ...queue,
      options: updatedOptions,
    });
  };

  // onchange ratio threshold
  const handleRatioTreshold = (e) => {
    setQueue({
      ...queue,
      wait_ratio_threshold: e.value === "" ? null : e.value,
    });
  };

  // onchange time threshold
  const handleTimeTreshold = (e) => {
    setQueue({
      ...queue,
      wait_time_threshold: e.value === "" ? null : e.value,
    });
  };

  // onchange
  const handleTimeoutChange = (e) => {
    setQueue({
      ...queue,
      timeout: e.value === "" ? null : e.value,
    });
  };

  // useEffects

  // membersTimeout
  useEffect(() => {
    const timeoutOption = queue.options.find((option) => option[0] === "timeout");
    if (timeoutOption) {
      setMembersTimeout(timeoutOption[1]);
    }
  }, [queue]);

  // retryDelay
  useEffect(() => {
    const retryOption = queue.options.find((option) => option[0] === "retry");
    if (retryOption) {
      setRetryDelay(retryOption[1]);
    }
  }, [queue]);

  // maxlen
  useEffect(() => {
    const maxlenOption = queue.options.find((option) => option[0] === "maxlen");
    if (maxlenOption) {
      setMaxlenValue(maxlenOption[1]);
    }
  }, [queue]);

  // fallbacks
  useEffect(() => {
    const fetchCallbacks = async () => {
      const fallbacks = await queueFallbacksGet(queueSelected);
      setFallbacks(fallbacks);
      const busy = getLabelForFallback(fallbacks.busy_destination);
      setFallbacksBusy(busy);
      const congestion = getLabelForFallback(fallbacks.congestion_destination);
      setFallbacksCongestion(congestion);
      const fail = getLabelForFallback(fallbacks.fail_destination);
      setFallbacksFail(fail);
      const noanswer = getLabelForFallback(fallbacks.noanswer_destination);
      setFallbacksNoanswer(noanswer);
    };

    fetchCallbacks();
  }, [queue]);

  // fallbacksBusy
  useEffect(() => {
    setFallbacks((prev) => ({
      ...prev,
      busy_destination: fallbacksBusy,
    }));
  }, [fallbacksBusy]);

  // fallbacksCongestion
  useEffect(() => {
    setFallbacks((prev) => ({
      ...prev,
      congestion_destination: fallbacksCongestion,
    }));
  }, [fallbacksCongestion]);

  // fallbacksFail
  useEffect(() => {
    setFallbacks((prev) => ({
      ...prev,
      fail_destination: fallbacksFail,
    }));
  }, [fallbacksFail]);

  // fallbacksNoanswer
  useEffect(() => {
    setFallbacks((prev) => ({
      ...prev,
      noanswer_destination: fallbacksNoanswer,
    }));
  }, [fallbacksNoanswer]);

  // moh
  useEffect(() => {
    setQueue((prev) => ({
      ...prev,
      music_on_hold: moh?.value || null,
      music_on_hold_with_label: moh,
    }));
  }, [moh]);

  // queuemembers
  useEffect(() => {
    setQueue({
      ...queue,
      members: {
        ...queue.members,
        users: queuemembers,
      },
    });
  }, [queuemembers]);

  // agents
  useEffect(() => {
    setQueue((prev) => ({
      ...prev,
      members: {
        ...prev.members,
        agents: agents,
      },
    }));
  }, [agents]);

  // schedule
  useEffect(() => {
    setQueue((prev) => ({
      ...prev,
      schedule: schedule,
    }));
  }, [schedule]);

  // waitratiodestination
  useEffect(() => {
    setQueue((prev) => ({
      ...prev,
      wait_ratio_destination: waitratiodestination,
    }));
  }, [waitratiodestination]);

  // waittimedestination
  useEffect(() => {
    setQueue((prev) => ({
      ...prev,
      wait_time_destination: waittimedestination,
    }));
  }, [waittimedestination]);

  return (
    <Tabs.Root defaultValue="general">
      <Tabs.List>
        <Tabs.Trigger value="general">{t("common.general")}</Tabs.Trigger>
        <Tabs.Trigger value="options">{t("common.options")}</Tabs.Trigger>
        <Tabs.Trigger value="dtmf">{t("common.dtmf")}</Tabs.Trigger>
        <Tabs.Trigger value="members">{t("common.members")}</Tabs.Trigger>
        <Tabs.Trigger value="agents">{t("common.agents")}</Tabs.Trigger>
        <Tabs.Trigger value="schedule">{t("common.schedule")}</Tabs.Trigger>
        <Tabs.Trigger value="forwards">{t("common.forwards")}</Tabs.Trigger>
        <Tabs.Trigger value="diversions">{t("common.diversions")}</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content width="50%" m="auto" value="general">
        <FormContainer alignSelf="center" justifyContent="center">
          {/* General content */}
          <Field.Root>
            <Field.Label>{t("common.name")} :</Field.Label>
            <InputUi
              required
              placeholder={t("common.name")}
              value={queue.name}
              onChange={(e) => setQueue({ ...queue, name: e.target.value })}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("common.number")} :</Field.Label>
            <NativeSelectUi value={line.exten} onChange={handleLineChange}>
              <option value={queue.extensions[0].exten} key={queue.extensions[0].exten}>
                {queue.extensions[0].exten}
              </option>
              {availableExtensions.map((exten) => (
                <option value={exten} key={exten}>
                  {exten}
                </option>
              ))}
            </NativeSelectUi>
          </Field.Root>
          <MohForm moh={moh} setMoh={setMoh} />
          <CallerForm caller={queue} setCaller={setQueue} />
          <Field.Root>
            <Field.Label>{t("common.subroutine")} :</Field.Label>
            <InputUi
              required
              placeholder={t("common.subroutine")}
              value={queue.preprocess_subroutine}
              onChange={(e) => setQueue({ ...queue, preprocess_subroutine: e.target.value })}
            />
          </Field.Root>
          <CheckboxUi
            checked={queue.enabled}
            onCheckedChange={(e) => setQueue((prev) => ({ ...prev, enabled: e.checked }))}
          >
            {t("common.enabled")}
          </CheckboxUi>
        </FormContainer>
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="options">
        <FormContainer alignSelf="center" justifyContent="center">
          {/* Options content */}
          <CheckboxUi
            checked={queue.announce_hold_time_on_entry}
            onCheckedChange={(e) =>
              setQueue({
                ...queue,
                announce_hold_time_on_entry: e.checked,
              })
            }
          >
            {t("common.announce_hold_time_on_entry")}
          </CheckboxUi>
          <CheckboxUi
            checked={queue.data_quality}
            onCheckedChange={(e) =>
              setQueue({
                ...queue,
                data_quality: e.checked,
              })
            }
          >
            {t("common.data_quality")}
          </CheckboxUi>
          <CheckboxUi
            checked={queue.ignore_forward}
            onCheckedChange={(e) =>
              setQueue({
                ...queue,
                ignore_forward: e.checked,
              })
            }
          >
            {t("common.ignore_forward")}
          </CheckboxUi>
          <CheckboxUi
            checked={queue.ring_on_hold}
            onCheckedChange={(e) =>
              setQueue({
                ...queue,
                ring_on_hold: e.checked,
              })
            }
          >
            {t("common.ring_on_hold")}
          </CheckboxUi>
          <CheckboxUi
            checked={queue.mark_answered_elsewhere}
            onCheckedChange={(e) => setQueue({ ...queue, mark_answered_elsewhere: e.checked })}
          >
            {t("common.mark_answered_elsewhere")}
          </CheckboxUi>
          <Field.Root>
            <Field.Label>{t("queues.membersTimeout")} :</Field.Label>
            <NumberInputUi
              min={15}
              max={30}
              value={membersTimeout}
              allowMouseWheel
              onValueChange={handleMembersTimeout}
            />
            <Field.HelperText>{t("queues.membersTimeout_help")}</Field.HelperText>
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("queues.retryDelay")} :</Field.Label>
            <NumberInputUi min={5} max={15} value={retryDelay} allowMouseWheel onValueChange={handleRetryDelay} />
            <Field.HelperText>{t("queues.retryDelay_help")}</Field.HelperText>
          </Field.Root>
          <Field.Root>
            <CheckboxUi
              checked={queue.retry_on_timeout}
              onCheckedChange={(e) =>
                setQueue({
                  ...queue,
                  retry_on_timeout: e.checked,
                })
              }
            >
              {t("queues.retry_on_timeout")}
            </CheckboxUi>
            <Field.HelperText>{t("queues.retry_on_timeout_help")}</Field.HelperText>
          </Field.Root>
        </FormContainer>
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="dtmf">
        {/* DTMF content */}
        <FormContainer alignSelf="center" justifyContent="center">
          <CheckboxUi
            checked={queue.dtmf_hangup_callee_enabled}
            onCheckedChange={(e) => setQueue((prev) => ({ ...prev, dtmf_hangup_callee_enabled: e.checked }))}
          >
            {t("common.dtmf_hangup_callee_enabled")}
          </CheckboxUi>
          <CheckboxUi
            checked={queue.dtmf_hangup_caller_enabled}
            onCheckedChange={(e) => setQueue((prev) => ({ ...prev, dtmf_hangup_caller_enabled: e.checked }))}
          >
            {t("common.dtmf_hangup_caller_enabled")}
          </CheckboxUi>
          <CheckboxUi
            checked={queue.dtmf_record_callee_enabled}
            onCheckedChange={(e) => setQueue((prev) => ({ ...prev, dtmf_record_callee_enabled: e.checked }))}
          >
            {t("common.dtmf_record_callee_enabled")}
          </CheckboxUi>
          <CheckboxUi
            checked={queue.dtmf_record_caller_enabled}
            onCheckedChange={(e) => setQueue((prev) => ({ ...prev, dtmf_record_caller_enabled: e.checked }))}
          >
            {t("common.dtmf_record_caller_enabled")}
          </CheckboxUi>
          <CheckboxUi
            checked={queue.dtmf_record_toggle}
            onCheckedChange={(e) => setQueue((prev) => ({ ...prev, dtmf_record_toggle: e.checked }))}
          >
            {t("common.dtmf_record_toggle")}
          </CheckboxUi>
          <CheckboxUi
            checked={queue.dtmf_transfer_callee_enabled}
            onCheckedChange={(e) => setQueue((prev) => ({ ...prev, dtmf_transfer_callee_enabled: e.checked }))}
          >
            {t("common.dtmf_transfer_callee_enabled")}
          </CheckboxUi>
          <CheckboxUi
            checked={queue.dtmf_transfer_caller_enabled}
            onCheckedChange={(e) => setQueue((prev) => ({ ...prev, dtmf_transfer_caller_enabled: e.checked }))}
          >
            {t("common.dtmf_transfer_caller_enabled")}
          </CheckboxUi>
        </FormContainer>
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="members">
        {/* Membres content */}
        <MembersForm queuemembers={queuemembers} setQueuemembers={setQueuemembers} />
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="agents">
        {/* Agents content */}
        <AgentsForm agents={agents} setAgents={setAgents} />
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="schedule">
        {/* Horaire content */}
        <SchedulesForm schedule={schedule} setSchedule={setSchedule} />
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="forwards">
        {/* Destinations content */}
        <FormContainer alignSelf="center" justifyContent="center">
          <DestinationsForm
            label={t("common.busy")}
            newDestination={fallbacksBusy}
            setNewDestination={setFallbacksBusy}
          />
          <DestinationsForm
            label={t("common.congestion")}
            newDestination={fallbacksCongestion}
            setNewDestination={setFallbacksCongestion}
          />
          <Field.Root>
            <Field.Label>{t("queues.maxlenValue")} :</Field.Label>
            <NumberInputUi
              min={0}
              value={maxlenValue || "0"}
              allowMouseWheel
              onValueChange={(e) => handleMaxlenChange(parseInt(e.value, 10))}
            />
            <Field.HelperText>{t("queues.maxlenValue_help")}</Field.HelperText>
          </Field.Root>
          <DestinationsForm
            label={t("common.fail")}
            newDestination={fallbacksFail}
            setNewDestination={setFallbacksFail}
          />
          <DestinationsForm
            label={t("common.no_answer")}
            newDestination={fallbacksNoanswer}
            setNewDestination={setFallbacksNoanswer}
          />
          <Field.Root>
            <Field.Label>{t("common.timeout")} :</Field.Label>
            <NumberInputUi min={0} value={queue.timeout || ""} allowMouseWheel onValueChange={handleTimeoutChange} />
            <Field.HelperText>{t("queues.timeout_help")}</Field.HelperText>
          </Field.Root>
        </FormContainer>
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="diversions">
        {/* Detournements content */}
        <FormContainer alignSelf="center" justifyContent="center">
          <Field.Root>
            <Field.Label>{t("queues.wait_ratio_threshold")} :</Field.Label>
            <NumberInputUi
              min={0}
              value={queue.wait_ratio_threshold || ""}
              allowMouseWheel
              onValueChange={handleRatioTreshold}
            />
            <Field.HelperText>{t("queues.wait_ratio_threshold_help")}</Field.HelperText>
          </Field.Root>
          <DestinationsForm
            label={t("queues.waitratiodestination")}
            newDestination={waitratiodestination}
            setNewDestination={setWaitratiodestination}
          />
          <Field.Root>
            <Field.Label>{t("queues.wait_time_threshold")} :</Field.Label>
            <NumberInputUi
              min={0}
              value={queue.wait_time_threshold || ""}
              allowMouseWheel
              onValueChange={handleTimeTreshold}
            />
            <Field.HelperText>{t("queues.wait_time_threshold_help")}</Field.HelperText>
          </Field.Root>
          <DestinationsForm
            label={t("queues.waittimedestination")}
            newDestination={waittimedestination}
            setNewDestination={setWaittimedestination}
          />
        </FormContainer>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default QueueForm;
