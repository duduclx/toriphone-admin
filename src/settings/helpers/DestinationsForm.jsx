import { useEffect, useState } from "react";
import { Flex, Field } from "@chakra-ui/react";

import DestinationType from "./destinations/DestinationType";

import Application from "./destinations/Application";
import Conference from "./destinations/Conference";
import Custom from "./destinations/Custom";
import Group from "./destinations/Group";
import Queue from "./destinations/Queue";
import QueueOptions from "./destinations/QueueOptions";
import Switchboards from "./destinations/Switchboards";
import Ivr from "./destinations/Ivr";
import Voicemail from "./destinations/Voicemail";
import VoicemailOptions from "./destinations/VoicemailOptions";
import Sound from "./destinations/Sound";
import SoundOptions from "./destinations/SoundOptions";
import Hangup from "./destinations/Hangup";
import User from "./destinations/User";
import Outcall from "./destinations/Outcall";
import Extension from "./destinations/Extension";

import RingTimeOption from "./destinations/RingTimeOption";
import TimeoutOption from "./destinations/TimeoutOption";

/*
this is used in many api, to design a destination.
callfilters.fallbacks.noanswer_destination
groups.fallbacks.noanswer_destination
incalls.destination
ivr.abort_destination
ivr.choices.destination
ivr.invalid_destination
ivr.timeout_destination
queues.wait_ratio_destination
queues.wait_time_destination
queues.fallbacks.busy_destination
queues.fallbacks.congestion_destination
queues.fallbacks.fail_destination
queues.fallbacks.noanswer_destination
schedules.closed_destination
schedules.exceptional_periods.destination
switchboards.fallbacks.noanswer_destination
users.fallbacks.busy_destination
users.fallbacks.congestion_destination
users.fallbacks.fail_destination
users.fallbacks.noanswer_destination
*/

const DestinationsForm = ({ label, newDestination, setNewDestination, helperText }) => {
  const [destinationType, setDestinationType] = useState(newDestination?.type || null);

  useEffect(() => {
    if (newDestination) {
      setDestinationType(newDestination.type);
    }
  }, [newDestination]);

  return (
    <>
      <Field.Root>
        <Field.Label htmlFor="destination">{label} :</Field.Label>
        <Flex justifyContent="space-between" gap="4" flex="1" w="full">
          <DestinationType
            destination={newDestination}
            setDestination={setNewDestination}
            setDestinationType={setDestinationType}
          />

          {destinationType === "application" && (
            <Application
              destination={newDestination}
              setDestination={setNewDestination}
              destinationType={destinationType}
            />
          )}
          {destinationType === "conference" && (
            <Conference
              destination={newDestination}
              setDestination={setNewDestination}
              destinationType={destinationType}
            />
          )}
          {destinationType === "custom" && (
            <Custom destination={newDestination} setDestination={setNewDestination} destinationType={destinationType} />
          )}
          {destinationType === "extension" && (
            <Extension
              destination={newDestination}
              setDestination={setNewDestination}
              destinationType={destinationType}
            />
          )}
          {destinationType === "group" && (
            <Group destination={newDestination} setDestination={setNewDestination} destinationType={destinationType} />
          )}
          {destinationType === "outcall" && (
            <Outcall
              destination={newDestination}
              setDestination={setNewDestination}
              destinationType={destinationType}
            />
          )}
          {destinationType === "queue" && (
            <Queue destination={newDestination} setDestination={setNewDestination} destinationType={destinationType} />
          )}
          {destinationType === "switchboard" && (
            <Switchboards
              destination={newDestination}
              setDestination={setNewDestination}
              destinationType={destinationType}
            />
          )}
          {destinationType === "user" && (
            <User destination={newDestination} setDestination={setNewDestination} destinationType={destinationType} />
          )}
          {destinationType === "ivr" && (
            <Ivr destination={newDestination} setDestination={setNewDestination} destinationType={destinationType} />
          )}
          {destinationType === "hangup" && (
            <Hangup destination={newDestination} setDestination={setNewDestination} destinationType={destinationType} />
          )}
          {destinationType === "sound" && (
            <Sound destination={newDestination} setDestination={setNewDestination} destinationType={destinationType} />
          )}
          {destinationType === "voicemail" && (
            <Voicemail
              destination={newDestination}
              setDestination={setNewDestination}
              destinationType={destinationType}
            />
          )}
        </Flex>
        {helperText && <Field.HelperText>{helperText}</Field.HelperText>}
      </Field.Root>
      {(destinationType === "user" || destinationType === "group" || destinationType === "queue") && (
        <RingTimeOption
          destination={newDestination}
          setDestination={setNewDestination}
          destinationType={destinationType}
        />
      )}
      {destinationType === "queue" && (
        <QueueOptions
          destination={newDestination}
          setDestination={setNewDestination}
          destinationType={destinationType}
        />
      )}
      {destinationType === "voicemail" && (
        <VoicemailOptions
          destination={newDestination}
          setDestination={setNewDestination}
          destinationType={destinationType}
        />
      )}
      {destinationType === "hangup" && newDestination && newDestination.cause !== "normal" && (
        <TimeoutOption
          destination={newDestination}
          setDestination={setNewDestination}
          destinationType={destinationType}
        />
      )}
      {destinationType === "sound" && (
        <SoundOptions
          destination={newDestination}
          setDestination={setNewDestination}
          destinationType={destinationType}
        />
      )}
    </>
  );
};

export default DestinationsForm;
