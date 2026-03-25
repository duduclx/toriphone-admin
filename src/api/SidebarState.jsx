import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const useSidebarState = () => {
  // toggle sidebar
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar((prevState) => !prevState);
  };

  const ToggleSidebarButton = () => {
    return (
      <Button
        onClick={() => toggleSidebar()}
        variant="ghost"
        _hover={{ backgroundColor: "transparent" }}
        border="2px solid"
        borderColor="btnSdbTgg"
        borderRadius="full"
        p={0}
        justifyContent="center"
        zIndex="2"
      >{showSidebar ? <FaAngleLeft /> : <FaAngleRight />}</Button>
    );
  };

  return { showSidebar, setShowSidebar, ToggleSidebarButton };
};

export default useSidebarState;
