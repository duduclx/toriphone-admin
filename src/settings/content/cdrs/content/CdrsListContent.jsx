import { Table } from "@chakra-ui/react";

import { IconButtonCheckUi } from "../../../ui";
import CdrCallDirection from "../helpers/CdrCallDirection";
import CdrCallStatus from "../helpers/CdrCallStatus";

const CdrsListContent = ({ cdr }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Les mois commencent à 0
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <>
      <Table.Row bg="TableBodyBg">
        <Table.Cell>{formatDate(cdr.start)}</Table.Cell>
        <Table.Cell><CdrCallDirection cdr={cdr}/></Table.Cell>
        <Table.Cell>{cdr.source_extension}</Table.Cell>
        <Table.Cell>{cdr.source_name}</Table.Cell>
        <Table.Cell>{cdr.destination_extension}</Table.Cell>
        <Table.Cell>{cdr.destination_name}</Table.Cell>
        <Table.Cell>{cdr.duration || "0"}</Table.Cell>
        <Table.Cell>
          <IconButtonCheckUi item={cdr.answered} />
        </Table.Cell>
        <Table.Cell><CdrCallStatus cdr={cdr}/></Table.Cell>
      </Table.Row>
    </>
  );
};

export default CdrsListContent;
