import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";
import ConferenceForm from "../forms/ConferenceForm";

const ConferenceEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { conferenceSelected, contexts, contextRangeConferenceGet, mohs, conferenceUpdate } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [conference, setConference] = useState(conferenceSelected);

  // line form
  const initialContext = contexts.items.find((item) => item.type === "internal") || {};
  const [line, setLine] = useState(() => {
    const initialExten =
      conferenceSelected?.extensions && conferenceSelected.extensions.length > 0
        ? conferenceSelected.extensions[0].exten
        : null;

    const initialId =
      conferenceSelected?.extensions && conferenceSelected.extensions.length > 0
        ? conferenceSelected.extensions[0].id
        : null;

    return {
      context: initialContext.name,
      exten: initialExten,
      id: initialId,
    };
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
        if (!line.exten) {
          setLine({ ...line, exten: available[0] });
        }
      }
    };

    fetchContextRange();
  }, []);

  // moh form
  let updatedMoh = null;
  if (conferenceSelected.music_on_hold) {
    updatedMoh = {
      label: mohs.items.find((moh) => moh.name === conferenceSelected.music_on_hold)?.label || null,
      value: conferenceSelected.music_on_hold,
    };
  }
  const [moh, setMoh] = useState(updatedMoh);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await conferenceUpdate(conference, line);
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
      title={t("conferences.edit.title", { name: conferenceSelected.name })}
      setSelectedComponent={setSelectedComponent}
      route={"conferences"}
      submit={submit}
      isEdit
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

export default ConferenceEdit;
