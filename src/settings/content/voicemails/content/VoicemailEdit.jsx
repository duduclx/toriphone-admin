import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";
import VoicemailForm from "../forms/VoicemailForm";

const VoicemailEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { asteriskVoicemailZonemessagesGet, contexts, contextRangeGet, voicemailSelected, voicemailUpdate } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // timezone form
  const [timezones, setTimeszones] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const tz = await asteriskVoicemailZonemessagesGet();
      const timezones = tz.items.map(item => ({
        value: item.name, // eu-fr
        label: item.timezone, // Europe/paris
    }));
      setTimeszones(timezones);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (timezones.length > 0) {
      const timezone_labelled = timezones.find(item => item.value === voicemailSelected.timezone);
  
      setVoicemail(prevVoicemail => ({
        ...prevVoicemail,
        timezone_labelled: timezone_labelled || null
      }));
    }
  }, [timezones]);

  // resource
  const [voicemail, setVoicemail] = useState(() => {
    const user = voicemailSelected.users.length > 0 ? voicemailSelected.users[0] : null;
    const updatedUser = user
      ? {
          ...user,
          label: `${user.firstname} ${user.lastname}`,
          name: `${user.firstname} ${user.lastname}`,
        }
      : null;
    return {
      ...voicemailSelected,
      users: [updatedUser] || [],
      language: voicemailSelected.language || null,
      timezone: voicemailSelected.timezone || null,
      timezone_labelled: null
    };
  });

  // user form
  const [user, setUser] = useState(voicemail.users[0]);
  // user
  useEffect(() => {
    if (user) {
      setVoicemail((prev) => ({
        ...prev,
        name: user.name,
        number: user.number || voicemail.number,
        email: user.email || voicemail.email,
        users: [user],
      }));
    } else {
      setVoicemail({
        ...voicemail,
        users: [],
      });
    }
  }, [user]);

  // availableExtensions
  const initialContext = contexts.items.find((item) => item.type === "internal") || {};
  const [availableExtensions, setAvailableExtensions] = useState([]);
  useEffect(() => {
    const fetchContextRange = async () => {
      const range = await contextRangeGet(initialContext.id);

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
    const res = await voicemailUpdate(voicemail, voicemailSelected);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("voicemails");
    }
  };

  return (
    <TemplatePage
      title={t("voicemails.edit.title", { name: voicemailSelected.name })}
      setSelectedComponent={setSelectedComponent}
      route={"voicemails"}
      submit={submit}
      isEdit
      errors={errors}
      loading={loading}
    >
      <VoicemailForm voicemail={voicemail} setVoicemail={setVoicemail} user={user} setUser={setUser} availableExtensions={availableExtensions} timezones={timezones}/>
    </TemplatePage>
  );
};

export default VoicemailEdit;
