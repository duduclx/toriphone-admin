import { useState } from "react";
import { Flex, IconButton, Text, Textarea } from "@chakra-ui/react";
import { InputUi } from "../../ui";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import FormContainer from "../../templates/forms/FormContainer";

const VoicemailForm = ({ voicemail, setVoicemail }) => {
  // requirements
  const { t } = useTranslation("admin");

  // new line
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  // Ajouter une nouvelle paire clé-valeur
  const handleAddOption = () => {
    if (newKey && newValue) {
      setVoicemail((prev) => ({
        ...prev,
        options: {
          ...prev.options,
          [newKey]: newValue,
        },
      }));
      setNewKey("");
      setNewValue("");
    }
  };

  // Supprimer une option par clé
  const handleRemoveOption = (key) => {
    const { [key]: _, ...rest } = voicemail.options;
    setVoicemail((prev) => ({
      ...prev,
      options: rest,
    }));
  };

  return (
    <FormContainer>
      {voicemail?.options &&
        Object.entries(voicemail.options).map(([key, value]) => (
          <Flex key={key} alignItems="center" gap="2">
            <Text width="150px">{key}</Text>
            {key === "emailbody" ? (
              <Textarea
                value={value}
                onChange={(e) =>
                  setVoicemail((prev) => ({
                    ...prev,
                    options: {
                      ...prev.options,
                      [key]: e.target.value,
                    },
                  }))
                }
              />
            ) : (
              <InputUi
                value={value}
                onChange={(e) =>
                  setVoicemail((prev) => ({
                    ...prev,
                    options: {
                      ...prev.options,
                      [key]: e.target.value,
                    },
                  }))
                }
              />
            )}
            <IconButton variant="ghost" colorPalette="danger" onClick={() => handleRemoveOption(key)}>
              <FaTrashAlt />
            </IconButton>
          </Flex>
        ))}

      <Flex gap="2" alignItems="center">
        <InputUi placeholder={t("voicemailGeneral.new_key")} value={newKey} onChange={(e) => setNewKey(e.target.value)} />
        <InputUi
          placeholder={t("voicemailGeneral.new_value")}
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <IconButton colorPalette="primary" onClick={handleAddOption}>
          <FaPlus />
        </IconButton>
      </Flex>
    </FormContainer>
  );
};

export default VoicemailForm;
