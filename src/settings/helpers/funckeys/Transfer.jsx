import { useEffect } from "react";
import { NativeSelectUi } from "../../ui";
import { useTranslation } from "react-i18next";

const Transfer = ({ destination, setDestination, destinationType }) => {
  // requirements
  const { t } = useTranslation("admin");

  const transferOptions = [
    { label: t("destinations.funckeys.transfer.blind"), value: "blind" },
    { label: t("destinations.funckeys.transfer.attended"), value: "attended" },
  ];

  useEffect(() => {
    setDestination({
      ...destination,
      type: destinationType,
      transfer: destination?.transfer ? destination.transfer : transferOptions[0].value,
    });
  }, []);

  const change = (e) => {
    const destination = {
      transfer: e.target.value,
      type: destinationType,
    };
    setDestination(destination);
  };

  return (
    <NativeSelectUi
      minW="300px"
      w="fit-content"
      value={destination?.transfer || null}
      onChange={(e) => {
        change(e);
      }}
    >
      {transferOptions.map((dest) => (
        <option value={dest.value} key={dest.value}>
          {dest.label}
        </option>
      ))}
    </NativeSelectUi>
  );
};

export default Transfer;
