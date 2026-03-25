import { useEffect, useState } from "react";
import { Field } from "@chakra-ui/react";
import { AsyncSelectUi, NativeSelectUi } from "../../ui";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../ApiProvider";
import FormContainer from "../../templates/forms/FormContainer";

const Outcall = ({ destination, setDestination, destinationType }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { outcallsGet, outcallGet } = useApis();

  // exten
  const [extens, setExtens] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await outcallGet(destination.outcall_id);
      setExtens(res.extensions);
      setDestination((prev) => ({
        ...prev,
        label: res.name,
      }));
    };
    if (destination?.outcall_id) {
      fetch();
    }
  }, []);

  const load = () => {
    return new Promise(async (resolve) => {
      const res = await outcallsGet();
      const filtered = res.items.map((item) => ({
        ...item,
        label: item.name,
        value: item.id,
      }));
      resolve(filtered);
    });
  };

  const change = (item) => {
    const res = {
      ...destination,
      outcall_id: item.value,
      type: destinationType,
      label: item.label,
      exten: item.extensions?.[0]?.exten || null,
    };
    setDestination(res);
    setExtens(item.extensions);
  };

  return (
    <FormContainer width="full">
      <AsyncSelectUi
        loadOptions={load}
        defaultOptions
        onChange={change}
        value={destination || ""}
        placeholder={t("common.outcall_select")}
      />
      <Field.Root>
        <Field.Label>{t("common.number")} :</Field.Label>
        <NativeSelectUi
          minW="300px"
          width="full"
          value={destination?.exten || ""}
          onChange={(e) =>
            setDestination((prev) => ({
              ...prev,
              exten: e.target.value,
            }))
          }
        >
          {extens?.map((item, index) => (
            <option key={index} value={item.exten}>
              {item.exten}
            </option>
          ))}
        </NativeSelectUi>
      </Field.Root>
    </FormContainer>
  );
};

export default Outcall;
