import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../templates/forms/FormContainer";
import DestinationsForm from "../../../helpers/DestinationsForm";
import getLabelForFallback from "../../../helpers/DestinationsHelper";

const UserEditFallbacks = ({ user, setUser }) => {
  // requirements
  const { t } = useTranslation("admin");

  const [busyDestination, setBusyDestination] = useState(getLabelForFallback(user.fallbacks.busy_destination))
  useEffect(() => {
    setUser({
        ...user,
        fallbacks: {
            ...user.fallbacks,
            busy_destination: busyDestination
        }
    })
  }, [busyDestination])

  const [congestionDestination, setCongestionDestination] = useState(getLabelForFallback(user.fallbacks.congestion_destination))
  useEffect(() => {
    setUser({
        ...user,
        fallbacks: {
            ...user.fallbacks,
            congestion_destination: congestionDestination
        }
    })
  }, [congestionDestination])

  const [failDestination, setFailDestination] = useState(getLabelForFallback(user.fallbacks.fail_destination))
  useEffect(() => {
    setUser({
        ...user,
        fallbacks: {
            ...user.fallbacks,
            fail_destination: failDestination
        }
    })
  }, [failDestination])

  const [noanswerDestination, setNoanswerDestination] = useState(getLabelForFallback(user.fallbacks.noanswer_destination))
  useEffect(() => {
    setUser({
        ...user,
        fallbacks: {
            ...user.fallbacks,
            noanswer_destination: noanswerDestination
        }
    })
  }, [noanswerDestination])

  return (
    <FormContainer>
        <DestinationsForm newDestination={busyDestination} setNewDestination={setBusyDestination} label={t("common.busy")}/>
        <DestinationsForm newDestination={congestionDestination} setNewDestination={setCongestionDestination} label={t("common.congestion")}/>
        <DestinationsForm newDestination={failDestination} setNewDestination={setFailDestination} label={t("common.fail")}/>
        <DestinationsForm newDestination={noanswerDestination} setNewDestination={setNoanswerDestination} label={t("common.no_answer")}/>
    </FormContainer>
  );
}

export default UserEditFallbacks