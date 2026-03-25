import { Flex, Button, IconButton } from "@chakra-ui/react";
import { InputUi, NativeSelectUi } from "../../../ui";
import { FaTrashAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import userOptions from "../helpers/userOptions";

const UserForm = ({ userDefault, setUserDefault }) => {
  // requirements
  const { t } = useTranslation("admin");

  // Fonction pour mettre à jour la clé
  const handleKeyChange = (oldKey, newKey) => {
    setUserDefault((prev) => {
      const newOptions = { ...prev.options };

      delete newOptions[oldKey];
      const selectedOption = userOptions.find((option) => option.value === newKey);

      let newValue = selectedOption?.values[0] || "";
      if (newValue === "input" || newValue === "inputnumber") {
        newValue = "";
      }

      return {
        ...prev,
        options: {
          ...newOptions,
          [newKey]: newValue,
        },
      };
    });
  };

  // Fonction pour mettre à jour la valeur
  const handleValueChange = (key, newValue) => {
    setUserDefault((prev) => ({
      ...prev,
      options: {
        ...prev.options,
        [key]: newValue,
      },
    }));
  };

  // Fonction pour supprimer une clé
  const handleDeleteKey = (keyToDelete) => {
    setUserDefault((prev) => {
      if (!prev) return prev;

      const newOptions = { ...prev.options };
      delete newOptions[keyToDelete];

      return {
        ...prev,
        options: newOptions,
      };
    });
  };

  // Fonction pour ajouter une nouvelle clé avec une valeur par défaut
  const handleAddKey = () => {
    setUserDefault((prev) => ({
      ...prev,
      options: {
        ...prev.options,
        ["newKey"]: "",
      },
    }));
  };
  return (
    <Flex direction="column" gap="4">
      {Object.entries(userDefault.options).map(([key, value], index) => {
        const currentOption = userOptions.find((option) => option.value === key);

        return (
          <Flex key={index} gap="4" align="center">
            {/* Select pour modifier la key */}
            <NativeSelectUi value={key} onChange={(e) => handleKeyChange(key, e.target.value)}>
              {key === "newKey" && (
                <option value="newKey" disabled>
                  {t("confbridge.select_key")}
                </option>
              )}
              {userOptions.map((option, idx) => (
                <option key={idx} value={option.value}>
                  {option.value} (default: {option.default})
                </option>
              ))}
            </NativeSelectUi>

            {/* Select ou Input pour modifier la valeur en fonction de l'option */}
            {currentOption?.values[0] === "input" ? (
              <InputUi
                placeholder={t("confbridge.placeholder_path")}
                value={value}
                onChange={(e) => handleValueChange(key, e.target.value)}
              />
            ) : currentOption?.values[0] === "inputnumber" ? (
              <InputUi
                type="number"
                placeholder={t("confbridge.placeholder_timeout")}
                value={value}
                onChange={(e) => handleValueChange(key, e.target.value)}
              />
            ) : (
              <NativeSelectUi value={value} onChange={(e) => handleValueChange(key, e.target.value)}>
                {currentOption?.values.map((val, idx) => (
                  <option key={idx} value={val}>
                    {val}
                  </option>
                ))}
              </NativeSelectUi>
            )}

            {/* Bouton pour supprimer la ligne */}
            <IconButton
              aria-label="Delete option"
              variant="ghost"
              colorPalette="danger"
              onClick={() => handleDeleteKey(key)}
            >
              <FaTrashAlt />
            </IconButton>
          </Flex>
        );
      })}
      <Flex justifyContent="flex-start">
        <Button colorPalette="primary" onClick={handleAddKey}>{t("confbridge.add_key")}</Button>
      </Flex>
    </Flex>
  );
};

export default UserForm;
