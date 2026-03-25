import { Flex, Button, IconButton } from "@chakra-ui/react";
import { InputUi, NativeSelectUi } from "../../../ui";
import { FaTrashAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import systemOptions from "../helpers/systemOptions";
import FormContainer from "../../../templates/forms/FormContainer";

const SystemForm = ({ system, setSystem }) => {
  // requirements
  const { t } = useTranslation("admin");

  const handleAddOption = () => {
    setSystem((prev) => ({
      ...prev,
      options: [...prev.options, ["", ""]],
    }));
  };

  const handleRemoveOption = (index) => {
    setSystem((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };

  const handleChangeOption = (index, value, isFirstInput) => {
    setSystem((prev) => {
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
      {system.options.map((option, index) => (
        <Flex flexDirection="row" gap="4" alignItems="center" justifyContent="center" key={index}>
          <NativeSelectUi value={option[0]} onChange={(e) => handleChangeOption(index, e.target.value, true)}>
            {systemOptions.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </NativeSelectUi>
          <InputUi value={option[1]} onChange={(e) => handleChangeOption(index, e.target.value, false)} />
          <IconButton variant="ghost" colorPalette="danger" onClick={() => handleRemoveOption(index)}>
            <FaTrashAlt />
          </IconButton>
        </Flex>
      ))}
      <Flex justifyContent="flex-start">
        <Button colorPalette="primary" onClick={handleAddOption}>{t("pjsip.add")}</Button>
      </Flex>
    </FormContainer>
  );
};

export default SystemForm;
