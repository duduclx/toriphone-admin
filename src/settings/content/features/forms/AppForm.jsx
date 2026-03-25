import { Flex, Button, IconButton, HStack } from "@chakra-ui/react";
import { InputUi } from "../../../ui";
import { FaTrashAlt, FaQuestionCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../templates/forms/FormContainer";

const AppForm = ({ appmap, setAppmap }) => {
  // requirements
  const { t } = useTranslation("admin");

  const handleAddOption = () => {
    setAppmap((prev) => ({
      ...prev,
      options: [...prev.options, ["", ""]],
    }));
  };

  const handleRemoveOption = (index) => {
    setAppmap((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };

  const handleChangeOption = (index, value, isFirstInput) => {
    setAppmap((prev) => {
      const newOptions = [...prev.options];
      if (isFirstInput) {
        newOptions[index][0] = value;
      } else {
        newOptions[index][1] = value;
      }
      return {
        ...prev,
        options: newOptions,
      };
    });
  };

  return (
    <FormContainer>
      {appmap.options.map((option, index) => (
        <Flex flexDirection="row" gap="4" alignItems="center" justifyContent="center" key={index}>
          <InputUi value={option[0]} onChange={(e) => handleChangeOption(index, e.target.value, false)} />
          <InputUi value={option[1]} onChange={(e) => handleChangeOption(index, e.target.value, false)} />
          <IconButton
            variant="ghost"
            colorPalette="danger"
            onClick={() => handleRemoveOption(index)}
          >
            <FaTrashAlt />
          </IconButton>
        </Flex>
      ))}
      <Flex justifyContent="flex-start">
        <HStack gap="4">
          <Button colorPalette="primary" onClick={handleAddOption}>{t("rtp.add")}</Button>
          <IconButton
            variant="ghost"
            onClick={() =>
              window.open(
                "https://docs.asterisk.org/Configuration/Features/Custom-Dynamic-Features/",
                "_blank", // Ouvre le lien dans un nouvel onglet
                "noopener,noreferrer" // Bonnes pratiques de sécurité
              )
            }
          >
            <FaQuestionCircle />
          </IconButton>
        </HStack>
      </Flex>
    </FormContainer>
  );
};

export default AppForm;
