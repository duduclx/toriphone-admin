import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";
import IncallForm from "../forms/IncallForm";

const IncallCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { contexts, contextRangeIncallGet, incallCreate } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [incall, setIncall] = useState({});

  // line form
  const initialContext = contexts.items.find((item) => item.type === "incall") || {};
  const [line, setLine] = useState({
    context: "",
    exten: "",
  });

  // destination helper form
  const [destination, setDestination] = useState(null);

  // schedule form
  const [schedule, setSchedule] = useState(null);

  // greeting_sound form
  const [greetingsound, setGreetingsound] = useState(null);

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
        setLine({
          context: initialContext.name,
          exten: available[0],
        });
      }
    };

    fetchContextRange();
  }, []);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await incallCreate(incall, line);
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
      title={t("incalls.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"incalls"}
      submit={submit}
      isCreate
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
      />
    </TemplatePage>
  );
};

export default IncallCreate;
