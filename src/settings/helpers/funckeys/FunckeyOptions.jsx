import { Box, Flex, Field } from "@chakra-ui/react";
import { CheckboxUi, IconButtonTrashUi, InputUi } from "../../ui";
import { useColorModeValue } from "../../../components/ui/color-mode";
import { useTranslation } from "react-i18next";

import FunckeysForm from "./FunckeysForm";

const FunckeyOptions = ({ funckey, index, funckeys, setFunckeys }) => {
  // requirements
  const { t } = useTranslation("admin");

  const handleEditKey = (index, field, value) => {
    const updatedFunckeys = [...funckeys];
    updatedFunckeys[index][field] = value;
    setFunckeys(updatedFunckeys);
  };

  const handleEditPosition = (index, newPosition) => {
    const newPos = parseInt(newPosition);

    const updatedFunckeys = [...funckeys];
    updatedFunckeys[index].position = newPos;
    setFunckeys(updatedFunckeys);
  };

  const handleDeleteKey = (index) => {
    const updatedFunckeys = funckeys.filter((_, i) => i !== index);
    setFunckeys(updatedFunckeys);
  };

  return (
    <Flex
    flex="1"
      alignItems="flex-start"
      gap="4"
      mb="2"
      justifyContent="space-between"
      bg="bgPrimary"
      borderRadius="8"
      p="4"
      boxShadow="lg"
    >
      <Box alignSelf="flex-end">
        <IconButtonTrashUi onClick={() => handleDeleteKey(index)} />
      </Box>

      <Box>
        <Field.Root>
          <Field.Label pb="2">{t("destinations.funckeys.blf")}</Field.Label>
          <CheckboxUi checked={funckey.blf} onCheckedChange={(e) => handleEditKey(index, "blf", e.checked)}>
          </CheckboxUi>
        </Field.Root>
      </Box>

      <Box>
        <Field.Root>
          <Field.Label>{t("destinations.funckeys.position")}</Field.Label>
          <InputUi value={funckey.position || ""} onChange={(e) => handleEditPosition(index, e.target.value)} />
        </Field.Root>
      </Box>

      <Box>
        <Field.Root>
          <Field.Label>{t("destinations.funckeys.label")}</Field.Label>
          <InputUi value={funckey.label} onChange={(e) => handleEditKey(index, "label", e.target.value)} />
        </Field.Root>
      </Box>

        <FunckeysForm funckey={funckey} index={index} setFunckeys={setFunckeys} />
    </Flex>
  );
};

export default FunckeyOptions;
