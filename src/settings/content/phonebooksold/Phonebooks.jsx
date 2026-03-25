import { Flex, Text, Separator } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import PhonebooksList from "./content/PhonebooksList";
import ButtonAdd from "../../buttons/ButtonAdd";

const Phonebooks = ({ setSelectedComponent }) => {
  //requirements
  const { t } = useTranslation();

  return (
    <Flex flexDirection="column" height="100vh" flex="1" p="2">
      <Flex justifyContent="space-between" alignItems="center" px={8}>
        <Text p={2} as="b" fontSize="3xl">
          {t("phonebooks.list.title")}
        </Text>
      </Flex>
      <Separator />
      <Flex mt="4" mr="4" justifyContent="flex-end">
        <ButtonAdd setSelectedComponent={setSelectedComponent} route={"contactCreate"} />
      </Flex>
      <Flex
        flexDirection="column"
        p="2"
        flexWrap="nowrap"
        overflowX="auto"
        justifyContent="flex-start"
        alignContent="center"
        className="hide-scrollbar"
      >
        <PhonebooksList setSelectedComponent={setSelectedComponent} />
      </Flex>
    </Flex>
  );
};

export default Phonebooks;
