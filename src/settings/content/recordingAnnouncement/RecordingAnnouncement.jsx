import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Field } from "@chakra-ui/react";
import { toaster } from "../../../components/ui/toaster";

import { useApis } from "../../../ApiProvider";

import TemplatePage from "../../templates/TemplatePage";
import useSoundsHelper from "../../helpers/soundsHelper";
import { AsyncSelectUi } from "../../ui";
import FormContainer from "../../templates/forms/FormContainer";

const RecordingAnnouncement = () => {
  // requirements
  const { t } = useTranslation("admin");

  // helper
  const { getSoundLabel } = useSoundsHelper();

  // api
  const { recordingsAnnouncements, recordingsAnnouncementsGet, recordingsAnnouncementsEdit, sounds, soundsGet } =
    useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [announcements, setAnnouncements] = useState({
    recording_start: null,
    recording_stop: null,
    start: null,
    stop: null,
  });

  useEffect(() => {
    soundsGet();
    recordingsAnnouncementsGet();
  }, []);

  useEffect(() => {
    const start = getSoundLabel(recordingsAnnouncements.recording_start, sounds);
    const stop = getSoundLabel(recordingsAnnouncements.recording_stop, sounds);
    setAnnouncements({ ...recordingsAnnouncements, start: start, stop: stop });
  }, [recordingsAnnouncements]);

  const load = () => {
    return new Promise(async (resolve) => {
      const res = await soundsGet();
      const filteredSounds = res?.items ? res.items.filter((sound) => sound.name !== "system") : [];
      const filteredFiles = filteredSounds.reduce((acc, sound) => {
        sound.files.forEach((file) => {
          let format = file.formats[0]?.format || "unknown";

          if (format === "slin") {
            format = "wav";
          }

          acc.push({
            label: `${sound.name} - ${file.name} (${format})`,
            value: `${file.formats[0].path}`,
          });
        });
        return acc;
      }, []);
      resolve(filteredFiles);
    });
  };

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await recordingsAnnouncementsEdit(announcements);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      toaster.create({
        title: t("rtp.success.title"),
        description: t("rtp.success.description"),
        type: "success",
        duration: 4000,
        closable: true,
      });
    }
  };

  return (
    <TemplatePage
      title={t("records.title")}
      errors={errors}
      loading={loading}
      submit={submit}
      route={"none"}
      isEdit
      hasNoAdd
    >
      <FormContainer>
        <Field.Root>
          <Field.Label>{t("records.start")} :</Field.Label>
          <AsyncSelectUi
            loadOptions={load}
            defaultOptions
            isClearable
            onChange={(e) =>
              setAnnouncements({ ...announcements, recording_start: e ? e.value : null, start: e ? e : null })
            }
            value={announcements.start || null}
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>{t("records.stop")} :</Field.Label>
          <AsyncSelectUi
            loadOptions={load}
            defaultOptions
            isClearable
            onChange={(e) =>
              setAnnouncements({ ...announcements, recording_stop: e ? e.value : null, stop: e ? e : null })
            }
            value={announcements.stop || null}
          />
        </Field.Root>
      </FormContainer>
    </TemplatePage>
  );
};

export default RecordingAnnouncement;
