import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { NativeSelectUi } from "../../ui";
import { useTranslation } from "react-i18next";

const Forward = ({ destination, setDestination, destinationType }) => {
  // requirements
  const { t } = useTranslation("admin");

  const forwardOptions = [
    { label: t("destinations.funckeys.forward.busy"), value: "busy" },
    { label: t("destinations.funckeys.forward.noanswer"), value: "noanswer" },
    { label: t("destinations.funckeys.forward.unconditional"), value: "unconditional" },
  ];

  useEffect(() => {
    setDestination({
      ...destination,
      type: destinationType,
      forward: destination?.forward ? destination.forward : forwardOptions[0].value,
    });
  }, []);

  const change = (e) => {
    const updt = {
      forward: e.target.value,
      type: destinationType,
      exten: destination.exten,
    };
    setDestination(updt);
  };

  return (
      <NativeSelectUi
        minW="300px"
        w="fit-content"
        value={destination?.forward || ""}
        onChange={(e) => {
          change(e);
        }}
      >
        {forwardOptions.map((dest) => (
          <option value={dest.value} key={dest.value}>
            {dest.label}
          </option>
        ))}
      </NativeSelectUi>
  );
};

export default Forward;
