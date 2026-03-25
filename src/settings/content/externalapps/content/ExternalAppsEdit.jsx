import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";
import ExternalAppForm from "../forms/ExternalAppForm";

const ExternalAppsEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { externalAppSelected, externalAppUpdate } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [externalapp, setExternalapp] = useState(externalAppSelected);

  // users form
  const [users, setUsers] = useState(externalapp.configuration.users || []);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await externalAppUpdate(externalapp);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("externalApps");
    }
  };

  return (
    <TemplatePage
      title={t("external_apps.edit.title", { name: externalAppSelected.name })}
      setSelectedComponent={setSelectedComponent}
      route={"externalApps"}
      submit={submit}
      isEdit
      errors={errors}
      loading={loading}
    >
      <ExternalAppForm externalapp={externalapp} setExternalapp={setExternalapp} users={users} setUsers={setUsers} isEdit/>
    </TemplatePage>
  );
};

export default ExternalAppsEdit;
