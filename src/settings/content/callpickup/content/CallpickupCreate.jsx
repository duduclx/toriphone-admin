import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";
import CallpickupForm from "../forms/CallpickupForm";

const CallpickupCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { callpickupCreate } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [callpickup, setCallpickup] = useState({
    name: "",
    description: "",
    interceptors: {
      groups: [],
      users: [],
    },
    targets: {
      groups: [],
      users: [],
    },
  });

  // interceptors group form
  const [interceptorsGroups, setInterceptorsGroups] = useState([]);

  // interceptors users form
  const [interceptorsUsers, setInterceptorsUsers] = useState([]);

  // targets groups form
  const [targetsGroups, setTargetsGroups] = useState([]);

  // targets users form
  const [targetsUsers, setTargetsUsers] = useState([]);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await callpickupCreate(callpickup);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("callpickups");
    }
  };

  return (
    <TemplatePage
      title={t("callpickups.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"callpickups"}
      submit={submit}
      isCreate
      errors={errors}
      loading={loading}
    >
      <CallpickupForm
        callpickup={callpickup}
        setCallpickup={setCallpickup}
        interceptorsGroups={interceptorsGroups}
        setInterceptorsGroups={setInterceptorsGroups}
        interceptorsUsers={interceptorsUsers}
        setInterceptorsUsers={setInterceptorsUsers}
        targetsGroups={targetsGroups}
        setTargetsGroups={setTargetsGroups}
        targetsUsers={targetsUsers}
        setTargetsUsers={setTargetsUsers}
      />
    </TemplatePage>
  );
};

export default CallpickupCreate;
