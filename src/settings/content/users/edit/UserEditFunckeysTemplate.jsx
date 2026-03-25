import { useEffect, useState } from "react";
import { Flex, Field } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import FunckeysTemplates from "../../../helpers/funckeys/FunckeysTemplates";

const UserEditFunckeysTemplate = ({ user, setUser }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { funckeysTemplates } = useApis();

  useEffect(() => {
    if (funckeysTemplates.items && user.func_key_template_id) {
      const fk = funckeysTemplates.items.find((item) => item.id === user.func_key_template_id);
      setDestination({ ...fk, value: fk.id, label: fk.name });
    }
  }, [funckeysTemplates]);

  const [destination, setDestination] = useState(null);

  useEffect(() => {
    if (destination) {
      setUser({
        ...user,
        func_key_template_id: destination.id,
      });
    } else {
      setUser({
        ...user,
        func_key_template_id: null,
      });
    }
  }, [destination]);

  return (
    <Flex width="50%" alignSelf="center">
      <Field.Root>
        <Field.Label>{t("destinations.funckeys.associate")} :</Field.Label>
        <FunckeysTemplates destination={destination} setDestination={setDestination} width="100%" />
      </Field.Root>
    </Flex>
  );
};

export default UserEditFunckeysTemplate;
