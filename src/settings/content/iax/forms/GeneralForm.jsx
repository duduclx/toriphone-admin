import { Flex, Button, IconButton, HStack } from "@chakra-ui/react";
import { InputUi } from "../../../ui";
import { FaTrashAlt, FaQuestionCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../templates/forms/FormContainer";

const GeneralForm = ({ general, setGeneral }) => {
  // requirements
  const { t } = useTranslation("admin");

  const handleAddOption = () => {
    setGeneral((prev) => ({
      ...prev,
      options: [...prev.options, ["", ""]],
    }));
  };

  const handleRemoveOption = (index) => {
    setGeneral((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };

  const handleChangeOption = (index, value, isFirstInput) => {
    setGeneral((prev) => {
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
      {general.options.map((option, index) => (
        <Flex flexDirection="row" gap="4" alignItems="center" justifyContent="center" key={index}>
          <InputUi value={option[0]} onChange={(e) => handleChangeOption(index, e.target.value, true)} />
          <InputUi value={option[1]} onChange={(e) => handleChangeOption(index, e.target.value, false)} />
          <IconButton variant="ghost" colorPalette="danger" onClick={() => handleRemoveOption(index)}>
            <FaTrashAlt />
          </IconButton>
        </Flex>
      ))}
      <Flex justifyContent="flex-start">
        <HStack gap="4">
          <Button colorPalette="primary" onClick={handleAddOption}>{t("iax.add")}</Button>
          <IconButton
            variant="ghost"
            onClick={() =>
              window.open(
                "https://github.com/asterisk/asterisk/blob/master/configs/samples/iax.conf.sample",
                "_blank",
                "noopener,noreferrer"
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

export default GeneralForm;
