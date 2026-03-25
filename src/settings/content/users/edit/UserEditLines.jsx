import { useEffect, useState } from "react";
import { Box, Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ButtonAddUi } from "../../../ui";

import UserEditLine from "./UserEditLine";
import { useApis } from "../../../../ApiProvider";
import FormContainer from "../../../templates/forms/FormContainer";

const UserEditLines = ({ user, setUser, userCurrent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { contextsGet } = useApis();

  // internalsContext should be here instead of UserEditLine
  const [internalsContext, setInternalsContext] = useState(null); // selectable contexts

  useEffect(() => {
    const fetchContext = async () => {
      const res = await contextsGet();
      const internals = res.items.filter((item) => item.type === "internal");
      setInternalsContext(internals);
    };
    fetchContext();
  }, []);

  const handleAddLine = () => {
    const newLine = {
      caller_id_name: user.firstname + " " + user.lastname,
      protocol: "sip",
      position: 1,
      registar: "default",
      application: null,
      context: internalsContext[0].name,
      device_id: null,
      endpoint_custom: null,
      endpoint_sccp: null,
      endpoint_sip: null,
      extensions: [],
    };

    setUser((prevUser) => ({
      ...prevUser,
      lines: [...prevUser.lines, newLine],
    }));
  };

  return (
    <FormContainer alignSelf="center" justifyContent="center">
      <Table.ScrollArea>
        <Table.Root variant="line">
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("users.lines.protocol")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("users.lines.models")}</Table.ColumnHeader>
              {/*
              <Table.ColumnHeader>Nom</Table.ColumnHeader>
              */}
              <Table.ColumnHeader>{t("users.lines.context")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("users.lines.extension")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("users.lines.device")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("users.lines.line")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("users.lines.application")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {user.lines.map((line, index) => (
              <UserEditLine
                line={line}
                userCurrent={userCurrent}
                setUser={setUser}
                index={index}
                internalsContext={internalsContext}
                key={index}
              />
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
      <Box textAlign="right">
        <ButtonAddUi text={t("common.line_add")} onClick={handleAddLine} />
      </Box>
    </FormContainer>
  );
};

export default UserEditLines;
