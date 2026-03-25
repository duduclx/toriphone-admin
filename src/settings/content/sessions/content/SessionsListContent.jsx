import { useEffect, useState } from "react";
import { Button, IconButton, Dialog, Table, Text, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { FaCheckCircle, FaTrashAlt } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";

import { useApis } from "../../../../ApiProvider";

import TemplateListContent from "../../../templates/TemplateListContent";

const SessionsListContent = ({ session, setSelectedComponent, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();
  const { open: openAll, onOpen: onOpenAll, onClose: onCloseAll } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { sessions, sessionsPageGet, itemsPerPage, sessionDelete, authUserGet, sessionsUserGet, sessionsUserDelete } = useApis();

  // ressource
  const [user, setUser] = useState({});

  useEffect(() => {
        const fetchuser = async () => {
            const user = await authUserGet({uuid: session.user_uuid})
            setUser(user)
        }
        fetchuser()
  }, [])

  // submit
  const submit = async () => {
    setLoading(true);
    await sessionDelete(session);
    const newTotal = sessions.total - 1;
    const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);

    // Vérifier si la page actuelle est toujours valide
    if (page > maxPage) {
      setPage(maxPage); // Mettre à jour la page
    } else {
      const offset = page * parseInt(itemsPerPage, 10);
      await sessionsPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
    setLoading(false);
    onClose();
  };

  const submitAll = async () => {
    setLoading(true);
    const res = await sessionsUserGet(user);
    await sessionsUserDelete(res);

    const newTotal = sessions.total - res.items.length;
    const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);
    const newPage = Math.min(page, maxPage);
    setPage(newPage);
    const offset = newPage * parseInt(itemsPerPage, 10);
    await sessionsPageGet(search, offset, parseInt(itemsPerPage, 10));

    setLoading(false);
    onCloseAll();
  }

  return (
    <>
    <TemplateListContent
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      ressource={session}
      submit={submit}
      title={t("sessions.delete.title")}
      subTitle={t("sessions.delete.subTitle", { name: user?.firstname + " " + user?.lastname })}
      loading={loading}
    >
      <Table.Cell>{user?.username}</Table.Cell>
      <Table.Cell>{user?.firstname}</Table.Cell>
      <Table.Cell>{user?.lastname}</Table.Cell>
      <Table.Cell>
        {session.mobile ? (
          <IconButton variant="ghost" colorPalette="secondary">
            <FaCheckCircle />
          </IconButton>
        ) : (
          <IconButton variant="ghost" colorPalette="danger">
            <FaCircleXmark />
          </IconButton>
        )}
      </Table.Cell>
      <Table.Cell>
        <IconButton variant="ghost" colorPalette="danger" onClick={() => onOpenAll()}>
          <FaTrashAlt />
        </IconButton>
      </Table.Cell>
    </TemplateListContent>
    <Dialog.Root open={openAll} onOpenChange={onCloseAll}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg="bgDefault">
            <Dialog.Header alignSelf="center">
              <Dialog.Title>{t("sessions.list.delete_all_title")}</Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger />
            <Dialog.Body>
              <Text>{t("sessions.list.delete_all_subtitle")} {user?.firstname + " " + user?.lastname}</Text>
            </Dialog.Body>
            <Dialog.Footer>
              <Button colorPalette="danger" onClick={submitAll} isLoading={loading}>
                {t("common.delete")}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
    </Dialog.Root>
    </>
  );
};

export default SessionsListContent;
