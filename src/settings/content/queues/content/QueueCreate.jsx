import { useState, useEffect } from "react";
import { Flex, Field } from "@chakra-ui/react";
import { InputUi, NativeSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import SchedulesForm from "../../../helpers/forms/SchedulesForm";
import MembersForm from "../forms/MembersForm";
import AgentsForm from "../forms/AgentsForm";
import CallerForm from "../../../helpers/forms/CallerForm";
import FormContainer from "../../../templates/forms/FormContainer";
import TemplatePage from "../../../templates/TemplatePage";

const QueueCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { contexts, contextRangeQueueGet, queueCreate } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [queue, setQueue] = useState({
    name: "",
    members: {
      users: [],
      agents: [],
    },
    schedule: null,
  });

  // line form
  const initialContext = contexts.items.find((item) => item.type === "internal") || {};
  const [line, setLine] = useState({
    context: "",
    exten: "",
  });

  // members form
  const [queuemembers, setQueuemembers] = useState(null);
  useEffect(() => {
    setQueue({
      ...queue,
      members: {
        ...queue.members,
        users: queuemembers,
      },
    });
  }, [queuemembers]);

  // schedule  form
  const [schedule, setSchedule] = useState(null);
  useEffect(() => {
    setQueue((prev) => ({
      ...prev,
      schedule: schedule,
    }));
  }, [schedule]);

  // agents form
  const [agents, setAgents] = useState([]);
  useEffect(() => {
    setQueue((prev) => ({
      ...prev,
      members: {
        ...prev.members,
        agents: agents,
      },
    }));
  }, [agents]);

  // obtenir une liste d'extensions attribuables
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
    const res = await queueCreate(queue, line);
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
      title={t("queues.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"queues"}
      submit={submit}
      isCreate
      errors={errors}
      loading={loading}
    >
      <FormContainer>
        <Flex justifyContent="space-between">
          <Field.Root width="48%">
            <Field.Label>{t("common.name")} :</Field.Label>
            <InputUi
              required
              placeholder={t("common.name")}
              value={queue.name}
              onChange={(e) => setQueue({ ...queue, name: e.target.value })}
            />
          </Field.Root>
          <Field.Root width="48%">
            <Field.Label>{t("common.number")} :</Field.Label>
            <NativeSelectUi
              value={line.exten}
              onChange={(e) =>
                setLine({
                  ...line,
                  exten: e.target.value,
                })
              }
            >
              {availableExtensions.map((exten) => (
                <option value={exten} key={exten}>
                  {exten}
                </option>
              ))}
            </NativeSelectUi>
          </Field.Root>
        </Flex>
        <MembersForm queuemembers={queuemembers} setQueuemembers={setQueuemembers} />
        <AgentsForm agents={agents} setAgents={setAgents} />
        <SchedulesForm schedule={schedule} setSchedule={setSchedule} />
        <CallerForm caller={queue} setCaller={setQueue} />
      </FormContainer>
    </TemplatePage>
  );
};

export default QueueCreate;
