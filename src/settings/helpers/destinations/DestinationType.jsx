import { NativeSelectUi } from "../../ui";
import { useTranslation } from "react-i18next";

const DestinationType = ({ destination, setDestination, setDestinationType }) => {
  // requirements
  const { t } = useTranslation("admin");

  const destinationsOptions = [
    { label: t("destinations.type.none"), value: null },
    { label: t("destinations.type.application"), value: "application" },
    { label: t("destinations.type.conference"), value: "conference" },
    { label: t("destinations.type.custom"), value: "custom" },
    { label: t("destinations.type.extension"), value: "extension" },
    { label: t("destinations.type.group"), value: "group" },
    { label: t("destinations.type.hangup"), value: "hangup" },
    { label: t("destinations.type.ivr"), value: "ivr" },
    { label: t("destinations.type.outcall"), value: "outcall" },
    { label: t("destinations.type.queue"), value: "queue" },
    { label: t("destinations.type.sound"), value: "sound" },
    { label: t("destinations.type.switchboard"), value: "switchboard" },
    { label: t("destinations.type.user"), value: "user" },
    { label: t("destinations.type.voicemail"), value: "voicemail" },
  ];

  return (
    <NativeSelectUi
      id="destination"
      minW="300px"
      width="full"
      value={destination?.type || ""}
      onChange={(e) => {
        setDestinationType(e.target.value);
        //setDestination(null);
        setDestination({ type: e.target.value });
      }}
    >
      {destinationsOptions.map((dest) => (
        <option value={dest.value} key={dest.value}>
          {dest.label}
        </option>
      ))}
    </NativeSelectUi>
  );
};

export default DestinationType;
