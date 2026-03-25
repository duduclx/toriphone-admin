import { IconButton } from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";

const IconButtonTrashUi = ({...props}) => {
  return (
    <IconButton colorPalette="danger" variant="ghost" {...props}>
      <FaTrashAlt />
    </IconButton>
  )
}

export default IconButtonTrashUi
