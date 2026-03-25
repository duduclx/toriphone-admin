import { IconButton } from "@chakra-ui/react";
import { FaArrowDown, FaArrowUp, FaArrowsAltH } from "react-icons/fa";

const CdrCallDirection = ({ cdr }) => {
  let icon;
  let colorPalette;

  switch (cdr.call_direction) {
    case "internal":
      icon = <FaArrowsAltH />;
      colorPalette = "secondary";
      break;
    case "inbound":
      icon = <FaArrowDown />;
      colorPalette = "primary";
      break;
    case "outbound":
      icon = <FaArrowUp />;
      colorPalette = "danger";
      break;
    default:
      icon = <FaArrowsAltH />;
      colorPalette = "gray";
  }

  return (
    <IconButton
      variant="ghost"
      aria-label={cdr.call_direction}
      colorPalette={colorPalette}
      size="sm"
    >
      {icon}
    </IconButton>
  );
};

export default CdrCallDirection;
