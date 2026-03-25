import { useState } from "react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../../templates/TemplatePage";
import OutcallForm from "../forms/OutcallForm";

import { useApis } from "../../../../ApiProvider";

const OutcallEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { outcallSelected, outcallUpdate } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [outcall, setOutcall] = useState(() => {
    const trunksLabel = outcallSelected.trunks.map((trunk) => {
      let label = "";
      let id = "";

      if (trunk.endpoint_sip) {
        label = trunk.endpoint_sip.label;
        id = trunk.id;
      } else if (trunk.endpoint_iax) {
        label = trunk.endpoint_iax.label;
        id = trunk.id;
      } else if (trunk.endpoint_custom) {
        label = trunk.endpoint_custom.label;
        id = trunk.id;
      }

      return {
        ...trunk,
        label: label,
        value: id,
      };
    });
    return {
      ...outcallSelected,
      trunks: trunksLabel,
    };
  });

  // trunks
  const [trunks, setTrunks] = useState(outcall.trunks);

  // schedule form
  const initialSchedule =
    outcallSelected.schedules && outcallSelected.schedules.length > 0
      ? {
          ...outcallSelected.schedules[0],
          label: outcallSelected.schedules[0].name,
        }
      : null;
  const [schedule, setSchedule] = useState(initialSchedule);

  // callpermissions form
  const [callpermissions, setCallpermissions] = useState(outcallSelected.call_permissions);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await outcallUpdate(outcall, outcallSelected);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("outcalls");
    }
  };

  return (
    <TemplatePage
      title={t("outcalls.edit.title", { name: outcallSelected.name })}
      setSelectedComponent={setSelectedComponent}
      route={"outcalls"}
      submit={submit}
      isEdit
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

export default OutcallEdit;
