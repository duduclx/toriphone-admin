import React from "react";
import ReactDOM from "react-dom/client";

import './i18n';
import './styles/styles.css'

import { Flex } from "@chakra-ui/react";

import { Provider } from "./components/ui/provider";

import { ApiProvider } from "./ApiProvider"; // Importe ton contexte
import Settings from "./settings/Settings"

import { UserAuthProvider, UserLogin, useAuth } from "toriphone-auth";

// Composant principal
const App = () => {
  // dependencie
  const { user } = useAuth();

  return user ? (
    <ApiProvider>
      <Flex flexDirection="row" flex="1" bg="bgDefault">
        <Settings />
      </Flex>
    </ApiProvider>
  ) : (
    <UserLogin />
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <UserAuthProvider appName={"tori_admin"} loginType={"admin"} >
        <App />
      </UserAuthProvider>
    </Provider>
  </React.StrictMode>
);
