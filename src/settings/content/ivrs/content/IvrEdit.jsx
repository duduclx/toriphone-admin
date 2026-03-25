import { useState } from "react";
import { useTranslation } from "react-i18next";

import useSoundsHelper from "../../../helpers/soundsHelper";
import getLabelForFallback from "../../../helpers/DestinationsHelper";

import { useApis } from "../../../../ApiProvider";
import TemplatePage from "../../../templates/TemplatePage";

import IvrForm from "../forms/IvrForm";

const IvrEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // helper
  const { getSoundLabel } = useSoundsHelper();

  // api
  const { sounds, ivrSelected, ivrEdit } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // update ivr choices destination
  const updateIvrSelected = (ivrSelected) => {
    return {
      ...ivrSelected,
      choices: ivrSelected.choices.map((choice) => {
        const des = getLabelForFallback(choice.destination);
        return {
          ...choice,
          destination: des,
        };
      }),
    };
  };

  // resource
  const updatedIvrSelected = updateIvrSelected(ivrSelected);
  const [ivr, setIvr] = useState(updatedIvrSelected);

  // menu_sound form
  const [menusound, setMenusound] = useState(getSoundLabel(ivrSelected.menu_sound, sounds));

  // greeting_sound form
  const [greetingsound, setGreetingsound] = useState(getSoundLabel(ivrSelected.greeting_sound, sounds));

  // invalid_sound form
  const [invalidsound, setInvalidsound] = useState(getSoundLabel(ivrSelected.invalid_sound, sounds));

  // abort_sound form
  const [abortsound, setAbortsound] = useState(getSoundLabel(ivrSelected.abort_sound, sounds));

  // abort destination form
  const [abortDestination, setAbortDestination] = useState(getLabelForFallback(ivrSelected.abort_destination));

  // invalid destination form
  const [invalidDestination, setInvalidDestination] = useState(getLabelForFallback(ivrSelected.invalid_destination));

  // timeout destination form
  const [timeoutDestination, setTimeoutDestination] = useState(getLabelForFallback(ivrSelected.timeout_destination));

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await ivrEdit(ivr);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("ivrs");
    }
  };

  return (
    <TemplatePage
      title={t("ivrs.edit.title", { name: ivrSelected.name })}
      setSelectedComponent={setSelectedComponent}
      route={"ivrs"}
      submit={submit}
      isEdit
      hasTabs
      errors={errors}
      loading={loading}
    >
      <IvrForm 
      ivr={ivr}
      setIvr={setIvr}
      menusound={menusound}
      setMenusound={setMenusound}
      greetingsound={greetingsound}
      setGreetingsound={setGreetingsound}
      invalidsound={invalidsound}
      setInvalidsound={setInvalidsound}
      abortsound={abortsound}
      setAbortsound={setAbortsound}
      abortDestination={abortDestination}
      setAbortDestination={setAbortDestination}
      invalidDestination={invalidDestination}
      setInvalidDestination={setInvalidDestination}
      timeoutDestination={timeoutDestination}
      setTimeoutDestination={setTimeoutDestination}
      />
    </TemplatePage>
  );
};

export default IvrEdit;
