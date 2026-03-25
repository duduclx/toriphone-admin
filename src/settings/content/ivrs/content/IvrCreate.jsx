import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplatePage from "../../../templates/TemplatePage";

import IvrForm from "../forms/IvrForm";

const IvrCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { ivrAdd } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [ivr, setIvr] = useState({
    choices: [],
  });

  // menu_sound form
  const [menusound, setMenusound] = useState(null);

  // greeting_sound form
  const [greetingsound, setGreetingsound] = useState(null);

  // invalid_sound form
  const [invalidsound, setInvalidsound] = useState(null);

  // abort_sound form
  const [abortsound, setAbortsound] = useState(null);

  // abort destination form
  const [abortDestination, setAbortDestination] = useState(null);

  // invalid destination form
  const [invalidDestination, setInvalidDestination] = useState(null);

  // timeout destination form
  const [timeoutDestination, setTimeoutDestination] = useState(null);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await ivrAdd(ivr);
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
      title={t("ivrs.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"ivrs"}
      submit={submit}
      isCreate
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

export default IvrCreate;
