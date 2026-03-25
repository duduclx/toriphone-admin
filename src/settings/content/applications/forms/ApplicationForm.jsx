import { useEffect } from "react";
import { Field, Flex } from "@chakra-ui/react";
import { NativeSelectUi, InputUi, CheckboxUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import MohForm from "../../../helpers/forms/MohForm";
import applicationDestinationsOptions from "../helpers/applicationDestinationOptions";
import FormContainer from "../../../templates/forms/FormContainer";

const ApplicationForm = ({ application, setApplication, moh, setMoh }) => {
  // requirements
  const { t } = useTranslation("admin");

  // destination
  const destinationChange = (e) => {
    setApplication({
      ...application,
      destination: e.target.value === "" ? null : e.target.value,
      destination_options: {
        ...application.destination_options,
        type: "holding",
      },
    });
  };

  // moh
  useEffect(() => {
    setApplication((prev) => ({
      ...prev,
      destination_options: {
        ...prev.destination_options,
        music_on_hold: moh?.value || null,
        music_on_hold_with_label: moh,
      },
    }));
  }, [moh]);

  return (
    <FormContainer>
      <Field.Root>
        <Field.Label>{t("common.name")}:</Field.Label>
        <InputUi
          required
          placeholder={t("common.name")}
          value={application.name}
          onChange={(e) => setApplication({ ...application, name: e.target.value })}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.destination")} :</Field.Label>
        <NativeSelectUi value={application.destination || ""} onChange={(e) => destinationChange(e)}>
          {applicationDestinationsOptions.map((dest, index) => (
            <option value={dest.value} key={index}>
              {dest.label}
            </option>
          ))}
        </NativeSelectUi>
      </Field.Root>
      {application.destination && (
        <>
          <MohForm moh={moh} setMoh={setMoh} />
          <CheckboxUi
            checked={application.destination_options.answer}
            onCheckedChange={(e) =>
              setApplication({
                ...application,
                destination_options: {
                  ...application.destination_options,
                  answer: e.checked,
                },
              })
            }
          >
            {t("common.answer")}
          </CheckboxUi>
        </>
      )}
    </FormContainer>
  );
};

export default ApplicationForm;
