import { Table } from "@chakra-ui/react";

import { IconButtonStatusUi } from "../../../ui";

const MonitoringListContent = ({ item }) => {
  return (
    <>
      <Table.Row bg="TableBodyBg">
        <Table.Cell>{item.name}</Table.Cell>
        <Table.Cell>
          <IconButtonStatusUi item={item.ari?.status} />
        </Table.Cell>
        <Table.Cell>
          <IconButtonStatusUi item={item.bus_consumer?.status} />
        </Table.Cell>
        <Table.Cell>
          <IconButtonStatusUi item={item.service_token?.status} />
        </Table.Cell>
        <Table.Cell>
          <IconButtonStatusUi item={item.task_queue?.status} />
        </Table.Cell>
        <Table.Cell>
          <IconButtonStatusUi item={item.rest_api?.status} />
        </Table.Cell>
        <Table.Cell>
          <IconButtonStatusUi item={item.master_tenant?.status} />
        </Table.Cell>
        <Table.Cell>
          <IconButtonStatusUi item={item.presence_initialization?.status} />
        </Table.Cell>
      </Table.Row>
    </>
  );
};

export default MonitoringListContent;
