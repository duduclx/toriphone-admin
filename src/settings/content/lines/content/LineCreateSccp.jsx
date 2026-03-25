import { Flex, Text } from "@chakra-ui/react";
import { ButtonAddUi, IconButtonTrashUi, InputUi, NativeSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import FormContainer from "../../../templates/forms/FormContainer";
import LineContext from "../helper/LineContext";

const LineCreateSccp = ({ contextsOptions, line, setLine }) => {
  // requirements
  const { t } = useTranslation("admin");

  // sccpOtions
  const sccpOptions = ["cid_name", "cid_num", "allow", "disallow"];

  // Mettre à jour la clé (premier élément de la paire)
  const handleKey = (index, value) => {
    setLine((prevLine) => {
      const updatedOptions = [...(prevLine.endpoint_sccp?.options || [])];
      updatedOptions[index] = [value, updatedOptions[index]?.[1] || ""];
      return {
        ...prevLine,
        endpoint_sccp: { ...prevLine.endpoint_sccp, options: updatedOptions },
      };
    });
  };

  // Mettre à jour la valeur (deuxième élément de la paire)
  const handleValue = (value, index) => {
    setLine((prevLine) => {
      const updatedOptions = [...(prevLine.endpoint_sccp?.options || [])];
      updatedOptions[index] = [updatedOptions[index]?.[0] || sccpOptions[0], value];
      return {
        ...prevLine,
        endpoint_sccp: { ...prevLine.endpoint_sccp, options: updatedOptions },
      };
    });
  };

  // Ajouter une nouvelle paire `[clé, valeur]` à `options`
  const handleAddKey = () => {
    setLine((prevLine) => ({
      ...prevLine,
      endpoint_sccp: {
        ...prevLine.endpoint_sccp,
        options: [...(prevLine.endpoint_sccp?.options || []), [sccpOptions[0], ""]],
      },
    }));
  };

  // supprimer une paire
  const handleRemoveOption = (index) => {
    setLine((prevLine) => {
      const updatedOptions = prevLine.endpoint_sccp?.options?.filter((_, i) => i !== index) || [];
      return {
        ...prevLine,
        endpoint_sccp: { ...prevLine.endpoint_sccp, options: updatedOptions },
      };
    });
  };

  return (
    <FormContainer>
      <LineContext contextsOptions={contextsOptions} line={line} setLine={setLine} />
      <Text>{t("common.options")} :</Text>
      {line.endpoint_sccp?.options?.map((item, index) => (
        <Flex key={index} gap="4">
          <IconButtonTrashUi onClick={() => handleRemoveOption(index)} />
          <NativeSelectUi value={item[0] || ""} onChange={(e) => handleKey(index, e.target.value)}>
            {sccpOptions.map((option, optIndex) => (
              <option key={optIndex} value={option}>
                {option}
              </option>
            ))}
          </NativeSelectUi>
          <InputUi
            value={item[1] || ""}
            onChange={(e) => handleValue(e.target.value, index)}
            placeholder={/*t("destinations.funckeys.value_placeholder")*/ "coucou"} // ajout de la traduction pour placeholder
          />
        </Flex>
      ))}
      <ButtonAddUi text={t("common.option_add")} onClick={handleAddKey} />
    </FormContainer>
  );
};

export default LineCreateSccp;
