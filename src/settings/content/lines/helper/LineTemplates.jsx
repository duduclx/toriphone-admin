import { Field } from "@chakra-ui/react";
import { AsyncSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

const LineTemplates = ({ line, setLine }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { endpointsSipTemplates, endpointsSipTemplatesGet } = useApis();

  // load values
  const load = () => {
    return new Promise(async (resolve) => {
      const res = await endpointsSipTemplatesGet();
      const filtered = res.items.map((item) => ({
        label: item.label,
        value: item.uuid,
      }));
      resolve(filtered);
    });
  };

  // onchange
  const handleChange = (item) => {
    const transformed = (item || []).map((template) => ({
      uuid: template.value,
      value: template.value,
      label: template.label,
    }));
    setLine({
      ...line,
      endpoint_sip: {
        ...line.endpoint_sip,
        templates: transformed,
      },
    });
  };

  return (
    <>
      {endpointsSipTemplates?.items && (
        <Field.Root>
          <Field.Label>{t("lines.templates")} :</Field.Label>
          <AsyncSelectUi
            cacheOptions
            loadOptions={load}
            defaultOptions
            isClearable
            isMulti
            onChange={handleChange}
            value={
              line.endpoint_sip.templates
                ? line.endpoint_sip.templates.map((item) => ({
                    label: item.label,
                    value: item.uuid,
                  }))
                : []
            }
            placeholder={t("lines.templates_select")}
          />
        </Field.Root>
      )}
    </>
  );
};

export default LineTemplates;
