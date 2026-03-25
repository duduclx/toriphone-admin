import { Flex, Text, Input, Button, Field, HStack, Box } from "@chakra-ui/react";
import { IconButtonTrashUi, InputUi, NativeSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import siptransportsOptions from "../helper/SiptransportsOptions";

const SiptransportForm = ({ transport, setTransport }) => {
  // requirements
  const { t } = useTranslation("admin");

  const addOption = () => {
    setTransport({
      ...transport,
      options: [...transport.options, [siptransportsOptions[0], ""]],
    });
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = transport.options.map((option, idx) =>
      idx === index ? (field === "key" ? [value, option[1]] : [option[0], value]) : option
    );
    setTransport({ ...transport, options: newOptions });
  };

  const removeOption = (index) => {
    const newOptions = transport.options.filter((_, idx) => idx !== index);
    setTransport({ ...transport, options: newOptions });
  };

  return (
    <>
      <Field.Root>
        <Field.Label>{t("common.name")} :</Field.Label>
        <InputUi
          required
          placeholder={t("common.name")}
          value={transport.name}
          onChange={(e) => setTransport({ ...transport, name: e.target.value })}
        />
      </Field.Root>
      <Text fontSize="lg" mt="4">
        {t("common.options")} :
      </Text>
      <HStack>
        <Box width="50%">
          <Text>{t("common.key")}</Text>
        </Box>
        <Box width="50%">
          <Text>{t("common.value")}</Text>
        </Box>
      </HStack>
      {transport.options.map((option, index) => (
        <Flex key={index} gap="4" alignItems="end" flex="1" justifyContent="space-between">
          <Field.Root>
            <NativeSelectUi value={option[0]} onChange={(e) => handleOptionChange(index, "key", e.target.value)}>
              {siptransportsOptions.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </NativeSelectUi>
          </Field.Root>
          <Field.Root>
            <InputUi value={option[1]} onChange={(e) => handleOptionChange(index, "value", e.target.value)} />
          </Field.Root>
          <IconButtonTrashUi onClick={() => removeOption(index)} />
        </Flex>
      ))}
      <Button colorPalette="primary" mt="4" onClick={addOption}>
        {t("sipTransports.add_option")}
      </Button>
    </>
  );
};

export default SiptransportForm;
