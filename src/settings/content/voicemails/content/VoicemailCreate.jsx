import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";
import VoicemailForm from "../forms/VoicemailForm";

const VoicemailCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { asteriskVoicemailZonemessagesGet, contexts, contextRangeGet, voicemailCreate } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [voicemail, setVoicemail] = useState({
    ask_password: false,
    enabled: true
    //language: "fr_FR",
    //timezone: "eu-fr"
  });

  // timezone form
  const [timezones, setTimeszones] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const tz = await asteriskVoicemailZonemessagesGet();
      const timezones = tz.items.map(item => ({
        value: item.name,
        label: item.timezone,
    }));
      setTimeszones(timezones);
    };
    fetch();
  }, []);

  // user form
  const [user, setUser] = useState([]);
  useEffect(() => {
    if (user) {
      setVoicemail((prev) => ({
        ...prev,
        name: user.name,
        number: user.number,
        email: user.email,
        users: [user],
      }));
    } else {
      setVoicemail((prev) => ({
        ...prev,
        name: "",
        number: availableExtensions[0],
        email: "",
        users: [],
      }));
    }
  }, [user]);


  // obtenir une lite d'extensions attribuables
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
        setVoicemail((prev) => ({
          ...prev,
          context: initialContext.name,
          number: available[0],
        }));
      }
    };

    fetchContextRange();
  }, []);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await voicemailCreate(voicemail);
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
      title={t("voicemails.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"voicemails"}
      submit={submit}
      isCreate
      errors={errors}
      loading={loading}
    >
      <VoicemailForm voicemail={voicemail} setVoicemail={setVoicemail} user={user} setUser={setUser} availableExtensions={availableExtensions} timezones={timezones}/>
    </TemplatePage>
  );
};

export default VoicemailCreate;
