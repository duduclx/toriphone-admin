import { Field } from "@chakra-ui/react";
import { AsyncSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

const TrunkContextForm = ({context, setContext}) => {
    // requirements
  const { t } = useTranslation("admin");

  // api
  const { contextsGet } = useApis();

  // load values
  const load = () => {
    return new Promise(async (resolve) => {
      const res = await contextsGet();
      //const items = res.items.filter((item) => item.type === "outcall");
      const items = res.items
        .filter((item) => item.type === "outcall")
        .map((item) => ({
          name: item.name,
          label: item.label,
        }));
      resolve(items);
    });
  };

  // onchange
  const change = (item) => {
    if(item) {
        const transformed = {
          name: item.name,
          label: item.label,
        };
        setContext(transformed);
    } else {
        setContext(null)
    }
  };

  return (
    <Field.Root>
      <Field.Label>{t("common.context")} :</Field.Label>
      <AsyncSelectUi
        cacheOptions
        loadOptions={load}
        defaultOptions
        isClearable
        onChange={change}
        value={context || ""}
        placeholder={t("common.context")}
      />
    </Field.Root>
  )
}

export default TrunkContextForm
