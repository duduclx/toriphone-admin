import { useTranslation } from "react-i18next";
import SelectForm from "./SelectForm";
import { useApis } from "../../../ApiProvider";

const Sound = ({ destination, setDestination, destinationType }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { soundsGet } = useApis();

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

  const change = (selected) => {
    const transformedDestination = {
      filename: selected.value,
      no_answer: false,
      skip: false,
      type: destinationType,
      label: selected.label,
    };
    setDestination(transformedDestination);
  };

  return <SelectForm load={load} change={change} destination={destination} placeholder={t("common.sound_select")} />;
};

export default Sound;
