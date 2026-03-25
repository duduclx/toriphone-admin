import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";
import GroupsForm from "../forms/GroupsForm";

const GroupCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { contexts, contextRangeGroupGet, groupCreate } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [group, setGroup] = useState({
    name: "",
    enabled: true,
    ignore_forward: false,
    mark_answered_elsewhere: false,
    retry_delay: 5,
    ring_in_use: true,
    ring_strategy: "all",
    user_timeout: 15,
    schedule: null,
    members: {
      users: [],
    },
    fallbacks: null,
    call_permissions: [],
  });

  // line form
  const initialContext = contexts.items.find((item) => item.type === "internal") || {};
  const [line, setLine] = useState({
    context: "",
    exten: "",
  });

  // moh helper form
  const [moh, setMoh] = useState(null);

  // members helper form
  const [groupMembers, setGroupMembers] = useState([]);

  // destination no answer form
  const [destination, setDestination] = useState(null);

  // destination Congestion
  const [destinationCongestion, setDestinationCongestion] = useState(null);

  // callpermissions helper form
  const [callpermissions, setCallpermissions] = useState([]);

  // ring strategy form
  const [ringstrategy, setRingstrategy] = useState("all");

  // schedule form
  const [schedule, setSchedule] = useState(null);

  // obtenir une liste d'extensions attribuables
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
        setLine({
          context: initialContext.name,
          exten: available[0],
        });
      }
    };

    fetchContextRange();
  }, []);

   // submit
   const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await groupCreate(group, line);
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
      title={t("groups.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"groups"}
      submit={submit}
      isCreate
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

export default GroupCreate;
