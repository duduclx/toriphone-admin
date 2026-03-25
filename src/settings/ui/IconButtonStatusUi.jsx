import { IconButton } from "@chakra-ui/react";

import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";

const IconButtonStatusUi = ({ item }) => {
  if (!item) return null; // si "" | null | undefined → pas de rendu

  const isOk = item === "ok";

  return (
    <IconButton
      variant="ghost"
      colorPalette={isOk ? "secondary" : "danger"}
      aria-label={isOk ? "Status OK" : "Status KO"}
      rounded
    >
      {isOk ? <FaCheckCircle /> : <FaCircleXmark />}
    </IconButton>
  );
};

export default IconButtonStatusUi;
