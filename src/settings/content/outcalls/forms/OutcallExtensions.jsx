import { useState, useEffect } from "react";
import { Box, Flex, Field, Text } from "@chakra-ui/react";
import { IconButtonTrashUi, ButtonAddUi, InputUi, NativeSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import FormContainer from "../../../templates/forms/FormContainer";

const OutcallExtensions = ({ outcall, setOutcall }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { contextsGet } = useApis();

  // resources
  const [contexts, setContexts] = useState([]);
  const [extensions, setExtensions] = useState(outcall.extensions);

  useEffect(() => {
    const fetchcontext = async () => {
      const contexts = await contextsGet();
      const filtered = contexts.items.find((item) => item.type === "outcall");
      setContexts([filtered]);
    };
    fetchcontext();
  }, []);

  useEffect(() => {
    setOutcall((prev) => ({
      ...prev,
      extensions: extensions,
    }));
  }, [extensions, setOutcall]);

  const handleAddExtension = () => {
    setExtensions([
      ...extensions,
      { caller_id: "", context: contexts[0].name, exten: "", external_prefix: null, prefix: null, strip_digits: 0 },
    ]);
  };

  const handleRemoveExtension = (index) => {
    setExtensions(extensions.filter((_, i) => i !== index));
  };

  const handleExtensionChange = (index, key, value) => {
    // Si key est "external_prefix" ou "prefix" ET que value est une string vide, on met null
    const isPrefixKey = key === "external_prefix" || key === "prefix" || key === "strip_digits";
    const finalValue = isPrefixKey && value === "" ? null : value;

    const updatedExtensions = extensions.map((extension, i) =>
      i === index ? { ...extension, [key]: finalValue } : extension
    );

    setExtensions(updatedExtensions);
  };

  return (
    <FormContainer>
      <Flex justifyContent="space-between" pl="60px" gap="4">
        <Box width="100%">
          <Text>{t("common.context")}</Text>
        </Box>
        <Box width="100%">
          <Text>{t("common.extension")}</Text>
        </Box>
        <Box width="100%">
          <Text>{t("common.caller_id")}</Text>
        </Box>
        <Box width="100%">
          <Text>{t("common.external_prefix")}</Text>
        </Box>
        <Box width="100%">
          <Text>{t("common.prefix")}</Text>
        </Box>
        <Box width="100%">
          <Text>{t("common.strip_digits")}</Text>
        </Box>
      </Flex>
      {extensions.map((extension, index) => (
        <Flex key={index} gap="4" align="center">
          <IconButtonTrashUi onClick={() => handleRemoveExtension(index)} />
          <NativeSelectUi
            value={extension.context}
            onChange={(e) => handleExtensionChange(index, "context", e.target.value)}
          >
            {contexts.map((item, index) => (
              <option key={index} value={item.name}>
                {item.label}
              </option>
            ))}
          </NativeSelectUi>
          <Field.Root>
            <InputUi
              placeholder={t("outcalls.extension_placeholder")}
              value={extension.exten}
              onChange={(e) => handleExtensionChange(index, "exten", e.target.value)}
            />
          </Field.Root>
          <Field.Root>
            <InputUi
              placeholder={t("outcalls.caller_id_placeholder")}
              value={extension.caller_id}
              onChange={(e) => handleExtensionChange(index, "caller_id", e.target.value)}
            />
          </Field.Root>
          <Field.Root>
            <InputUi
              placeholder={t("outcalls.external_prefix_placeholder")}
              value={extension.external_prefix || ""}
              onChange={(e) => handleExtensionChange(index, "external_prefix", e.target.value)}
            />
          </Field.Root>
          <Field.Root>
            <InputUi
              placeholder={t("outcalls.prefix_placeholder")}
              value={extension.prefix || ""}
              onChange={(e) => handleExtensionChange(index, "prefix", e.target.value)}
            />
          </Field.Root>
          <Field.Root>
            <InputUi
              min="0"
              max="10"
              placeholder={t("outcalls.strip_digits_placeholder")}
              value={extension.strip_digits}
              type="number"
              onChange={(e) => handleExtensionChange(index, "strip_digits", e.target.value)}
            />
          </Field.Root>
        </Flex>
      ))}
      <ButtonAddUi text={t("common.extension_add")} onClick={handleAddExtension} />
    </FormContainer>
  );
};

export default OutcallExtensions;
