import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import { Toaster } from "../components/ui/toaster";

import SettingsSidebar from "./sidebar/SettingsSidebar";
import PageComponents from ".";

import { useApis } from "../ApiProvider";

const Settings = ({ loginType }) => {
  // requirements
  const { showSidebar, ToggleSidebarButton } = useApis();
  const [selectedComponent, setSelectedComponent] = useState("none");

  const componentName = selectedComponent.charAt(0).toUpperCase() + selectedComponent.slice(1);
  const MyComponent = PageComponents[componentName] || null;

  return (
    <>
      <Flex justifyContent="flex-start" width={showSidebar ? "384px" : "0px"} transition="width 0.8s ease-in-out">
        <SettingsSidebar
          setSelectedComponent={setSelectedComponent}
          selectedComponent={selectedComponent}
          loginType={loginType}
        />
        <Flex justifyContent="center" alignItems="center" width="0">
          <ToggleSidebarButton />
        </Flex>
      </Flex>
      {MyComponent && <MyComponent setSelectedComponent={setSelectedComponent} />}
      <Toaster />
    </>
  );
};

export default Settings;
