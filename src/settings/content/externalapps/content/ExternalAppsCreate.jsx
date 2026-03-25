import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplatePage from "../../../templates/TemplatePage";
import ExternalAppForm from "../forms/ExternalAppForm";

const ExternalAppsCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { externalAppCreate } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [externalapp, setExternalapp] = useState({
    name: "",
    configuration: {
      purpose: "tenant",
    },
  });

  // users form
  const [users, setUsers] = useState([]);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    if(externalapp.name.length == 0 ) {
      setLoading(false);
      setErrors({ title: "error", description: "name required"});
      return
    }
    const res = await externalAppCreate(externalapp);
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
      title={t("external_apps.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"externalApps"}
      submit={submit}
      isCreate
      errors={errors}
      loading={loading}
    >
      <ExternalAppForm externalapp={externalapp} setExternalapp={setExternalapp} users={users} setUsers={setUsers} />
    </TemplatePage>
  );
};

export default ExternalAppsCreate;
