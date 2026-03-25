import { useEffect, useState } from "react";
import { AsyncSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

const UserEditLineDevice = ({ line, setUser, index }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { devices, devicesGet } = useApis();

  const [device, setDevice] = useState(null)

  useEffect(() => {
    if (devices.items?.length > 0) {
      const match = devices.items.find((item) => item.id == line.device_id)
      if (match) {
        setDevice({
          ...match,
          label: match.ip + "(" + match.mac + ")",
          value: match.id
        })
      }
    }
  }, [devices])

  const load = () => {
    return new Promise(async (resolve) => {
      const res = await devicesGet();
      const filtered = res.items.map((item) => ({
        label: item.ip + "(" + item.mac + ")",
        value: item.id,
      }));
      resolve(filtered);
    });
  };

  const change = (item) => {
    if (item) {
      const device = {
        label: item.label,
        value: item.value,
      };
      setUser((prev) => ({
        ...prev,
        lines: prev.lines.map((line, idx) => (idx === index ? { ...line, device_id: device.value } : line)),
      }));
      setDevice(device)
    } else {
      setUser((prev) => ({
        ...prev,
        lines: prev.lines.map((line, idx) => (idx === index ? { ...line, device_id: null } : line)),
      }));
      setDevice(null);
    }
  };

  return (
    <AsyncSelectUi
      loadOptions={load}
      defaultOptions
      onChange={change}
      isClearable
      value={device || ""}
      placeholder={t("users.lines.device_select")}
    />
  );
};

export default UserEditLineDevice;
