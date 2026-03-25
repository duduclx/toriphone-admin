import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import getLabelForFallback from "../../../helpers/DestinationsHelper";
import TemplatePage from "../../../templates/TemplatePage";

import SwitchboardForm from "../forms/SwitchboardForm";

const SwitchboardEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { switchboardSelected, mohs, switchboardUpdate } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [switchboard, setSwitchboard] = useState(() => {
    const updatedMembers = {
      ...switchboardSelected.members,
      users: switchboardSelected.members.users.map((user) => ({
        ...user,
        label: `${user.firstname} ${user.lastname}`,
      })),
    };
    return {
      ...switchboardSelected,
      members: updatedMembers,
    };
  });

  // moh form
  // update for moh label
  let updatedMoh = null;
  if (switchboardSelected.queue_music_on_hold) {
    updatedMoh = {
      label: mohs.items.find((moh) => moh.name === switchboardSelected.queue_music_on_hold)?.label || null,
      value: switchboardSelected.queue_music_on_hold,
    };
  }
  const [moh, setMoh] = useState(updatedMoh);

  // moh on hold form
  let updatedMohHold = null;
  if (switchboardSelected.waiting_room_music_on_hold) {
    updatedMohHold = {
      label: mohs.items.find((moh) => moh.name === switchboardSelected.waiting_room_music_on_hold)?.label || null,
      value: switchboardSelected.waiting_room_music_on_hold,
    };
  }
  const [mohHold, setMohHold] = useState(updatedMohHold);

  // members form
  const [members, setMembers] = useState(switchboard.members.users);

  // destination form
  const [destination, setDestination] = useState(getLabelForFallback(switchboard.fallbacks.noanswer_destination));
  
  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await switchboardUpdate(switchboard);
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
      title={t("switchboards.edit.title", { name: switchboardSelected.name })}
      setSelectedComponent={setSelectedComponent}
      route={"switchboards"}
      submit={submit}
      isEdit
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

export default SwitchboardEdit;
