import { useState, useEffect } from "react";
import { Field, Text, Flex } from "@chakra-ui/react";
import { ButtonAddUi, IconButtonTrashUi, InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../templates/forms/FormContainer";

const CallpermissionExtensions = ({ callpermission, setCallpermission }) => {
  // requirements
  const { t } = useTranslation("admin");

  // ressource
  const [extensions, setExtensions] = useState(callpermission.extensions);

  useEffect(() => {
    setCallpermission((prev) => ({
      ...prev,
      extensions: extensions,
    }));
  }, [extensions, setCallpermission]);

  const handleAddExtension = () => {
    setExtensions([...extensions, ""]);
  };

  const handleRemoveExtension = (index) => {
    setExtensions(extensions.filter((_, i) => i !== index));
  };

  const handleExtensionChange = (index, value) => {
    const updatedExtensions = extensions.map((extension, i) => (i === index ? value : extension));
    setExtensions(updatedExtensions);
  };

  return (
    <FormContainer>
      <Text>{t("common.extensions")} :</Text>
      {extensions.map((extension, index) => (
        <Flex key={index} gap="4">
          <IconButtonTrashUi onClick={() => handleRemoveExtension(index)} />
          <Field.Root>
            <InputUi
              placeholder={t("common.extensions")}
              value={extension}
              onChange={(e) => handleExtensionChange(index, e.target.value)}
            />
          </Field.Root>
        </Flex>
      ))}
      <ButtonAddUi text={t("common.extension_add")} onClick={handleAddExtension}/>
    </FormContainer>
  );
};

export default CallpermissionExtensions;
