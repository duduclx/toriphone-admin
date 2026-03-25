import { Field } from "@chakra-ui/react";
import { InputUi, NativeSelectUi } from "../../ui";
import { useTranslation } from "react-i18next";

/*
usage in
callFilterForm
IncallCreate
IncallEdit
QueueCreate
QueueEdit
*/

const CallerForm = ({ caller, setCaller }) => {
  // requirements
  const { t } = useTranslation("admin");

  // caller_id_mode options
  const callerIdModeOptions = [
    { label: t("common.none"), value: "" },
    { label: t("common.prepend"), value: "prepend" },
    { label: t("common.overwrite"), value: "overwrite" },
    { label: t("common.add"), value: "append" },
  ];

  // on change
  const handleCallerIdMode = (e) => {
    if (e.target.value === "") {
      setCaller({
        ...caller,
        caller_id_mode: null,
      });
      return;
    } else {
      setCaller({
        ...caller,
        caller_id_mode: e.target.value,
      });
    }
  };

  return (
    <>
      <Field.Root>
        <Field.Label>{t("common.caller_id_mode")} :</Field.Label>
        <NativeSelectUi value={caller.caller_id_mode} onChange={handleCallerIdMode}>
          {callerIdModeOptions.map((mode, index) => (
            <option value={mode.value} key={index}>
              {mode.label}
            </option>
          ))}
        </NativeSelectUi>
      </Field.Root>
      {caller.caller_id_mode && (
        <Field.Root>
          <Field.Label>{t("common.caller_id_name")} :</Field.Label>
          <InputUi
            required
            placeholder={t("common.caller_id_name")}
            value={caller.caller_id_name}
            onChange={(e) => setCaller({ ...caller, caller_id_name: e.target.value })}
          />
        </Field.Root>
      )}
    </>
  );
};

export default CallerForm;
