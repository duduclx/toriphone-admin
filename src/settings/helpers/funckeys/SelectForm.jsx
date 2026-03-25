import { Box } from "@chakra-ui/react";
import { AsyncSelectUi } from "../../ui";

const SelectForm = ({ load, change, destination, placeholder }) => {
  return (
    <Box minW="300px" width="fit-content">
      <AsyncSelectUi
        loadOptions={load}
        defaultOptions
        onChange={change}
        isClearable
        value={destination?.label ? destination : ''}
        placeholder={placeholder}
      />
    </Box>
  );
};

export default SelectForm;
