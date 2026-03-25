import { ApiProvider } from "./ApiProvider";
import Settings from "./settings/Settings";

import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";

// Créer un composant combiné
const ApiProviderWithSettings = ({ i18nInstance, loginType }) => {
  return (
    <I18nextProvider i18n={i18nInstance || i18n}>
      <ApiProvider>
        <Settings loginType={loginType} />
      </ApiProvider>
    </I18nextProvider>
  );
};

export default ApiProviderWithSettings;