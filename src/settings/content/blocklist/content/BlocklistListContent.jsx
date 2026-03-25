import { Table } from "@chakra-ui/react";
import TemplateListContent from "../../../templates/TemplateListContent";

const BlocklistListContent = ({ item }) => {

  return (
    <TemplateListContent ressource={item}>
      <Table.Cell>{item.label}</Table.Cell>
      <Table.Cell>{item.number}</Table.Cell>
      <Table.Cell>{item.user_firstname} {item.user_lastname}</Table.Cell>
    </TemplateListContent>
  );
};

export default BlocklistListContent;
