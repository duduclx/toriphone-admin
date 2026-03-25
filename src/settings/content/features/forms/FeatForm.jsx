import { Flex, Button, IconButton } from "@chakra-ui/react";
import { InputUi, NativeSelectUi } from "../../../ui";
import { FaTrashAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import featuremapOptions from "../helpers/featuremapOptions";
import FormContainer from "../../../templates/forms/FormContainer";

const FeatForm = ({ featmap, setFeatmap }) => {
  // requirements
  const { t } = useTranslation("admin");

  const handleAddOption = () => {
    setFeatmap((prev) => ({
      ...prev,
      options: [...prev.options, ["", ""]],
    }));
  };

  const handleRemoveOption = (index) => {
    setFeatmap((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };

  const handleChangeOption = (index, value, isFirstInput) => {
    setFeatmap((prev) => {
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
      {featmap.options.map((option, index) => (
        <Flex flexDirection="row" gap="4" alignItems="center" justifyContent="center" key={index}>
            <NativeSelectUi value={option[0]} onChange={(e) => handleChangeOption(index, e.target.value, true)}>
              {featuremapOptions.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </NativeSelectUi>
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
        <Button colorPalette="primary" onClick={handleAddOption}>{t("features.add")}</Button>
      </Flex>
    </FormContainer>
  );
};

export default FeatForm;
