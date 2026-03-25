import { useEffect } from "react";
import { Field } from "@chakra-ui/react";
import { AsyncSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

const EndpointTransport = ({ endpoint, setEndpoint }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { sipTransports, sipTransportsGet } = useApis();

  useEffect(() => {
    sipTransportsGet();
  }, []);

  // update initial endpoint.transport
  useEffect(() => {
    if (endpoint?.transport && sipTransports.items) {
      const matchedTransport = sipTransports.items.find((item) => item.uuid === endpoint.transport.uuid);

      if (matchedTransport) {
        setEndpoint((prev) => ({
          ...prev,
          transport: {
            uuid: matchedTransport.uuid,
            value: matchedTransport.uuid,
            label: matchedTransport.name,
          },
        }));
      }
    }
  }, [sipTransports]);

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
      setEndpoint({
        ...endpoint,
        transport: {
          uuid: item.value,
          value: item.value,
          label: item.label,
        },
      });
    } else {
      setEndpoint({
        ...endpoint,
        transport: null,
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
            value={endpoint.transport || ""}
            placeholder={t("lines.transport_select")}
          />
          <Field.HelperText>{t("lines.transport_helper")}</Field.HelperText>
        </Field.Root>
      )}
    </>
  );
};

export default EndpointTransport;
