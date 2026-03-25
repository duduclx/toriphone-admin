import { useTranslation } from "react-i18next";
import SelectForm from "./SelectForm";
import { useApis } from "../../../ApiProvider";

const Voicemail = ({ destination, setDestination, destinationType }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { voicemailsGet } = useApis();

  const load = () => {
    return new Promise(async (resolve) => {
      const res = await voicemailsGet();
      const filtered = res.items.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      resolve(filtered);
    });
  };

  const change = (item) => {
    const destination = {
      voicemail_id: item.value,
      voicemail_name: item.label,
      skip_instructions: false,
      greeting: null,
      type: destinationType,
      label: item.label,
    };
    setDestination(destination);
  };

  return <SelectForm load={load} change={change} destination={destination} placeholder={t("common.voicemail_select")} />;
};

export default Voicemail;
