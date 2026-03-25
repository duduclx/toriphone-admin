import { Flex, Text, Separator } from "@chakra-ui/react";

const TemplateHeader = ({ title }) => {
  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" px="8">
        <Text p="2" as="b" fontSize="3xl">
          {title}
        </Text>
      </Flex>
      <Separator />
    </>
  );
};

export default TemplateHeader;
