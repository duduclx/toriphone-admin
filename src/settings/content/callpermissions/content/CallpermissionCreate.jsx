import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplatePage from "../../../templates/TemplatePage";
import CallpermissionForm from "../forms/CallpermissionForm";

const CallpermissionCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { callPermissionAdd } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [callpermission, setCallpermission] = useState({
    extensions: [],
    mode: "allow",
  });

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await callPermissionAdd(callpermission);
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
      title={t("callpermissions.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"callpermissions"}
      submit={submit}
      isCreate
      hasTabs
      errors={errors}
      loading={loading}
    >
      <CallpermissionForm callpermission={callpermission} setCallpermission={setCallpermission} />
    </TemplatePage>
  );
};

export default CallpermissionCreate;
