import { useState } from "react";
import { AsyncSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

const UserEditLineApplication = ({ line, setUser, index }) => {
  // requirements
  const { t } = useTranslation("admin");

  const [application, setApplication] = useState({
    ...line.application,
    label: line.application?.name || null,
    value: line.application?.uuid || null,
  });

  const { applicationsGet } = useApis();

  const load = () => {
    return new Promise(async (resolve) => {
      const res = await applicationsGet();
      const filtered = res.items.map((item) => ({
        label: item.name,
        value: item.uuid,
      }));
      resolve(filtered);
    });
  };

  const change = (item) => {
    if (item) {
      const app = {
        name: item.label,
        label: item.label,
        uuid: item.value,
        value: item.value,
      };

      setUser((prev) => ({
        ...prev,
        lines: prev.lines.map((line, idx) => (idx === index ? { ...line, application: app } : line)),
      }));
      setApplication(app);
    } else {
      setUser((prev) => ({
        ...prev,
        lines: prev.lines.map((line, idx) => (idx === index ? { ...line, application: null } : line)),
      }));
      setApplication(null);
    }
  };

  return (
    <AsyncSelectUi
      loadOptions={load}
      defaultOptions
      onChange={change}
      isClearable
      value={application?.label ? application : ""}
      placeholder={t("users.lines.application_select")}
    />
  );
};

export default UserEditLineApplication;
