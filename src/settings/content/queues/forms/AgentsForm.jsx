import { Field } from "@chakra-ui/react";
import { AsyncSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

/*
usage in 
QueueCreate
QueueEdit
*/

const AgentsForm = ({ agents, setAgents }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { agentsGet } = useApis();

  // load values
  const loadAgents = () => {
    return new Promise(async (resolve) => {
      const agents = await agentsGet();
      const filteredagents = agents.items.map((agent) => ({
        label: agent.firstname + " " + agent.lastname,
        value: agent.id,
      }));
      resolve(filteredagents);
    });
  };

  // onchange
  const handleAgentsChange = (selectedValue) => {
    const transformedAgents = (selectedValue || []).map((agent) => ({
      id: agent.value,
      value: agent.value,
      label: agent.label,
    }));
    setAgents(transformedAgents);
  };

  return (
    <Field.Root>
      <Field.Label>{t("common.agents")} :</Field.Label>
      <AsyncSelectUi
        cacheOptions
        loadOptions={loadAgents}
        defaultOptions
        isClearable
        isMulti
        onChange={handleAgentsChange}
        value={
          agents
            ? agents.map((agent) => ({
                label: agent.label,
                value: agent.id,
              }))
            : []
        }
        placeholder={t("common.agents_select")}
      />
      <Field.HelperText>{t("common.agents_helper")}</Field.HelperText>
    </Field.Root>
  );
};

export default AgentsForm;
