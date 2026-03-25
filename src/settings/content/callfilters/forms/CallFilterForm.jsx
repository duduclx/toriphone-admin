import { useEffect } from "react";
import { Flex, Field } from "@chakra-ui/react";
import { InputUi, NativeSelectUi, NumberInputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import CallfilterHelper from "../helpers/CallfilterHelper";
import FormContainer from "../../../templates/forms/FormContainer";
import RecipientForm from "./RecipientForm";
import SurrogatesForm from "./SurrogatesForm";
import CallerForm from "../../../helpers/forms/CallerForm";
import DestinationsForm from "../../../helpers/DestinationsForm";

const CallFilterForm = ({
  callfilter,
  setCallfilter,
  recipient,
  setRecipient,
  surrogates,
  setSurrogates,
  destination,
  setDestination,
}) => {
  // requirements
  const { t } = useTranslation("admin");

  // helper
  const { sourcesOptions, strategiesOptions } = CallfilterHelper();

  // recipient
  useEffect(() => {
    setCallfilter((prev) => ({
      ...prev,
      recipients: {
        ...prev.recipients,
        users: recipient
          ? prev.recipients.users.length > 0
            ? prev.recipients.users.map((user, index) => (index === 0 ? { ...user, ...recipient } : user))
            : [recipient]
          : prev.recipients.users.length > 0
          ? [{ timeout: prev.recipients.users[0].timeout }]
          : [],
      },
    }));
  }, [recipient]);

  // recipient timeout
  const handleRecipientsTimeoutChange = (e) => {
    setCallfilter((prev) => ({
      ...prev,
      recipients: {
        ...prev.recipients,
        users: prev.recipients.users.map((user, index) =>
          index === 0 ? { ...user, timeout: e.value === "" ? null : e.value } : user
        ),
      },
    }));
  };

  // surrogates
  useEffect(() => {
    setCallfilter((prev) => ({
      ...prev,
      surrogates: {
        users: surrogates,
      },
    }));
  }, [surrogates]);

  // surrogates timeout
  const handleSurrogatesTimeoutChange = (e) => {
    setCallfilter((prev) => ({
        ...prev,
        surrogates_timeout: e.value === "" ? null : e.value,
      }));
  };

  // destination
  useEffect(() => {
    setCallfilter((prev) => ({
      ...prev,
      fallbacks: {
        noanswer_destination: destination,
      },
    }));
  }, [destination]);

  return (
    <FormContainer>
      <Flex justifyContent="space-between">
        <Field.Root width="48%">
          <Field.Label>{t("common.name")} :</Field.Label>
          <InputUi
            required
            placeholder={t("common.name")}
            value={callfilter.name}
            onChange={(e) => setCallfilter({ ...callfilter, name: e.target.value })}
          />
        </Field.Root>
        <Field.Root width="48%">
          <Field.Label>{t("common.description")} :</Field.Label>
          <InputUi
            required
            placeholder={t("common.description")}
            value={callfilter.description}
            onChange={(e) => setCallfilter({ ...callfilter, description: e.target.value })}
          />
        </Field.Root>
      </Flex>
      <Field.Root>
        <Field.Label>{t("callfilters.source")} :</Field.Label>
        <NativeSelectUi
          value={callfilter.source}
          onChange={(e) => setCallfilter({ ...callfilter, source: e.target.value })}
        >
          {sourcesOptions.map((source, index) => (
            <option value={source.value} key={index}>
              {source.label}
            </option>
          ))}
        </NativeSelectUi>
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.ring_strategy")} :</Field.Label>
        <NativeSelectUi
          value={callfilter.strategy}
          onChange={(e) => setCallfilter({ ...callfilter, strategy: e.target.value })}
        >
          {strategiesOptions.map((strategy, index) => (
            <option value={strategy.value} key={index}>
              {strategy.label}
            </option>
          ))}
        </NativeSelectUi>
      </Field.Root>
      <Flex justifyContent="space-between">
        <RecipientForm recipient={recipient} setRecipient={setRecipient} />
        <Field.Root width="48%">
          <Field.Label>{t("callfilters.boss_timeout")} :</Field.Label>
          <NumberInputUi
            min={0}
            value={
              callfilter.recipients.users[0]?.timeout === null || callfilter.recipients.users[0] === undefined
                ? ""
                : callfilter.recipients.users[0].timeout
            }
            allowMouseWheel
            onValueChange={handleRecipientsTimeoutChange}
          />
        </Field.Root>
      </Flex>
      <Flex justifyContent="space-between">
        <SurrogatesForm surrogates={surrogates} setSurrogates={setSurrogates} />
        <Field.Root width="48%">
          <Field.Label>{t("callfilters.secretary_timeout")} :</Field.Label>
          <NumberInputUi
            min={0}
            value={callfilter.surrogates_timeout === null ? "" : callfilter.surrogates_timeout}
            allowMouseWheel
            onValueChange={handleSurrogatesTimeoutChange}
          />
        </Field.Root>
      </Flex>
      <DestinationsForm
        label={t("callfilters.noanswer_destination")}
        newDestination={destination}
        setNewDestination={setDestination}
      />
      <CallerForm caller={callfilter} setCaller={setCallfilter} />
    </FormContainer>
  );
};

export default CallFilterForm;
