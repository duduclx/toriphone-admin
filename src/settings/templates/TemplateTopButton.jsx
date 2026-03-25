import { Flex, Button, IconButton, HStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaAngleLeft } from "react-icons/fa";
import { FaArrowRotateRight } from "react-icons/fa6";

import ButtonAdd from "./buttons/ButtonAdd";
import FilterForm from "./filter/FilterForm";
import TemplateSearchForm from "./TemplateSearchForm";
import TemplateSearchItemsForm from "./TemplateSearchItemsForm";

const TemplateTopButton = ({
  setSelectedComponent,
  route,
  isBack,
  reload = null,
  hasNoAdd = null,
  filter,
  setFilter,
  search,
  setSearch,
}) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <Flex mt="4" ml="4" justifyContent="flex-start">
      <HStack gap="4">
        {isBack && (
          <Button colorPalette="primary" onClick={() => setSelectedComponent(route)}>
            <FaAngleLeft /> {t("common.back")}
          </Button>
        )}
        {reload && (
          <IconButton colorPalette="primary" onClick={reload}>
            <FaArrowRotateRight />
          </IconButton>
        )}
        {!hasNoAdd && !reload && !isBack && <ButtonAdd setSelectedComponent={setSelectedComponent} route={route} />}
        {filter !== null && <FilterForm filter={filter} setFilter={setFilter} />}
        {search !== null && <TemplateSearchForm search={search} setSearch={setSearch} />}
        {search !== null && <TemplateSearchItemsForm />}
      </HStack>
    </Flex>
  );
};

export default TemplateTopButton;
