import { useState } from "react";
import { Flex, Alert, Box, IconButton, CloseButton } from "@chakra-ui/react";
import { FaXmark } from "react-icons/fa6";

const Errors = ({ errors }) => {
  // requirements
  const [isVisible, setIsVisible] = useState(true);

  return isVisible ? (
    <Flex m="4">
      {errors && (
        <Alert.Root bg="alertError" color="alertContrast" m="4" >
          <Alert.Indicator />
          <Alert.Content>
              <Alert.Title>{errors.title}</Alert.Title>
              <Alert.Description>{errors.description}</Alert.Description>
          </Alert.Content>
           <CloseButton _hover={{bg: "transparent"}} color="alertContrast" pos="relative" top="-2" insetEnd="-2" onClick={() => setIsVisible(false)}/>
        </Alert.Root>
      )}
    </Flex>
  ) : null;
};

export default Errors;
