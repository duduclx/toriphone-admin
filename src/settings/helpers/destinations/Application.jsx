import { useEffect } from "react";
import { Flex, Box, Field } from "@chakra-ui/react";
import { AsyncSelectUi, InputUi, NativeSelectUi } from "../../ui";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../ApiProvider";
import FormContainer from "../../templates/forms/FormContainer";

const Application = ({ destination, setDestination, destinationType }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { applicationsGet } = useApis();

  // application options
  const applicationOptions = [
    { label: t("destinations.application.callback_disa"), value: "callback_disa" },
    { label: t("destinations.application.custom"), value: "custom" },
    { label: t("destinations.application.directory"), value: "directory" },
    { label: t("destinations.application.disa"), value: "disa" },
    { label: t("destinations.application.fax_to_mail"), value: "fax_to_mail" },
    { label: t("destinations.application.voicemail"), value: "voicemail" },
  ];

  useEffect(() => {
    if (destination?.application === "custom") {
      setDestination((prev) => ({
        ...prev,
        label: destination.application_name,
      }));
    }
    if (!destination) {
      setDestination({
        application: "callback_disa",
        type: destinationType,
      });
    }
  }, []);

  const load = () => {
    return new Promise(async (resolve) => {
      const res = await applicationsGet();
      const filtered = res.items.map((item) => ({
        label: item.name,
        value: item.uuid,
      }));
      resolve(filtered);
    });
  };

  const change = (item) => {
    const res = {
      ...destination,
      application_uuid: item.value,
      type: destinationType,
      label: item.label,
    };
    setDestination(res);
  };

  return (
    <FormContainer w="full">
      <NativeSelectUi
        value={destination?.application || ""}
        onChange={(e) =>
          setDestination((prev) => ({
            ...prev,
            application: e.target.value,
            type: destinationType,
          }))
        }
      >
        {applicationOptions.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </NativeSelectUi>
      <Box>
        {(destination?.application === "callback_disa" || destination?.application === "disa") && (
          <Flex justifyContent="space-between" gap="4">
            <Field.Root>
              <Field.Label>{t("common.context")}</Field.Label>
              <InputUi
                value={destination.context || ""}
                onChange={(e) =>
                  setDestination((prev) => ({
                    ...prev,
                    context: e.target.value,
                  }))
                }
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>{t("common.pin")}</Field.Label>
              <InputUi
                value={destination.pin}
                onChange={(e) =>
                  setDestination((prev) => ({
                    ...prev,
                    pin: e.target.value,
                  }))
                }
              />
            </Field.Root>
          </Flex>
        )}

        {destination?.application === "custom" && (
          <Box width="100%">
            <AsyncSelectUi
              loadOptions={load}
              defaultOptions
              onChange={change}
              value={destination || ""}
              placeholder={t("common.application_select")}
            />
          </Box>
        )}

        {(destination?.application === "directory" || destination?.application === "voicemail") && (
          <Field.Root>
            <Field.Label>{t("common.context")}</Field.Label>
            <InputUi
              value={destination.context || ""}
              onChange={(e) =>
                setDestination((prev) => ({
                  ...prev,
                  context: e.target.value,
                }))
              }
            />
          </Field.Root>
        )}

        {destination?.application === "fax_to_mail" && (
          <Field.Root>
            <Field.Label>{t("common.email")}</Field.Label>
            <InputUi
              value={destination.email || ""}
              onChange={(e) =>
                setDestination((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
          </Field.Root>
        )}
      </Box>
    </FormContainer>
  );
};

export default Application;
