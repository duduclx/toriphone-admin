import { Flex, Text, Box, Button, IconButton } from "@chakra-ui/react";
import { InputUi } from "../../../ui";
import { FaTrashAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../templates/forms/FormContainer";

const LimitsForm = ({ limits, setLimits }) => {
  // Traductions
  const { t } = useTranslation("admin");

  // Ajouter une nouvelle entrée vide
  const handleAddOption = () => {
    setLimits((prev) => ({
      ...prev,
      items: [...prev.items, { ip_address: "", netmask: "", limit: "" }],
    }));
  };

  // Supprimer une entrée par index
  const handleRemoveOption = (index) => {
    setLimits((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  // Mettre à jour une propriété d'une entrée
  const handleChangeOption = (index, key, value) => {
    setLimits((prev) => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [key]: value };
      return {
        ...prev,
        items: newItems,
      };
    });
  };

  return (
    <FormContainer>
      <Flex flexDirection="row" alignItems="center">
        <Box width="30%" textAlign="center">
          <Text>{t("iax.ip_address")}</Text>
        </Box>
        <Box width="30%" textAlign="center">
          <Text>{t("iax.netmask")}</Text>
        </Box>
        <Box width="30%" textAlign="center">
          <Text>{t("iax.limit")}</Text>
        </Box>
      </Flex>
      {limits.items.map((item, index) => (
        <Flex flexDirection="row" gap="4" alignItems="center" justifyContent="center" key={index}>
          <InputUi
            value={item.ip_address}
            onChange={(e) => handleChangeOption(index, "ip_address", e.target.value)}
          />
          <InputUi
            value={item.netmask}
            onChange={(e) => handleChangeOption(index, "netmask", e.target.value)}
          />
          <InputUi
          value={item.limit}
          onChange={(e) => handleChangeOption(index, "limit", e.target.value)}
          />
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
        <Button colorPalette="primary" onClick={handleAddOption}>{t("iax.add")}</Button>
      </Flex>
    </FormContainer>
  );
};

export default LimitsForm;
