import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toaster } from "../../../components/ui/toaster";

import { useApis } from "../../../ApiProvider";

import TemplatePage from "../../templates/TemplatePage";
import VoicemailForm from "./VoicemailForm";

const VoicemailGeneral = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { asteriskVoicemailGeneralGet, asteriskVoicemailGeneralEdit } = useApis();

  // resource
  const [voicemail, setVoicemail] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await asteriskVoicemailGeneralGet();
      setVoicemail(res);
    };
    fetch();
  }, []);

  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await asteriskVoicemailGeneralEdit(voicemail);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.error.reason[0] });
    } else {
      setLoading(false);
      toaster.create({
        title: t("voicemailGeneral.success_title"),
        description: t("voicemailGeneral.success_description"),
        type: "success",
        duration: 4000,
        closable: true,
      });
    }
  };

  return (
    <TemplatePage
      title={t("voicemailGeneral.list.title")}
      setSelectedComponent={setSelectedComponent}
      errors={errors}
      loading={loading}
      submit={submit}
      route={"none"}
      isEdit
      hasNoAdd
    >
      <VoicemailForm voicemail={voicemail} setVoicemail={setVoicemail} />
    </TemplatePage>
  );
};

export default VoicemailGeneral;
