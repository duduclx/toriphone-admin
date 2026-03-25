import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplatePage from "../../../templates/TemplatePage";

import ApplicationForm from "../forms/ApplicationForm";

const ApplicationCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { applicationCreate } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [application, setApplication] = useState({
    name: "",
    destination: "node",
    destination_options: {
      type: "holding",
      music_on_hold: null,
      answer: false,
    },
  });

  // moh
  const [moh, setMoh] = useState(null);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await applicationCreate(application);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("applications");
    }
  };

  return (
    <TemplatePage
      title={t("applications.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"applications"}
      submit={submit}
      isCreate
      errors={errors}
      loading={loading}
    >
      <ApplicationForm application={application} setApplication={setApplication} moh={moh} setMoh={setMoh}/>
    </TemplatePage>
  );
};

export default ApplicationCreate;
