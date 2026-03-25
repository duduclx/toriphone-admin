import { Flex } from "@chakra-ui/react";
import { IconButtonTrashUi, InputUi } from "../../../ui";

import SourceAddKey from "./SourceAddKey";
import FormContainer from "../../../templates/forms/FormContainer";

const SourceMatched = ({ source, setSource }) => {
  // requirements

  const addKey = () => {
    setSource((prevSource) => ({
      ...prevSource,
      first_matched_columns: [...prevSource.first_matched_columns, ""],
    }));
  };

  const removeKey = (index) => {
    setSource((prevSource) => ({
      ...prevSource,
      first_matched_columns: prevSource.first_matched_columns.filter((_, i) => i !== index),
    }));
  };

  return (
    <FormContainer>
      {source.first_matched_columns.map((item, index) => (
        <Flex key={index} gap="4">
          <IconButtonTrashUi onClick={() => removeKey(index)} />
          <InputUi
            value={item}
            onChange={(e) => {
              const updatedValue = e.target.value;
              setSource((prevSource) => ({
                ...prevSource,
                first_matched_columns: prevSource.first_matched_columns.map((col, i) => (i === index ? updatedValue : col)),
              }));
            }}
          />
        </Flex>
      ))}
      <SourceAddKey addKey={addKey}/>
    </FormContainer>
  );
}

export default SourceMatched
