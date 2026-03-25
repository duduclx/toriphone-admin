import { useEffect } from "react";
import { Field } from "@chakra-ui/react";
import { AsyncSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

const LineTransport = ({ line, setLine }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { sipTransports, sipTransportsGet } = useApis();

  useEffect(() => {
    sipTransportsGet();
  }, []);

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
  const handleChange = (item) => {
    if (item) {
      setLine({
        ...line,
        endpoint_sip: {
          ...line.endpoint_sip,
          transport: { uuid: item.value },
        },
      });
    } else {
      const { transport, ...restEndpointSip } = line.endpoint_sip;
      setLine({
        ...line,
        endpoint_sip: restEndpointSip,
      });
    }
  };

  return (
    <>
      {sipTransports?.items && (
        <Field.Root>
          <Field.Label>{t("lines.transport")} :</Field.Label>
          <AsyncSelectUi
            cacheOptions
            loadOptions={load}
            defaultOptions
            isClearable
            onChange={handleChange}
            value={line.transport}
            placeholder={t("lines.transport_select")}
          />
          <Field.HelperText>{t("lines.transport_helper")}</Field.HelperText>
        </Field.Root>
      )}
    </>
  );
};

export default LineTransport;
