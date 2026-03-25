import { Field } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../ApiProvider";
import { AsyncSelectUi } from "../../ui";

/*
usage in 
applicationform
GroupEdit
SwitchboardCreate
SwitchboardEdit
conferenceCreate
conferenceEdit
parkingEdit
parkingCreate
*/

const MohForm = ({ moh, setMoh, label, helperText }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { mohsGet } = useApis();

  // load
  const load = () => {
    return new Promise(async (resolve) => {
      const mohs = await mohsGet();
      const filteredMohs = mohs.items.map((moh) => ({
        label: moh.label,
        value: moh.name,
      }));
      resolve(filteredMohs);
    });
  };

  // change
  const change = (selectedOptions) => {
    setMoh(selectedOptions);
  };

  return (
    <Field.Root>
      <Field.Label>{label || `${t("common.moh")}`} :</Field.Label>
      <AsyncSelectUi
        cacheOptions
        loadOptions={load}
        defaultOptions
        isClearable
        onChange={change}
        value={moh}
        placeholder={t("common.moh_select")}
      />
      {helperText && <Field.HelperText>{helperText}</Field.HelperText>}
    </Field.Root>
  );
};

export default MohForm;
