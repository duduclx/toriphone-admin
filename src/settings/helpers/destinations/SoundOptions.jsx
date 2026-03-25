import { HStack } from "@chakra-ui/react";
import { CheckboxUi } from "../../ui";
import { useTranslation } from "react-i18next";

const SoundOptions = ({ destination, setDestination, destinationType }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <HStack gap="4" mt="4">
      <CheckboxUi
        checked={destination?.skip || false}
        onCheckedChange={(e) =>
          setDestination({
            ...destination,
            type: destinationType,
            skip: e.checked,
          })
        }
      >
        {t("common.sound_skip")}
      </CheckboxUi>
      <CheckboxUi
        checked={destination?.no_answer || false}
        onCheckedChange={(e) =>
          setDestination({
            ...destination,
            type: destinationType,
            no_answer: e.checked,
          })
        }
      >
        {t("common.sound_no_answer")}
      </CheckboxUi>
    </HStack>
  );
};

export default SoundOptions;
