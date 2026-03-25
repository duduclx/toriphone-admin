import { Button } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

const ButtonAddUi = ({ children, ...props }) => {
  return (
    <Button colorPalette="primary" {...props}>
      <FaPlus /> {children}
    </Button>
  );
};

export default ButtonAddUi;
