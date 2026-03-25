import { useEffect } from "react";
import { NativeSelectUi } from "../../ui";
import { useTranslation } from "react-i18next";

const Groupmember = ({ destination, setDestination, destinationType }) => {
  // requirements
  const { t } = useTranslation("admin");

  const actionOptions = [
    { label: t("destinations.funckeys.groupmember.toggle"), value: "toggle" },
    { label: t("destinations.funckeys.groupmember.join"), value: "join" },
    { label: t("destinations.funckeys.groupmember.leave"), value: "leave" },
  ];

  useEffect(() => {
    setDestination({
      ...destination,
      type: destinationType,
      action: destination?.action ? destination.action : actionOptions[0].value,
    });
  }, []);

  const changeAction = (e) => {
    setDestination({
      ...destination,
      type: destinationType,
      action: e.target.value,
    });
  };

  return (
    <NativeSelectUi
      minW="300px"
      w="fit-content"
      value={destination?.action || null}
      onChange={(e) => {
        changeAction(e);
      }}
    >
      {actionOptions.map((dest, index) => (
        <option value={dest.value} key={index}>
          {dest.label}
        </option>
      ))}
    </NativeSelectUi>
  );
};

export default Groupmember;
