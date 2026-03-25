import { Field } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../ApiProvider";

import { AsyncSelectUi } from "../../ui";

/*
usage in 
GroupCreate
GroupEdit
outcallsEdit
*/

const CallpermissionsForm = ({ callpermissions, setCallpermissions }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { callPermissionsGet } = useApis();

  // load values
  const loadCallPermissions = () => {
    return new Promise(async (resolve) => {
      const permissions = await callPermissionsGet();
      const filteredpermissions = permissions.items.map((permission) => ({
        label: permission.name,
        value: permission.id,
      }));
      resolve(filteredpermissions);
    });
  };

  // onchange
  const handleCallPermissionsChange = (selectedOptions) => {
    const transformedPermissionss = (selectedOptions || []).map((permission) => ({
      id: permission.value,
      name: permission.label,
      label: permission.label,
    }));
    setCallpermissions(transformedPermissionss);
  };

  return (
    <Field.Root>
      <Field.Label>{t("common.call_permission")} :</Field.Label>
      <AsyncSelectUi
        cacheOptions
        loadOptions={loadCallPermissions}
        defaultOptions
        isClearable
        isMulti
        onChange={handleCallPermissionsChange}
        value={
          callpermissions
            ? callpermissions.map((permission) => ({
                label: permission.name,
                value: permission.id,
              }))
            : []
        }
        placeholder={t("common.call_permission_select")}
      />
    </Field.Root>
  );
};

export default CallpermissionsForm;
