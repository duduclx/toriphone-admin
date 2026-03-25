import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplatePage from "../../../templates/TemplatePage";

import ApplicationForm from "../forms/ApplicationForm";

const ApplicationEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { applicationSelected, applicationEdit, mohs } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [application, setApplication] = useState(applicationSelected);

  // moh
  let updatedMoh = null;
  if (applicationSelected.destination_options.music_on_hold) {
    updatedMoh = {
      label:
        mohs.items.find((moh) => moh.name === applicationSelected.destination_options.music_on_hold)?.label || null,
      value: applicationSelected.destination_options.music_on_hold,
    };
  }
  const [moh, setMoh] = useState(updatedMoh);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await applicationEdit(application);
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
      title={t("applications.edit.title", {name: applicationSelected.name})}
      setSelectedComponent={setSelectedComponent}
      route={"applications"}
      submit={submit}
      isEdit
      errors={errors}
      loading={loading}
    >
      <ApplicationForm application={application} setApplication={setApplication} moh={moh} setMoh={setMoh}/>
    </TemplatePage>
  );
};

export default ApplicationEdit;
