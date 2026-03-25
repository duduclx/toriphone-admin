import { Field } from "@chakra-ui/react";
import { AsyncSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

const TrunkTemplatesForm = ({ templates, setTemplates }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { endpointsSipTemplatesGet } = useApis();

  // load value
  const load = () => {
    return new Promise(async (resolve) => {
      const res = await endpointsSipTemplatesGet();
      const filtered = res.items.map((item) => ({
        label: item.label,
        value: item.uuid,
        uuid: item.uuid
      }));
      resolve(filtered);
    });
  };

  // onchange
  const change = (items) => {
    const transformed = (items || []).map((item) => ({
      value: item.value,
      label: item.label,
      uuid: item.value
    }));
    setTemplates(transformed);
  };

  return (
    <Field.Root>
      <Field.Label>{t("common.templates")} :</Field.Label>
      <AsyncSelectUi
        cacheOptions
        loadOptions={load}
        defaultOptions
        isClearable
        isMulti
        onChange={change}
        value={
          templates
            ? templates.map((item) => ({
                label: item.label,
                value: item.value,
              }))
            : []
        }
        placeholder={t("common.templates")}
      />
    </Field.Root>
  );
};

export default TrunkTemplatesForm;
