import { NativeSelectUi } from "../../ui";
import { useTranslation } from "react-i18next";

const FunckeysDestinationsForm = ({ destinationType, setDestinationType, index, setFunckeys, setDestination }) => {
  // requirements
  const { t } = useTranslation("admin");

  const destinationsOptions = [
    { label: t("destinations.funckeys.destination.default"), value: "" },
    { label: t("destinations.funckeys.destination.conference"), value: "conference" },
    { label: t("destinations.funckeys.destination.custom"), value: "custom" },
    { label: t("destinations.funckeys.destination.transfer"), value: "transfer" },
    { label: t("destinations.funckeys.destination.service"), value: "service" },
    { label: t("destinations.funckeys.destination.forward"), value: "forward" },
    { label: t("destinations.funckeys.destination.onlinerec"), value: "onlinerec" },
    { label: t("destinations.funckeys.destination.group"), value: "group" },
    { label: t("destinations.funckeys.destination.groupmember"), value: "groupmember" },
    { label: t("destinations.funckeys.destination.parking"), value: "parking" },
    { label: t("destinations.funckeys.destination.park_position"), value: "park_position" },
    { label: t("destinations.funckeys.destination.queue"), value: "queue" },
    { label: t("destinations.funckeys.destination.user"), value: "user" },
    //{ label: t("users.funckeys.destination.bsfilter"), value: "bsfilter" },
  ];

  const handleDestinationChange = (newDestinationType) => {
    setDestinationType(newDestinationType);
    setDestination(null);

    // Mettre à jour funckey.destination.type dans le tableau des funckeys
    setFunckeys((prev) => {
      const updatedFunckeys = [...prev];
      updatedFunckeys[index] = {
        ...updatedFunckeys[index],
        destination: null,
      };
      return updatedFunckeys;
    });
  };

  return (
    <NativeSelectUi
      width="300px"
      value={destinationType || null}
      onChange={(e) => {
        handleDestinationChange(e.target.value);
      }}
    >
      {destinationsOptions.map((dest, index) => (
        <option value={dest.value} key={index}>
          {dest.label}
        </option>
      ))}
    </NativeSelectUi>
  );
};

export default FunckeysDestinationsForm;
