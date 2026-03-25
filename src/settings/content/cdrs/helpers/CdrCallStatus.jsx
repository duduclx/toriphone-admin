import { IconButton } from "@chakra-ui/react";
import { FaBan } from "react-icons/fa";

const CdrCallStatus = ({ cdr }) => {
  if (cdr.call_status !== "blocked") {
    return null;
  }

  return (
    <IconButton variant="ghost" aria-label="blocked" colorPalette="danger" size="sm">
      <FaBan />
    </IconButton>
  );
};

export default CdrCallStatus;
