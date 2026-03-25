import { Field } from "@chakra-ui/react";
import { CheckboxUi, InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import GroupMembersForm from "../../../helpers/forms/GroupMembersForm";
import FormContainer from "../../../templates/forms/FormContainer";

const MeetingForm = ({ meeting, setMeeting, users, setUsers }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <FormContainer>
      <Field.Root>
        <Field.Label>{t("common.name")} :</Field.Label>
        <InputUi
          value={meeting.name || ""}
          onChange={(e) =>
            setMeeting((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
        />
      </Field.Root>
      <CheckboxUi
        checked={meeting.persistent}
        onCheckedChange={(e) =>
          setMeeting((prev) => ({
            ...prev,
            persistent: e.checked,
          }))
        }
      >
        {t("meetings.persistent")}
      </CheckboxUi>
      <CheckboxUi
        checked={meeting.require_authorization}
        onCheckedChange={(e) =>
          setMeeting((prev) => ({
            ...prev,
            require_authorization: e.checked,
          }))
        }
      >
        {t("meetings.require_authorization")}
      </CheckboxUi>
      <GroupMembersForm groupMembers={users} setGroupMembers={setUsers} label={t("meetings.administrators")} />
    </FormContainer>
  );
};

export default MeetingForm;
