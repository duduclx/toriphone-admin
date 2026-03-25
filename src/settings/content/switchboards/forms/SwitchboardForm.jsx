import { useEffect } from "react";
import { Field } from "@chakra-ui/react";
import { InputUi, NumberInputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import MohForm from "../../../helpers/forms/MohForm";
import DestinationsForm from "../../../helpers/DestinationsForm";
import GroupMembersForm from "../../../helpers/forms/GroupMembersForm";
import FormContainer from "../../../templates/forms/FormContainer";

const SwitchboardForm = ({
  switchboard,
  setSwitchboard,
  moh,
  setMoh,
  mohHold,
  setMohHold,
  members,
  setMembers,
  destination,
  setDestination,
}) => {
  // requirements
  const { t } = useTranslation("admin");

  // timeout
  const handleTimeoutChange = (e) => {
    setSwitchboard((prev) => ({
        ...prev,
        timeout: e.value === "" ? null : e.value,
      }));
  };

  // moh
  useEffect(() => {
    setSwitchboard((prev) => ({
      ...prev,
      queue_music_on_hold: moh?.value || null,
      queue_music_on_hold_with_label: moh,
    }));
  }, [moh]);

  // mohhold
  useEffect(() => {
    setSwitchboard((prev) => ({
      ...prev,
      waiting_room_music_on_hold: mohHold?.value || null,
      waiting_room_music_on_hold_with_label: mohHold,
    }));
  }, [mohHold]);

  // members
  useEffect(() => {
    setSwitchboard((prev) => ({
      ...prev,
      members: {
        users: members,
      },
    }));
  }, [members]);

  // destination
  useEffect(() => {
    setSwitchboard((prev) => ({
      ...prev,
      fallbacks: {
        noanswer_destination: destination,
      },
    }));
  }, [destination]);

  return (
    <FormContainer>
      <Field.Root>
        <Field.Label>{t("common.name")} :</Field.Label>
        <InputUi
          required
          placeholder={t("common.name")}
          value={switchboard.name}
          onChange={(e) => setSwitchboard({ ...switchboard, name: e.target.value })}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.timeout")} :</Field.Label>
        <NumberInputUi
          min={0}
          value={switchboard.timeout === null ? "" : switchboard.timeout}
          allowMouseWheel
          onValueChange={handleTimeoutChange}
        />
        <Field.HelperText>{t("switchboards.timeout_helper")}</Field.HelperText>
      </Field.Root>
      <DestinationsForm
        label={t("common.noanswer_destination")}
        newDestination={destination}
        setNewDestination={setDestination}
      />
      <MohForm moh={moh} setMoh={setMoh} />
      <MohForm label={t("switchboards.moh_on_hold")} moh={mohHold} setMoh={setMohHold} />
      <GroupMembersForm groupMembers={members} setGroupMembers={setMembers} />
    </FormContainer>
  );
};

export default SwitchboardForm;
