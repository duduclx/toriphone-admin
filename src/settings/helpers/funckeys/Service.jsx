import { useEffect } from "react";
import { NativeSelectUi } from "../../ui";
import { useTranslation } from "react-i18next";

const Service = ({ destination, setDestination, destinationType }) => {
  // requirements
  const { t } = useTranslation("admin");

  const serviceOptions = [
    { label: t("destinations.funckeys.service.enablevm"), value: "enablevm" },
    { label: t("destinations.funckeys.service.vmusermsg"), value: "vmusermsg" },
    { label: t("destinations.funckeys.service.vmuserpurge"), value: "vmuserpurge" },
    { label: t("destinations.funckeys.service.phonestatus"), value: "phonestatus" },
    { label: t("destinations.funckeys.service.recsnd"), value: "recsnd" },
    { label: t("destinations.funckeys.service.fwdundoall"), value: "fwdundoall" },
    { label: t("destinations.funckeys.service.calllistening"), value: "calllistening" },
    { label: t("destinations.funckeys.service.directoyaccess"), value: "directoyaccess" },
    { label: t("destinations.funckeys.service.pickup"), value: "pickup" },
    { label: t("destinations.funckeys.service.callrecord"), value: "callrecord" },
    { label: t("destinations.funckeys.service.incallfilter"), value: "incallfilter" },
    { label: t("destinations.funckeys.service.enablednd"), value: "enablednd" },
  ];

  useEffect(() => {
    setDestination({
      ...destination,
      type: destinationType,
      service: destination?.service ? destination.service : serviceOptions[0].value,
    });
  }, []);

  const change = (e) => {
    const destination = {
      service: e.target.value,
      type: destinationType,
    };
    setDestination(destination);
  };

  return (
    <NativeSelectUi
      minW="300px"
      w="fit-content"
      value={destination?.service || null}
      onChange={(e) => {
        change(e);
      }}
    >
      {serviceOptions.map((dest) => (
        <option value={dest.value} key={dest.value}>
          {dest.label}
        </option>
      ))}
    </NativeSelectUi>
  );
};

export default Service;
