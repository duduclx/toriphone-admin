import { IconButton } from "@chakra-ui/react";

import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";

import { FaCheck, FaTimes } from "react-icons/fa";

const IconButtonCheckUi = ({ item }) => {
  return (
    <>
      {item ? (
        <IconButton variant="ghost" colorPalette="secondary">
          <FaCheckCircle />
        </IconButton>
      ) : (
        <IconButton variant="ghost" colorPalette="danger">
          <FaCircleXmark />
        </IconButton>
      )}
    </>
  );
};

export default IconButtonCheckUi;
