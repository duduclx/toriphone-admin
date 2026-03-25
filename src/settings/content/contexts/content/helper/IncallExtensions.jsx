import { useState, useEffect } from "react";
import { Flex, Field, Text, Box } from "@chakra-ui/react";
import { ButtonAddUi, IconButtonTrashUi, InputUi } from "../../../../ui";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../../templates/forms/FormContainer";

const IncallExtensions = ({ context, setContext }) => {
  // requirements
  const { t } = useTranslation("admin");

  const [extensions, setExtensions] = useState(context.incall_ranges);

  useEffect(() => {
    setContext((prev) => ({
      ...prev,
      incall_ranges: extensions,
    }));
  }, [extensions, setContext]);

  const handleAddExtension = () => {
    setExtensions([...extensions, { start: "", end: "", did_length: "" }]);
  };

  const handleRemoveExtension = (index) => {
    setExtensions(extensions.filter((_, i) => i !== index));
  };

  const handleExtensionChange = (index, key, value) => {
    const updatedExtensions = extensions.map((extension, i) =>
      i === index ? { ...extension, [key]: value } : extension
    );
    setExtensions(updatedExtensions);
  };

  return (
    <FormContainer>
      <Flex justifyContent="space-between" pl="60px" gap="4">
        <Box width="100%">
          <Text>{t("common.start")}</Text>
        </Box>
        <Box width="100%">
          <Text>{t("common.end")}</Text>
        </Box>
        <Box width="100%">
          <Text mr="4">{t("common.did_length")}</Text>
        </Box>
      </Flex>
      {extensions.map((extension, index) => (
        <Flex key={index} gap="4">
          <IconButtonTrashUi onClick={() => handleRemoveExtension(index)} />
          <Field.Root>
            <InputUi
              placeholder={t("common.start")}
              value={extension.start}
              onChange={(e) => handleExtensionChange(index, "start", e.target.value)}
            />
          </Field.Root>
          <Field.Root>
            <InputUi
              placeholder={t("common.end")}
              value={extension.end}
              onChange={(e) => handleExtensionChange(index, "end", e.target.value)}
            />
          </Field.Root>
          <Field.Root>
            <InputUi
              placeholder={t("common.did_length")}
              value={extension.did_length}
              type="number"
              onChange={(e) => handleExtensionChange(index, "did_length", e.target.value)}
            />
          </Field.Root>
        </Flex>
      ))}
      <ButtonAddUi text={t("common.extension_add")} onClick={handleAddExtension} />
    </FormContainer>
  );
};

export default IncallExtensions;
