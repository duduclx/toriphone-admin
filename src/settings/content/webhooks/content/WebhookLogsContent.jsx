import { Table, IconButton, Badge } from "@chakra-ui/react";
import { FaExclamation } from "react-icons/fa";

import formatDate from "../../../utils/formatDate";

const WebhookLogsContent = ({ log, onOpen, setSelectedLog }) => {

  // set log
  const openLog = () => {
    setSelectedLog(log);
    onOpen();
  }

  return (
    <>
      <Table.Row bg="TableBodyBg">
        <Table.Cell>{log.uuid}</Table.Cell>
        <Table.Cell>
          {log.attempts} / {log.max_attempts}
        </Table.Cell>
        <Table.Cell>
          <Badge
            variant="subtle"
            borderRadius="6"
            fontSize="0.8em"
            colorPalette={log.status === "failure" ? "danger" : "secondary"}
          >
            {log.status}
          </Badge>
        </Table.Cell>
        <Table.Cell>{formatDate(log.started_at)}</Table.Cell>
        <Table.Cell>{formatDate(log.ended_at)}</Table.Cell>
        <Table.Cell>
          <IconButton variant="ghost" colorPalette="secondary" onClick={() => openLog()}>
            <FaExclamation />
          </IconButton>
        </Table.Cell>
      </Table.Row>
    </>
  );
};

export default WebhookLogsContent;
