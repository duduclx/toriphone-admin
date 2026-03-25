import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplatePage from "../../../templates/TemplatePage";
import CallpermissionForm from "../forms/CallpermissionForm";

const CallpermissionEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { callPermissionSelected, callPermissionEdit } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [callpermission, setCallpermission] = useState(callPermissionSelected);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await await callPermissionEdit(callpermission);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("callpermissions");
    }
  };

  return (
    <TemplatePage
      title={t("callpermissions.edit.title", { name: callPermissionSelected.name })}
      setSelectedComponent={setSelectedComponent}
      route={"callpermissions"}
      submit={submit}
      isEdit
      hasTabs
      errors={errors}
      loading={loading}
    >
      <CallpermissionForm callpermission={callpermission} setCallpermission={setCallpermission} />
    </TemplatePage>
  );
};

export default CallpermissionEdit;
