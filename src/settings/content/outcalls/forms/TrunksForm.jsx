import { Field } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import { AsyncSelectUi } from "../../../ui";

/*
usage in
OutcallCreate
*/

const TrunksForm = ({ trunks, setTrunks }) => {
  // requirements
  const { t } = useTranslation("admin")

  // api
  const { trunksGet } = useApis();

  // get
  const load = () => {
    return new Promise(async (resolve) => {
      const trunks = await trunksGet();
      const filtered = trunks.items.map((trunk) => {
        let label = '';
        let id = '';
  
        // Vérifiez et assignez les valeurs pour endpoint_sip
        if (trunk.endpoint_sip) {
          label = trunk.endpoint_sip.label;
          id = trunk.id;
        }
        // Vérifiez et assignez les valeurs pour endpoint_iax
        else if (trunk.endpoint_iax) {
          label = trunk.endpoint_iax.label;
          id = trunk.id;
        }
        // Vérifiez et assignez les valeurs pour endpoint_custom
        else if (trunk.endpoint_custom) {
          label = trunk.endpoint_custom.label;
          id = trunk.id;
        }
  
        return {
          label: label,
          value: id,
        };
      });
      resolve(filtered);
    });
  };
  
  // onchange
  const handleChange = (selected) => {
    const transformed = (selected || []).map((item) => ({
        id: item.value,
        name: item.label,
        label: item.label,
      }));
    setTrunks(transformed)
  };

  return (
    <Field.Root>
      <Field.Label>{t("common.trunks")} :</Field.Label>
      <AsyncSelectUi
        cacheOptions
        loadOptions={load}
        defaultOptions
        isClearable
        isMulti
        onChange={handleChange}
        value={trunks.map((item) => ({
            label: item.label,
            value: item.id,
          }))}
        placeholder={t("common.trunks_select")} 
      />
    </Field.Root>
  );
}

export default TrunksForm