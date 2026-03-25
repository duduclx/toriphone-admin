import { useEffect } from "react";
import { Field } from "@chakra-ui/react";
import { InputUi, NativeSelectUi, NumberInputUi } from "../../../ui";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../templates/forms/FormContainer";
import MohForm from "../../../helpers/forms/MohForm";

const ParkingForm = ({ parking, setParking, line, setLine, moh, setMoh, error, availableExtensions }) => {
  // requirements
  const { t } = useTranslation("admin");

  // timeout
  const handleTimeoutChange = (e) => {
    setParking({
        ...parking,
        timeout: e.value === "" ? null : e.value,
      });
  };

  // moh
  useEffect(() => {
    setParking((prev) => ({
      ...prev,
      music_on_hold: moh?.value || null,
      music_on_hold_with_label: moh,
    }));
  }, [moh]);

  return (
    <FormContainer>
      <Field.Root invalid={!!error.name}>
        <Field.Label>{t("common.name")} :</Field.Label>
        <InputUi
          required
          placeholder={t("common.name")}
          value={parking.name}
          onChange={(e) => setParking({ ...parking, name: e.target.value })}
        />
        {error.name && <Field.ErrorText>{error.name}</Field.ErrorText>}
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.number")} :</Field.Label>
        <NativeSelectUi
          value={line.exten}
          onChange={(e) => {
            setLine((prev) => ({
              context: prev.context,
              exten: e.target.value,
            }));
          }}
        >
          <option value={line.exten}>{line.exten}</option>
          {availableExtensions.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </NativeSelectUi>
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.start")} :</Field.Label>
        <NumberInputUi
          min={0}
          value={parking.slots_start}
          allowMouseWheel
          onValueChange={(e) => setParking({ ...parking, slots_start: e.value })}
        />
        <Field.HelperText>{t("parkingLots.start_help")}</Field.HelperText>
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.end")} :</Field.Label>
        <NumberInputUi
          min={0}
          value={parking.slots_end}
          allowMouseWheel
          onValueChange={(e) => setParking({ ...parking, slots_end: e.value })}
        />
        <Field.HelperText>{t("parkingLots.end_help")}</Field.HelperText>
      </Field.Root>
      <MohForm moh={moh} setMoh={setMoh} />
      <Field.Root>
        <Field.Label>{t("common.timeout")} :</Field.Label>
        <NumberInputUi min={0} value={parking.timeout || ""} allowMouseWheel onValueChange={handleTimeoutChange} />
        <Field.HelperText>{t("parkingLots.timeout_help")}</Field.HelperText>
      </Field.Root>
    </FormContainer>
  );
};

export default ParkingForm;
