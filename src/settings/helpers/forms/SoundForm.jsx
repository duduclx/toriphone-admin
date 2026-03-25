import { Field } from "@chakra-ui/react";
import { AsyncSelectUi } from "../../ui";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../ApiProvider";

/* use in
incallForm
ivrForm
*/

const SoundForm = ({ sound, setSound, label, helperText }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { soundsGet } = useApis();

  // load values
  const load = () => {
    return new Promise(async (resolve) => {
      const sounds = await soundsGet();
      const filteredSounds = sounds?.items ? sounds.items.filter((sound) => sound.name !== "system") : [];
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

  // onchange
  const handleChange = (selectedOptions) => {
    setSound(selectedOptions);
  };

  return (
    <Field.Root>
      <Field.Label>{label || `${t("common.sound")}`} :</Field.Label>
      <AsyncSelectUi
        cacheOptions
        loadOptions={load}
        defaultOptions
        isClearable
        onChange={handleChange}
        value={sound}
        placeholder={t("common.sound_select")}
      />
      {helperText && <Field.HelperText>{helperText}</Field.HelperText>}
    </Field.Root>
  );
};

export default SoundForm;
