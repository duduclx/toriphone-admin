import { Flex } from "@chakra-ui/react";
import { IconButtonTrashUi, InputUi } from "../../../ui";
import FormContainer from "../../../templates/forms/FormContainer";
import SourceAddKey from "./SourceAddKey";

const SourceSearch = ({ source, setSource }) => {

  const addKey = () => {
    setSource((prevSource) => ({
      ...prevSource,
      searched_columns: [...prevSource.searched_columns, ""],
    }));
  };

  const removeKey = (index) => {
    setSource((prevSource) => ({
      ...prevSource,
      searched_columns: prevSource.searched_columns.filter((_, i) => i !== index),
    }));
  };

  return (
    <FormContainer>
      {source.searched_columns.map((item, index) => (
        <Flex key={index} gap="4">
          <IconButtonTrashUi onClick={() => removeKey(index)} />
          <InputUi
            value={item}
            onChange={(e) => {
              const updatedValue = e.target.value;
              setSource((prevSource) => ({
                ...prevSource,
                searched_columns: prevSource.searched_columns.map((col, i) => (i === index ? updatedValue : col)),
              }));
            }}
          />
        </Flex>
      ))}
      <SourceAddKey addKey={addKey}/>
    </FormContainer>
  );
};

export default SourceSearch;
