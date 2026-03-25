import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import getLabelForFallback from "../../../helpers/DestinationsHelper";

import TemplatePage from "../../../templates/TemplatePage";
import GroupsForm from "../forms/GroupsForm";

const GroupEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { groupSelected, contexts, contextRangeGroupGet, mohs, groupUpdate } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // line form
  const initialContext = contexts.items.find((item) => item.type === "internal") || {};
  const [line, setLine] = useState({
    context: initialContext.name,
    exten: groupSelected.extensions[0].exten,
  });

  // destination no answer form
  const [destination, setDestination] = useState(getLabelForFallback(groupSelected.fallbacks.noanswer_destination));

  // destination Congestion
  const [destinationCongestion, setDestinationCongestion] = useState(
    getLabelForFallback(groupSelected.fallbacks.congestion_destination)
  );

  // callpermissions form
  const [callpermissions, setCallpermissions] = useState(groupSelected.call_permissions);

  // moh form
  let updatedMoh = null;
  if (groupSelected.music_on_hold) {
    updatedMoh = {
      label: mohs.items.find((moh) => moh.name === groupSelected.music_on_hold)?.label || null,
      value: groupSelected.music_on_hold,
    };
  }
  const [moh, setMoh] = useState(updatedMoh);
  
  // ring strategy form
  const [ringstrategy, setRingstrategy] = useState(groupSelected.ring_strategy);

  // schedule form
  const initialSchedule =
    groupSelected.schedules && groupSelected.schedules.length > 0
      ? {
          ...groupSelected.schedules[0],
          label: groupSelected.schedules[0].name,
        }
      : null;
  const [schedule, setSchedule] = useState(initialSchedule);

  // resource
  const [group, setGroup] = useState(() => {
    const updatedMembers = {
      ...groupSelected.members,
      users: groupSelected.members.users.map((user) => ({
        ...user,
        label: `${user.firstname} ${user.lastname}`,
      })),
    };

    return {
      uuid: groupSelected.uuid,
      name: groupSelected.label,
      enabled: groupSelected.enabled,
      extensions: groupSelected.extensions,
      mark_answered_elsewhere: groupSelected.mark_answered_elsewhere,
      dtmf_record_toggle: groupSelected.dtmf_record_toggle,
      ignore_forward: groupSelected.ignore_forward,
      retry_delay: groupSelected.retry_delay,
      ring_in_use: groupSelected.ring_in_use,
      ring_strategy: groupSelected.ring_strategy,
      max_calls: groupSelected.max_calls,
      music_on_hold: groupSelected.music_on_hold,
      music_on_hold_with_label: updatedMoh,
      preprocess_subroutine: groupSelected.preprocess_subroutine,
      timeout: groupSelected.timeout,
      user_timeout: groupSelected.user_timeout,
      schedule: initialSchedule,
      members: updatedMembers,
      fallbacks: {
        congestion_destination: destinationCongestion,
        noanswer_destination: destination,
      },
      call_permissions: groupSelected.call_permissions,
    };
  });

  // members helper form
  const [groupMembers, setGroupMembers] = useState(group.members.users);

  // obtenir une lite d'extensions attribuables
  const [availableExtensions, setAvailableExtensions] = useState([]);
  useEffect(() => {
    const fetchContextRange = async () => {
      const range = await contextRangeGroupGet(initialContext.id);

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
    const res = await groupUpdate(group, line, groupSelected);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("groups");
    }
  };

  return (
    <TemplatePage
      title={t("groups.edit.title", { name: groupSelected.label })}
      setSelectedComponent={setSelectedComponent}
      route={"groups"}
      submit={submit}
      isEdit
      hasTabs
      errors={errors}
      loading={loading}
    >
      <GroupsForm
        group={group}
        setGroup={setGroup}
        line={line}
        setLine={setLine}
        ringstrategy={ringstrategy}
        setRingstrategy={setRingstrategy}
        moh={moh}
        setMoh={setMoh}
        groupMembers={groupMembers}
        setGroupMembers={setGroupMembers}
        destination={destination}
        setDestination={setDestination}
        destinationCongestion={destinationCongestion}
        setDestinationCongestion={setDestinationCongestion}
        schedule={schedule}
        setSchedule={setSchedule}
        callpermissions={callpermissions}
        setCallpermissions={setCallpermissions}
        availableExtensions={availableExtensions}
      />
    </TemplatePage>
  );
};

export default GroupEdit;
