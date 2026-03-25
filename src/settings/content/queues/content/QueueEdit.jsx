import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import getLabelForFallback from "../../../helpers/DestinationsHelper";

import TemplatePage from "../../../templates/TemplatePage";
import QueueForm from "../forms/QueueForm";

const QueueEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { queueSelected, contexts, contextRangeQueueGet, mohs, queueUpdate } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [queue, setQueue] = useState(() => {
    const updatedMembers = {
      ...queueSelected.members,
      users: queueSelected.members.users.map((user) => ({
        ...user,
        label: `${user.firstname} ${user.lastname}`,
      })),
      agents: queueSelected.members.agents.map((agent) => ({
        ...agent,
        label: `${agent.firstname} ${agent.lastname}`,
      })),
    };
    return {
      ...queueSelected,
      members: updatedMembers,
    };
  });

  // line
  const initialContext = contexts.items.find((item) => item.type === "internal") || {};
  const [line, setLine] = useState({
    context: initialContext.name,
    exten: queueSelected.extensions[0].exten,
  });

  // options timeout time a member is ringing
  const [membersTimeout, setMembersTimeout] = useState(15);

  // option retry delay
  const [retryDelay, setRetryDelay] = useState(5);
  
  // maxlen for congestion
  const [maxlenValue, setMaxlenValue] = useState(0);

  // fallbacks
  const [fallbacks, setFallbacks] = useState(null);
  const [fallbacksBusy, setFallbacksBusy] = useState(null);
  const [fallbacksCongestion, setFallbacksCongestion] = useState(null);
  const [fallbacksFail, setFallbacksFail] = useState(null);
  const [fallbacksNoanswer, setFallbacksNoanswer] = useState(null);

  // moh form
  let updatedMoh = null;
  if (queueSelected.music_on_hold) {
    updatedMoh = {
      label: mohs.items.find((moh) => moh.name === queueSelected.music_on_hold)?.label || null,
      value: queueSelected.music_on_hold,
    };
  }
  const [moh, setMoh] = useState(updatedMoh);

  // members form
  const [queuemembers, setQueuemembers] = useState(queue.members.users);

  // agents form
  const [agents, setAgents] = useState(queue.members.agents);

  // schedule form
  const initialSchedule =
    queueSelected.schedules && queueSelected.schedules.length > 0
      ? {
          ...queueSelected.schedules[0],
          label: queueSelected.schedules[0].name,
        }
      : null;
  const [schedule, setSchedule] = useState(initialSchedule);

  // wait_ratio_destination form
  const [waitratiodestination, setWaitratiodestination] = useState(
    getLabelForFallback(queue.wait_ratio_destination)
  );

  // wait_time_destination form
  const [waittimedestination, setWaittimedestination] = useState(
    getLabelForFallback(queue.wait_time_destination)
  );

  // obtenir une lite d'extensions attribuables
  const [availableExtensions, setAvailableExtensions] = useState([]);
  useEffect(() => {
    const fetchContextRange = async () => {
      const range = await contextRangeQueueGet(initialContext.id);

      if (range.items) {
        const available = [];
        range.items.forEach((item) => {
          const start = parseInt(item.start);
          const end = parseInt(item.end);

          if (!isNaN(start) && !isNaN(end)) {
            for (let i = start; i <= end; i++) {
              available.push(i);
            }
          }
        });
        setAvailableExtensions(available);
      }
    };

    fetchContextRange();
  }, []);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await queueUpdate(queue, line, fallbacks, queueSelected);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("queues");
    }
  };

  return (
    <TemplatePage
      title={t("queues.edit.title", { name: queueSelected.name })}
      setSelectedComponent={setSelectedComponent}
      route={"queues"}
      submit={submit}
      isEdit
      hasTabs
      errors={errors}
      loading={loading}
    >
      <QueueForm
      queueSelected={queueSelected}
      queue={queue}
      setQueue={setQueue}
      line={line}
      setLine={setLine}
      moh={moh}
      setMoh={setMoh}
      membersTimeout={membersTimeout}
      setMembersTimeout={setMembersTimeout}
      retryDelay={retryDelay}
      setRetryDelay={setRetryDelay}
      maxlenValue={maxlenValue}
      setMaxlenValue={setMaxlenValue}
      queuemembers={queuemembers}
      setQueuemembers={setQueuemembers}
      agents={agents}
      setAgents={setAgents}
      schedule={schedule}
      setSchedule={setSchedule}
      fallbacks={fallbacks}
      setFallbacks={setFallbacks}
      fallbacksBusy={fallbacksBusy}
      setFallbacksBusy={setFallbacksBusy}
      fallbacksCongestion={fallbacksCongestion}
      setFallbacksCongestion={fallbacksCongestion}
      fallbacksFail={fallbacksFail}
      setFallbacksFail={setFallbacksFail}
      fallbacksNoanswer={fallbacksNoanswer}
      setFallbacksNoanswer={setFallbacksNoanswer}
      waitratiodestination={waitratiodestination}
      setWaitratiodestination={setWaitratiodestination}
      waittimedestination={waittimedestination}
      setWaittimedestination={setWaittimedestination}
      availableExtensions={availableExtensions}
      />
    </TemplatePage>
  );
};

export default QueueEdit;
