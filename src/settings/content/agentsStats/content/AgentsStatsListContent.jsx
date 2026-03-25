import { Table } from "@chakra-ui/react";
import TemplateListContent from "../../../templates/TemplateListContent";

const AgentsStatsListContent = ({ agent, setSelectedComponent }) => {

  return (
    <TemplateListContent
      ressource={agent}
    >
      <Table.Cell>{agent.agent_id}</Table.Cell>
      <Table.Cell>{agent.agent_number}</Table.Cell>
      <Table.Cell>{agent.answered}</Table.Cell>
      <Table.Cell>{agent.conversation_time}</Table.Cell>
      <Table.Cell>{agent.login_time}</Table.Cell>
      <Table.Cell>{agent.pause_time}</Table.Cell>
      <Table.Cell>{agent.from}</Table.Cell>
      <Table.Cell>{agent.until}</Table.Cell>
    </TemplateListContent>
  )
}

export default AgentsStatsListContent
