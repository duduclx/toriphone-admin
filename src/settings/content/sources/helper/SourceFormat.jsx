import { Flex } from "@chakra-ui/react";
import { IconButtonTrashUi, InputUi } from "../../../ui";

import SourceAddKey from "./SourceAddKey";
import FormContainer from "../../../templates/forms/FormContainer";

const SourceFormat = ({ source, setSource }) => {

  const addKey = () => {
    setSource((prevSource) => ({
      ...prevSource,
      format_columns: {
        ...prevSource.format_columns,
        "": "",
      },
    }));
  };

  const removeKey = (keyToRemove) => {
    setSource((prevSource) => {
      const { [keyToRemove]: _, ...updatedColumns } = prevSource.format_columns;
      return {
        ...prevSource,
        format_columns: updatedColumns,
      };
    });
  };

  const handleChangeKey = (oldKey, newKey) => {
    setSource((prevSource) => {
      const { [oldKey]: value, ...remainingColumns } = prevSource.format_columns;
      return {
        ...prevSource,
        format_columns: {
          ...remainingColumns,
          [newKey]: value,
        },
      };
    });
  };

  const handleChangeValue = (key, newValue) => {
    setSource((prevSource) => ({
      ...prevSource,
      format_columns: {
        ...prevSource.format_columns,
        [key]: newValue,
      },
    }));
  };

  return (
    <FormContainer>
      {Object.entries(source.format_columns).map(([key, value], index) => (
        <Flex key={index} gap="4" alignItems="center">
          <IconButtonTrashUi onClick={() => removeKey(key)} />
          <InputUi placeholder="Key" value={key} onChange={(e) => handleChangeKey(key, e.target.value)} />
          <InputUi placeholder="Value" value={value} onChange={(e) => handleChangeValue(key, e.target.value)} />
        </Flex>
      ))}
      <SourceAddKey addKey={addKey}/>
    </FormContainer>
  );
};

export default SourceFormat;
