import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import getLabelForFallback from "../../../helpers/DestinationsHelper";
import useSoundsHelper from "../../../helpers/soundsHelper";

import TemplatePage from "../../../templates/TemplatePage";

import IncallForm from "../forms/IncallForm";

const IncallEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // helper
  const { getSoundLabel } = useSoundsHelper();

  // api
  const { contexts, contextRangeIncallGet, incallSelected, incallUpdate, sounds } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [incall, setIncall] = useState(incallSelected);

  // line form
  const initialContext = contexts.items.find((item) => item.type === "incall") || {};
  const [line, setLine] = useState(incallSelected.extensions[0]);

  // destination helper form
  const [destination, setDestination] = useState(getLabelForFallback(incall.destination));

  // schedule form
  const initialSchedule =
    incall.schedules && incall.schedules.length > 0
      ? {
          ...incall.schedules[0],
          label: incall.schedules[0].name,
        }
      : null;
  const [schedule, setSchedule] = useState(initialSchedule);

  // greeting_sound form
  const [greetingsound, setGreetingsound] = useState(getSoundLabel(incallSelected.greeting_sound, sounds));

  // obtenir une liste d'extensions attribuables
  const [availableExtensions, setAvailableExtensions] = useState([]);
  useEffect(() => {
    const fetchContextRange = async () => {
      const range = await contextRangeIncallGet(initialContext.id);

      if (range.items) {
        const available = [];
        range.items.forEach((item) => {
          const start = parseInt(item.start);
          const end = parseInt(item.end);

          if (!isNaN(start) && !isNaN(end)) {
            for (let i = start; i <= end; i++) {
              available.push(i);
            }
          }
        });
        setAvailableExtensions(available);
      }
    };

    fetchContextRange();
  }, []);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await incallUpdate(incall, line, incallSelected);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("incalls");
    }
  };

  return (
    <TemplatePage
      title={t("incalls.edit.title", { name: incallSelected.extensions[0].exten })}
      setSelectedComponent={setSelectedComponent}
      route={"incalls"}
      submit={submit}
      isEdit
      errors={errors}
      loading={loading}
    >
      <IncallForm
        incall={incall}
        setIncall={setIncall}
        availableExtensions={availableExtensions}
        line={line}
        setLine={setLine}
        destination={destination}
        setDestination={setDestination}
        schedule={schedule}
        setSchedule={setSchedule}
        greetingsound={greetingsound}
        setGreetingsound={setGreetingsound}
        isEdit
      />
    </TemplatePage>
  );
};

export default IncallEdit;
