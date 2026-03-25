import { useTranslation } from 'react-i18next'

import PluginsList from './content/PluginsList'
import TemplatePage from '../../templates/TemplatePage'

const Plugins = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");
  
  return (
    <TemplatePage title={t("plugins.list.title")} isList hasNoAdd hasTabs>
      <PluginsList setSelectedComponent={setSelectedComponent}/>
    </TemplatePage>
  )
}

export default Plugins
