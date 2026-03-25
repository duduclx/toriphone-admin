import { Table, Flex } from "@chakra-ui/react";

const TemplateTable = ({ children }) => {
  return (
    <Flex flexDirection="column" justifyContent="center" flex="1" alignItems="center" mt="4">
      <Table.ScrollArea width="100%" height="calc(100vh - 220px)" overflowY="auto" className="hide-scrollbar">
        <Table.Root variant="line" size="lg">{children}</Table.Root>
      </Table.ScrollArea>
    </Flex>
  );
};

export default TemplateTable;
