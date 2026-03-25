import { useState, useEffect } from "react";
import { Alert, Table, Button, Dialog, useDisclosure, Text } from "@chakra-ui/react";
import { IconButtonTrashUi, InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import UserEditLineProtocol from "./UserEditLineProtocol";
import UserEditLineContext from "./UserEditLineContext";
import UserEditLineExtension from "./UserEditLineExtension";
import UserEditLineDevice from "./UserEditLineDevice";
import UserEditLinePosition from "./UserEditLinePosition";
import UserEditLineApplication from "./UserEditLineApplication";
import UserEditLineTemplates from "./UserEditLineTemplates";

import { useApis } from "../../../../ApiProvider";


const UserEditLine = ({ line, userCurrent, setUser, index, internalsContext }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // api
  const { contexts, contextRangeGet, endpointSipGet } = useApis();

  const [endpoint, setEndpoint] = useState(null);

  const [context, setContext] = useState(null);

  useEffect(() => {
    if (internalsContext && line.context) {
      const contextLabel = internalsContext.find((item) => item.name === line.context).label;
      setContext({
        name: line.context,
        label: contextLabel,
      });
    }
  }, [internalsContext]);

  useEffect(() => {
    const fetchContext = async () => {
      if (line.endpoint_sip) {
        const endpt = await endpointSipGet(line.endpoint_sip);
        setEndpoint(endpt);
      }
    };
    fetchContext();
  }, []);

  // availableExtensions
  const [availableExtensions, setAvailableExtensions] = useState([]);

  // load availableExtensions
  useEffect(() => {
    const fetchContextRange = async () => {
      const range = await contextRangeGet(contexts.items.find((item) => item.name === line.context).id);

      if (range.items) {
        const available = [];
        // Ajouter les extensions de l'utilisateur
        const userExtensions =
          userCurrent?.lines?.flatMap(line =>
            line.extensions?.map(ext => Number(ext.exten)) ?? []
          ) ?? [];

        available.push(...userExtensions);
        // Ajouter les extensions libres
        range.items.forEach((item) => {
          const start = parseInt(item.start);
          const end = parseInt(item.end);

          if (!isNaN(start) && !isNaN(end)) {
            for (let i = start; i <= end; i++) {
              available.push(i);
            }
          }
        });
        setAvailableExtensions(available);
      }
    };

    fetchContextRange();
  }, [context]);

  const handleDelete = () => {
    setUser((prev) => ({
      ...prev,
      lines: prev.lines.filter((_, i) => i !== index),
    }));
    onClose();
  };

  return (
    <>
      {line.id && line.protocol !== userCurrent.lines[index].protocol && (
        <Table.Row bg="TableBodyBg">
          <Table.Cell colSpan={8} p={0}>
            <Alert.Root status="error" width="100%">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>{t("users.edit.alert_title")}</Alert.Title>
                <Alert.Description>{t("users.edit.alert_description")}</Alert.Description>
              </Alert.Content>
            </Alert.Root>
          </Table.Cell>
        </Table.Row>
      )}
      <Table.Row bg="TableBodyBg" key={index}>
        <Table.Cell>
          <IconButtonTrashUi onClick={onOpen} />
        </Table.Cell>
        <Table.Cell>
          <UserEditLineProtocol line={line} setUser={setUser} index={index} />
        </Table.Cell>
        <Table.Cell>
          <UserEditLineTemplates
            line={line}
            setUser={setUser}
            index={index}
            endpoint={endpoint}
            setEndpoint={setEndpoint}
          />
        </Table.Cell>
        {/*
      <Table.Cell>
        <InputUi disabled value={line.name} />
      </Table.Cell>
      */}
        <Table.Cell>
          <UserEditLineContext
            line={line}
            setUser={setUser}
            index={index}
            internalsContext={internalsContext}
            context={context}
            setContext={setContext}
          />
        </Table.Cell>
        <Table.Cell>
          <UserEditLineExtension
            line={line}
            setUser={setUser}
            index={index}
            availableExtensions={availableExtensions}
            context={context}
          />
        </Table.Cell>
        <Table.Cell>
          <UserEditLineDevice line={line} setUser={setUser} index={index} />
        </Table.Cell>
        <Table.Cell>
          <UserEditLinePosition line={line} setUser={setUser} index={index} />
        </Table.Cell>
        <Table.Cell>
          <UserEditLineApplication line={line} setUser={setUser} index={index} />
        </Table.Cell>
      </Table.Row>

      <Dialog.Root open={open} onOpenChange={onClose}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg="bgDefault">
            <Dialog.Header alignSelf="center">
              <Dialog.Title>{t("users.lines.delete.title")}</Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger />
            <Dialog.Body>
              <Text>{t("users.lines.delete.subTitle", { name: line.name })}</Text>
            </Dialog.Body>

            <Dialog.Footer>
              <Button colorPalette="danger" onClick={() => handleDelete()}>
                {t("common.delete")}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  );
};

export default UserEditLine;
