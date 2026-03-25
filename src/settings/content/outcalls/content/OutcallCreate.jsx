import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";
import OutcallForm from "../forms/OutcallForm";

const OutcallCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { outcallCreate } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [outcall, setOutcall] = useState({extensions: []});

  // trunk form
  const [trunks, setTrunks] = useState([]);

  // schedule
  const [schedule, setSchedule] = useState(null);

  // callpermissions
  const [callpermissions, setCallpermissions] = useState([]);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await outcallCreate(outcall);
    if (res.error) {
      setLoading(false);
      setErrors({title: res.status, description: res.message});
    } else {
      setLoading(false);
      setSelectedComponent("outcalls");
    }
  };

  return (
    <TemplatePage
      title={t("outcalls.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"outcalls"}
      submit={submit}
      isCreate
      hasTabs
      errors={errors}
      loading={loading}
    >
      <OutcallForm 
      outcall={outcall}
      setOutcall={setOutcall}
      trunks={trunks}
      setTrunks={setTrunks}
      schedule={schedule}
      setSchedule={setSchedule}
      callpermissions={callpermissions}
      setCallpermissions={setCallpermissions}
      />
    </TemplatePage>
  );
};

export default OutcallCreate;
