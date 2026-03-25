import { Table } from "@chakra-ui/react";
import TemplateListContent from "../../../templates/TemplateListContent";
import { subscriptionsTypes } from "../helpers/SubscriptionsHelper";

const SubscriptionsListContent = ({ subscription }) => {

  return (
    <TemplateListContent ressource={subscription}>
      <Table.Cell>{subscriptionsTypes[subscription?.id]}</Table.Cell>
      <Table.Cell>{subscription?.count}</Table.Cell>
    </TemplateListContent>
  );
};

export default SubscriptionsListContent;
