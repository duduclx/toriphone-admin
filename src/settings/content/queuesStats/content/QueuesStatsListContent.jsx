import { Table } from '@chakra-ui/react';
import TemplateListContent from "../../../templates/TemplateListContent";

const QueuesStatsListContent = ({queue}) => {

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const yy = String(date.getFullYear()).slice(2);
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `${dd}/${mm}/${yy}`;
      };

  return (
    <TemplateListContent
      ressource={queue}
    >
      <Table.Cell>{queue.queue_name}</Table.Cell>
      <Table.Cell>{queue.received}</Table.Cell>
      <Table.Cell>{queue.answered}</Table.Cell>
      <Table.Cell>{queue.answered_rate}</Table.Cell>
      <Table.Cell>{queue.average_waiting_time}</Table.Cell>
      <Table.Cell>{queue.not_answered}</Table.Cell>
      <Table.Cell>{queue.abandonned}</Table.Cell>
      <Table.Cell>{queue.blocked}</Table.Cell>
      <Table.Cell>{queue.closed}</Table.Cell>
      <Table.Cell>{queue.saturated}</Table.Cell>
      <Table.Cell>{formatDate(queue.from)}</Table.Cell>
      <Table.Cell>{formatDate(queue.until)}</Table.Cell>
    </TemplateListContent>
  )
}

export default QueuesStatsListContent
