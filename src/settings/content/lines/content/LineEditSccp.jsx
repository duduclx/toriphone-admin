import { Flex, Text } from "@chakra-ui/react";
import { ButtonAddUi, IconButtonTrashUi, InputUi, NativeSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import LineContext from "../helper/LineContext";
import FormContainer from "../../../templates/forms/FormContainer";

const LineEditSccp = ({ contextsOptions, line, setLine, endpointSip, setEndpointSip }) => {
  // requirements
  const { t } = useTranslation("admin");

  // sccpOtions
  const sccpOptions = ["cid_name", "cid_num", "allow", "disallow"];

  // Mettre à jour la clé (premier élément de la paire)
  const handleKey = (index, value) => {
    setEndpointSip((prev) => {
      const updatedOptions = [...(prev.options || [])];
      updatedOptions[index] = [value, updatedOptions[index]?.[1] || ""];
      return {
        ...prev,
        options: updatedOptions,
      };
    });
  };

  // Mettre à jour la valeur (deuxième élément de la paire)
  const handleValue = (value, index) => {
    setEndpointSip((prev) => {
      const updatedOptions = [...(prev.options || [])];
      updatedOptions[index] = [updatedOptions[index]?.[0] || sccpOptions[0], value];
      return {
        ...prev,
        options: updatedOptions,
      };
    });
  };

  // Ajouter une nouvelle paire `[clé, valeur]` à `options`
  const handleAddKey = () => {
    setEndpointSip((prev) => ({
      ...prev,
      options: [...(prev.options || []), [sccpOptions[0], ""]],
    }));
  };

  // supprimer une paire
  const handleRemoveOption = (index) => {
    setEndpointSip((prev) => {
      const updatedOptions = prev.options?.filter((_, i) => i !== index) || [];
      return {
        ...prev,
        options: updatedOptions,
      };
    });
  };

  return (
    <FormContainer>
      <LineContext contextsOptions={contextsOptions} line={line} setLine={setLine} />
      {endpointSip && (
        <FormContainer>
          <Text>{t("common.options")} :</Text>
          {endpointSip.options?.map((item, index) => (
            <Flex key={index} gap="4">
              <IconButtonTrashUi onClick={() => handleRemoveOption(index)} />
              <NativeSelectUi value={item[0] || ""} onChange={(e) => handleKey(index, e.target.value)}>
                {sccpOptions.map((option, optIndex) => (
                  <option key={optIndex} value={option}>
                    {option}
                  </option>
                ))}
              </NativeSelectUi>
              <InputUi value={item[1] || ""} onChange={(e) => handleValue(e.target.value, index)} />
            </Flex>
          ))}
        </FormContainer>
      )}
      <ButtonAddUi text={t("common.option_add")} onClick={handleAddKey} />
    </FormContainer>
  );
};

export default LineEditSccp;
