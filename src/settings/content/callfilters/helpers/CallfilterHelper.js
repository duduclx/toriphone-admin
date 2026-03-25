import { useTranslation } from "react-i18next";

const CallfilterHelper = () => {
  // requirements
  const { t } = useTranslation("admin");

  const sourcesOptions = [
    { label: t('callfilters.internal'), value: "internal" },
    { label: t('callfilters.external'), value: "external" },
    { label: t('callfilters.all'), value: "all" },
  ];

  const strategiesOptions = [
    { label: t('callfilters.strategiesOptions.linear_surrogates_then_all_recipients'), value: "linear-surrogates-then-all-recipients" },
    { label: t('callfilters.strategiesOptions.all_recipients_then_linear_surrogates'), value: "all-recipients-then-linear-surrogates" },
    { label: t('callfilters.strategiesOptions.all_surrogates_then_all_recipients'), value: "all-surrogates-then-all-recipients" },
    { label: t('callfilters.strategiesOptions.all_recipients_then_all_surrogates'), value: "all-recipients-then-all-surrogates" },
    { label: t('callfilters.strategiesOptions.all'), value: "all" },
  ];

  const getStrategyLabel = (value) => {
    const strategy = strategiesOptions.find(option => option.value === value);
    return strategy ? strategy.label : value;
  };

  return { sourcesOptions, strategiesOptions, getStrategyLabel };
};

export default CallfilterHelper;
