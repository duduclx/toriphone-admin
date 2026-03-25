import { AsyncSelectUi } from "../../../ui";
import { useTranslation } from 'react-i18next';

import { useApis } from "../../../../ApiProvider";

const UserEditLineTemplates = ({ line, setUser, index, endpoint, setEndpoint }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { endpointsSipTemplatesGet } = useApis();

  const load = () => {
    return new Promise(async (resolve) => {
      const res = await endpointsSipTemplatesGet();
      const filtered = res.items.map((item) => ({
        label: item.label,
        value: item.uuid,
      }));
      resolve(filtered);
    });
  }

  const change = (items) => {
    const tpls = (items || []).map((item) => ({
      uuid: item.value,
      value: item.value,
      label: item.label,
    }));
    setEndpoint({
      ...endpoint,
      templates: tpls
    })
    setUser((prev) => ({
      ...prev,
      lines: prev.lines.map((line, idx) => (idx === index ? { ...line, endpoint: { ...endpoint, templates: tpls} } : line)),
    }));
  }

  return (
    <AsyncSelectUi
      loadOptions={load}
      defaultOptions
      onChange={change}
      isClearable
      isMulti
      isDisabled={line.protocol !== "sip"}
      value={endpoint?.templates
        ? endpoint?.templates.map((item) => ({
            label: item.label,
            uuid: item.uuid,
            value: item.uuid
          }))
        : []}
      placeholder={t("users.lines.models_select")}
    />
  )
}

export default UserEditLineTemplates
