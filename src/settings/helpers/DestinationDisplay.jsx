import { useTranslation } from "react-i18next";

const DestinationDisplay = ({ destination }) => {
  const { t } = useTranslation("admin");

  if (!destination) return <></>;

  // Mapping des types avec leurs labels traduits et valeurs
  const typeMappings = {
    user: {
      label: t("common.user"),
      value: `${destination.user_firstname || ""} ${destination.user_lastname || ""}`.trim(),
    },
    group: {
      label: t("common.group"),
      value: destination.group_label || "",
    },
    ivr: {
      label: t("common.ivr"),
      value: destination.ivr_name || "",
    },
    queue: {
      label: t("common.queue"),
      value: destination.queue_label || "",
    },
    switchboard: {
      label: t("common.switchboard"),
      value: destination.switchboard_name || "",
    },
    custom: {
      label: t("common.custom"),
      value: destination.command || "",
    },
    conference: {
      label: t("common.conference"),
      value: destination.conference_name || "",
    },
    hangup: {
      label: t("common.hangup"),
      value: destination.cause || "",
    },
    sound: {
      label: t("common.sound"),
      value: destination.filename?.split('/').pop() || "",
    },
    voicemail: {
      label: t("common.voicemail"),
      value: destination.voicemail_name || "",
    },
    application: {
      label: t("common.application"),
      value: destination.application || "",
    },
    outcall: {
      label: t("common.outcall"),
      value: destination.exten || "",
    },
    extension: {
      label: t("common.extension"),
      value: destination.exten || "",
    },
  };

  const typeInfo = typeMappings[destination.type] || {};

  return (
    <>
      {typeInfo.label && (
        <>
          {typeInfo.label}: {typeInfo.value}
        </>
      )}
    </>
  );
};

export default DestinationDisplay;
