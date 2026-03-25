import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";
import ConferenceForm from "../forms/ConferenceForm";

const ConferenceCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { contexts, contextRangeConferenceGet, conferenceCreate } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [conference, setConference] = useState({
    name: null,
    description: null,
  });

  // line form
  const initialContext = contexts.items.find((item) => item.type === "internal") || {};
  const [line, setLine] = useState({
    context: "",
    exten: "",
  });

  // obtenir une liste d'extensions attribuables
  const [availableExtensions, setAvailableExtensions] = useState([]);
  useEffect(() => {
    const fetchContextRange = async () => {
      const range = await contextRangeConferenceGet(initialContext.id);

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

  // moh form
  const [moh, setMoh] = useState(null);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await conferenceCreate(conference, line);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("conferences");
    }
  };

  return (
    <TemplatePage
      title={t("conferences.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"conferences"}
      submit={submit}
      isCreate
      errors={errors}
      loading={loading}
    >
      <ConferenceForm
        conference={conference}
        setConference={setConference}
        availableExtensions={availableExtensions}
        line={line}
        setLine={setLine}
        moh={moh}
        setMoh={setMoh}
      />
    </TemplatePage>
  );
};

export default ConferenceCreate;
