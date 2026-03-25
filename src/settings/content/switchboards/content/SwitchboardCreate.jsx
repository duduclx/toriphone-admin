import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";

import SwitchboardForm from "../forms/SwitchboardForm";

const SwitchboardCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { switchboardCreate } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [switchboard, setSwitchboard] = useState({
    timeout: null,
    queue_music_on_hold: null,
    waiting_room_music_on_hold: null,
    fallbacks: {
      noanswer_destination: null,
    },
    members: {
      users: null,
    },
  });

  // moh form
  const [moh, setMoh] = useState(null);

  // moh on hold form
  const [mohHold, setMohHold] = useState(null);

  // members form
  const [members, setMembers] = useState([]);

  // destination form
  const [destination, setDestination] = useState(null);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await switchboardCreate(switchboard);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("switchboards");
    }
  };

  return (
    <TemplatePage
      title={t("switchboards.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"switchboards"}
      submit={submit}
      isCreate
      errors={errors}
      loading={loading}
    >
      <SwitchboardForm
        switchboard={switchboard}
        setSwitchboard={setSwitchboard}
        moh={moh}
        setMoh={setMoh}
        mohHold={mohHold}
        setMohHold={setMohHold}
        members={members}
        setMembers={setMembers}
        destination={destination}
        setDestination={setDestination}
      />
    </TemplatePage>
  );
};

export default SwitchboardCreate;
