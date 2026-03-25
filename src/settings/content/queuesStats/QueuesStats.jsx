import { useTranslation } from 'react-i18next';

import TemplatePage from '../../templates/TemplatePage';
import QueuesStatsList from './content/QueuesStatsList';

const QueuesStats = () => {
    // requirements
    const { t } = useTranslation("admin");

  return (
    <TemplatePage
    title={t("queues.statistic_title")}
    hasNoAdd
    isList>
      <QueuesStatsList />
    </TemplatePage>
  )
}

export default QueuesStats
