import { useEffect, useState } from "react";
import { ButtonAddUi } from "../../../ui";
import { useTranslation } from "react-i18next";
import { useApis } from "../../../../ApiProvider";
import FormContainer from "../../../templates/forms/FormContainer";
import FunckeyOptions from "../../../helpers/funckeys/FunckeyOptions";
import UserEditFunckeysTemplate from "./UserEditFunckeysTemplate";
import { Box } from "@chakra-ui/react";

const UserEditFunckeys = ({ user, setUser }) => {
  //requirements
  const { t } = useTranslation("admin");

  // api
  const { userFunckeysGet } = useApis();

  const [funckeys, setFunckeys] = useState([]);

  useEffect(() => {
    const update = async () => {
      const fk = await userFunckeysGet(user);
      // Convertir funckeys.keys en tableau
      const keysArray = Object.entries(fk.keys).map(([position, key]) => ({
        ...key,
        position: parseInt(position),
      }));

      setFunckeys(keysArray);
    };
    update();
  }, []);

  useEffect(() => {
    setUser({
      ...user,
      funckeys: funckeys,
    });
  }, [funckeys]);

  const handleAddKey = () => {
    const newId = funckeys.length + 1;
    setFunckeys((prev) => [
      ...prev,
      {
        inherited: false,
        blf: false,
        label: "",
        position: newId,
        destination: {
          href: null,
          type: "",
          conference_id: null,
        },
      },
    ]);
  };

  return (
    <FormContainer>
      <UserEditFunckeysTemplate user={user} setUser={setUser} />
      {funckeys.map((funckey, index) => (
        <FormContainer key={index} borderRadius="8" p="4">
          <FunckeyOptions funckey={funckey} index={index} funckeys={funckeys} setFunckeys={setFunckeys} />
        </FormContainer>
      ))}
      <Box textAlign="right">
        <ButtonAddUi text={t("destinations.funckeys.add")} onClick={handleAddKey} />
      </Box>
    </FormContainer>
  );
};

export default UserEditFunckeys;
