import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import CallfilterHelper from "../helpers/CallfilterHelper";
import TemplatePage from "../../../templates/TemplatePage";
import CallFilterForm from "../forms/CallFilterForm";

const CallfilterCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { sourcesOptions, strategiesOptions } = CallfilterHelper();

  // api
  const { callfilterCreate } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [callfilter, setCallfilter] = useState({
    source: sourcesOptions[0].value,
    strategy: strategiesOptions[0].value,
    recipients: {
      users: [],
    },
    surrogates: {
      users: [],
    },
    surrogates_timeout: null,
    fallbacks: null,
  });

  // recipient form
  const [recipient, setRecipient] = useState([]);
  
  // surrogates form
  const [surrogates, setSurrogates] = useState([]);

  // destination form
  const [destination, setDestination] = useState(null);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await callfilterCreate(callfilter);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("callfilters");
    }
  };

  return (
    <TemplatePage
      title={t("callfilters.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"callfilters"}
      submit={submit}
      isCreate
      errors={errors}
      loading={loading}
    >
      <CallFilterForm
        callfilter={callfilter}
        setCallfilter={setCallfilter}
        recipient={recipient}
        setRecipient={setRecipient}
        surrogates={surrogates}
        setSurrogates={setSurrogates}
        destination={destination}
        setDestination={setDestination}
      />
    </TemplatePage>
  );
};

export default CallfilterCreate;
