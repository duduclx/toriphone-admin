import { Flex, Box, Spinner } from "@chakra-ui/react";

import TemplateHeader from "./TemplateHeader";
import TemplateTopButton from "./TemplateTopButton";
import ButtonsFormsAdd from "./buttons/ButtonsFormsAdd";
import ButtonsFormsEdit from "./buttons/ButtonsFormsEdit";
import Errors from "./errors/Errors";
import TemplatePagination from "./TemplatePagination";

const TemplatePage = ({
  children,
  title,
  setSelectedComponent = null,
  route = null,
  submit,
  isBack = null,
  isList = null,
  isEdit = null,
  isCreate = null,
  hasTabs = null,
  hasNoAdd = null,
  textButton = null,
  errors = null,
  loading = null,
  reload = null,
  filter = null,
  setFilter = null,
  search = null,
  setSearch = null,
  page = 0,
  handlePageChange = null,
  items = null,
}) => {
  return (
    <Flex flexDirection="column" height="100vh" flex="1" p="2" overflow="hidden">
      <TemplateHeader title={title} />
      {isList && (
        <TemplateTopButton
          setSelectedComponent={setSelectedComponent}
          route={route}
          isBack={isBack}
          reload={reload}
          hasNoAdd={hasNoAdd}
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
        />
      )}
      {errors && <Errors errors={errors} />}
      <Flex
        flexDirection="column"
        p="2"
        flexWrap="nowrap"
        justifyContent="flex-start"
        alignContent="center"
        className="hide-scrollbar"
        flex="1"
        overflowY="auto"
      >
        {hasTabs ? (
          // Rend children directement si hasTabs est vrai
          <Box position="relative">
                {loading && (
                  <Flex
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    zIndex={10}
                    align="center"
                    justify="center"
                  >
                    <Spinner size="xl" />
                  </Flex>
                )}
          {children}
          </Box>
        ) : (
          // Sinon, rend children dans un Flex secondaire
          <Flex
            flexDirection="column"
            py={isList ? "0" : "12"}
            gap="4"
            alignSelf="center"
            width={isList ? "100%" : "50%"}
            justifyContent="center"
          >
            <Box position="relative">
                {loading && (
                  <Flex
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    zIndex={10}
                    align="center"
                    justify="center"
                  >
                    <Spinner size="xl" />
                  </Flex>
                )}
          {children}
          </Box>
          </Flex>
        )}
        {items && (
          <Flex flex="1" justifyContent="center">
            <TemplatePagination
              items={items}
              page={page}
              handlePageChange={handlePageChange}
            />
          </Flex>
        )}
        {isEdit && (
          <Flex
            flex="1"
            flexDirection="column"
            px="16"
            py="4"
            gap="4"
            width="100%"
            justifyContent="flex-end"
            className="hide-scrollbar"
            overflowY="visible"
          >
            <ButtonsFormsEdit
              setSelectedComponent={setSelectedComponent}
              route={route}
              submit={submit}
              loading={loading}
              text={textButton}
            />
          </Flex>
        )}
        {isCreate && (
          <Flex flex="1" flexDirection="column" p="4" gap="4" alignSelf="center" width="50%" justifyContent="flex-end">
            <ButtonsFormsAdd setSelectedComponent={setSelectedComponent} route={route} submit={submit} loading={loading} />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default TemplatePage;
