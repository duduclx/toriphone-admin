import { useState } from "react";
import { useTranslation } from "react-i18next";

import getLabelForFallback from "../../../helpers/DestinationsHelper";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";
import CallFilterForm from "../forms/CallFilterForm";

const CallfilterEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { callfilterSelected, callfilterUpdate } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [callfilter, setCallfilter] = useState(() => {
    const updatedRecipient = {
      users: callfilterSelected.recipients.users.map((user) => ({
        ...user,
        label: `${user.firstname} ${user.lastname}`,
      })),
    };
    const updatedsurrogates = {
      users: callfilterSelected.surrogates.users.map((user) => ({
        ...user,
        label: `${user.firstname} ${user.lastname}`,
      })),
    };
    return {
      ...callfilterSelected,
      recipients: updatedRecipient,
      surrogates: updatedsurrogates || [],
    };
  });

  // recipient form
  const [recipient, setRecipient] = useState(callfilter.recipients.users);

  // surrogates form
  const [surrogates, setSurrogates] = useState(callfilter.surrogates.users);

  // destination form
  const [destination, setDestination] = useState(getLabelForFallback(callfilter.fallbacks.noanswer_destination));

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await callfilterUpdate(callfilter);
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
      title={t("callfilters.edit.title", { name: callfilterSelected.name })}
      setSelectedComponent={setSelectedComponent}
      route={"callfilters"}
      submit={submit}
      isEdit
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

export default CallfilterEdit;
