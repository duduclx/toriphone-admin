import { Flex, Text, Box, Button, IconButton } from "@chakra-ui/react";
import { InputUi } from "../../../ui";
import { FaTrashAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../templates/forms/FormContainer";

const IceForm = ({ ice, setIce }) => {
  // requirements
  const { t } = useTranslation("admin");

  const handleAddOption = () => {
    setIce((prev) => ({
      ...prev,
      options: [...prev.options, ["", ""]],
    }));
  };

  const handleRemoveOption = (index) => {
    setIce((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };

  const handleChangeOption = (index, value, isFirstInput) => {
    setIce((prev) => {
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
      <Flex flexDirection="row" alignItems="center">
        <Box width="50%">
          <Text>{t("rtp.address_local")}</Text>
        </Box>
        <Box width="50%">
          <Text>{t("rtp.address_advertised")}</Text>
        </Box>
      </Flex>
      {ice.options.map((item, index) => (
        <Flex flexDirection="row" gap="4" alignItems="center" justifyContent="center" key={index}>
          <InputUi value={item[0]} onChange={(e) => handleChangeOption(index, e.target.value, true)} />
          <InputUi value={item[1]} onChange={(e) => handleChangeOption(index, e.target.value, false)} />
          <IconButton variant="ghost" colorPalette="danger" onClick={() => handleRemoveOption(index)}>
            <FaTrashAlt />
          </IconButton>
        </Flex>
      ))}
      <Flex justifyContent="flex-start">
        <Button colorPalette="primary" onClick={handleAddOption}>
          {t("rtp.add")}
        </Button>
      </Flex>
    </FormContainer>
  );
};

export default IceForm;
