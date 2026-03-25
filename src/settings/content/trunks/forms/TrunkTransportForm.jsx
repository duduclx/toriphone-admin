import { Field } from "@chakra-ui/react";
import { AsyncSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

const TrunkTransportForm = ({ transport, setTransport }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { sipTransportsGet } = useApis();

  // load values
  const load = () => {
    return new Promise(async (resolve) => {
      const res = await sipTransportsGet();
      const filtered = res.items.map((item) => ({
        label: item.name,
        value: item.uuid,
      }));
      resolve(filtered);
    });
  };

  // onchange
  const change = (item) => {
    if (item) {
      const transformed = {
        label: item.label,
        value: item.value,
      };
      setTransport(transformed);
    } else {
      setTransport(null);
    }
  };

  return (
    <Field.Root>
      <Field.Label>{t("common.transport")} :</Field.Label>
      <AsyncSelectUi
        cacheOptions
        loadOptions={load}
        defaultOptions
        isClearable
        onChange={change}
        value={transport || ""}
        placeholder={t("common.transport")}
      />
    </Field.Root>
  );
};

export default TrunkTransportForm;
