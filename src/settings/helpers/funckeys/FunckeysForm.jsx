import { useEffect, useState } from "react";
import { Flex, Field } from "@chakra-ui/react";

import { useTranslation } from "react-i18next";

import FunckeysDestinationsForm from "./FunckeysDestinationsForm";
import FormContainer from "../../templates/forms/FormContainer";
import getLabel from "./helper";

import Conference from "./Conference";
import Custom from "./Custom";
import Transfer from "./Transfer";
import Service from "./Service";
import Forward from "./Forward";
import ForwardOptions from "./ForwardOptions";
import Group from "./Group";
import Groupmember from "./Groupmember";
import Onlinerec from "./Onlinerec";
import Parking from "./Parking";
import Parkposition from "./Parkposition";
import Queue from "./Queue";
import User from "./User";
import Bsfilter from "./Bsfilter";
import GroupmemberOptions from "./GroupmemberOptions";
import ParkpositionOptions from "./ParkpositionOptions";

const FunckeysForm = ({ funckey, index, setFunckeys }) => {
  // requirements
  const { t } = useTranslation("admin");

  const [destinationType, setDestinationType] = useState(funckey?.destination?.type || null);
  const [destination, setDestination] = useState(getLabel(funckey?.destination));

  useEffect(() => {
    if (destination) {
      // Mettre à jour funckey.destination en respectant l'index
      setFunckeys((prevFunckeys) => {
        const updatedFunckeys = [...prevFunckeys];
        updatedFunckeys[index] = {
          ...updatedFunckeys[index],
          destination: { ...destination }, // Met à jour la destination
        };
        return updatedFunckeys;
      });
    }
  }, [destination]);

  return (
    <Field.Root>
      <Field.Label>{t("common.destination")}</Field.Label>
      <FormContainer>
        <Flex justifyContent="space-between" gap="4" w="100%" >
          <FunckeysDestinationsForm
            destinationType={destinationType}
            setDestinationType={setDestinationType}
            index={index}
            setFunckeys={setFunckeys}
            setDestination={setDestination}
          />
          {destinationType === "conference" && (
            <Conference destination={destination} setDestination={setDestination} destinationType={destinationType} />
          )}
          {destinationType === "custom" && (
            <Custom destination={destination} setDestination={setDestination} destinationType={destinationType} />
          )}
          {destinationType === "transfer" && (
            <Transfer destination={destination} setDestination={setDestination} destinationType={destinationType} />
          )}
          {destinationType === "service" && (
            <Service destination={destination} setDestination={setDestination} destinationType={destinationType} />
          )}
          {destinationType === "forward" && (
            <Forward destination={destination} setDestination={setDestination} destinationType={destinationType} />
          )}
          {destinationType === "group" && (
            <Group destination={destination} setDestination={setDestination} destinationType={destinationType} />
          )}
          {destinationType === "groupmember" && (
            <Groupmember destination={destination} setDestination={setDestination} destinationType={destinationType} />
          )}
          {destinationType === "onlinerec" && (
            <Onlinerec destination={destination} setDestination={setDestination} destinationType={destinationType} />
          )}
          {destinationType === "parking" && (
            <Parking destination={destination} setDestination={setDestination} destinationType={destinationType} />
          )}
          {destinationType === "park_position" && (
            <Parkposition destination={destination} setDestination={setDestination} destinationType={destinationType} />
          )}
          {destinationType === "queue" && (
            <Queue destination={destination} setDestination={setDestination} destinationType={destinationType} />
          )}
          {destinationType === "user" && (
            <User destination={destination} setDestination={setDestination} destinationType={destinationType} />
          )}
          {/*destinationType === "bsfilter" && (
          <Bsfilter destination={destination} setDestination={setDestination} destinationType={destinationType}/>
        )*/}

          {destinationType === "forward" && (
            <ForwardOptions
              destination={destination}
              setDestination={setDestination}
              destinationType={destinationType}
            />
          )}
          {destinationType === "groupmember" && (
            <GroupmemberOptions
              destination={destination}
              setDestination={setDestination}
              destinationType={destinationType}
            />
          )}
          {destinationType === "park_position" && (
            <ParkpositionOptions
              destination={destination}
              setDestination={setDestination}
              destinationType={destinationType}
            />
          )}
        </Flex>
      </FormContainer>
    </Field.Root>
  );
};

export default FunckeysForm;
