import { useEffect } from "react";
import { Field } from "@chakra-ui/react";
import { AsyncSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

const UserEditCallpermissions = ({user, setUser}) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { callPermissionsGet } = useApis();

  const load = () => {
    return new Promise(async (resolve) => {
      const callpermissions = await callPermissionsGet();
      const filtered = callpermissions.items.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      resolve(filtered);
    });
  };

  useEffect(() => {
    if (user.call_permissions.length > 0) {
      const updated = user.call_permissions.map((call_permission) => ({
        ...call_permission,
        label: call_permission.name,
      }));

      setUser((prevUser) => ({
        ...prevUser,
        call_permissions: updated,
      }));
    }
  }, []);

  const onchange = (selectedOptions) => {
    const transformed = (selectedOptions || []).map((item) => ({
        id: item.value,
        name: item.label,
        label: item.label,
      }));
      setUser((prev) => ({
        ...prev,
        call_permissions: transformed,
      }));
  };

  return (
    <Field.Root>
      <Field.Label>{t("common.call_permission")} :</Field.Label>
      <AsyncSelectUi
        cacheOptions
        loadOptions={load}
        defaultOptions
        isClearable
        isMulti
        onChange={onchange}
        value={
          user.call_permissions
            ? user.call_permissions.map((item) => ({
                label: item.label,
                value: item.id,
              }))
            : null
        }
        placeholder={t("users.call_permissions.select")}
      />
    </Field.Root>
  );
}

export default UserEditCallpermissions
