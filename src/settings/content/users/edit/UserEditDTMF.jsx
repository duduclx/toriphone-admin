import { CheckboxUi } from "../../../ui";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../templates/forms/FormContainer";

const UserEditDTMF = ({ user, setUser }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <FormContainer alignSelf="center" justifyContent="center" mt="4">
      <CheckboxUi
        checked={user.call_transfer_enabled}
        onChange={(e) =>
          setUser({
            ...user,
            call_transfer_enabled: e.checked,
          })
        }
      >
        {t("users.dtmf.call_transfer_enabled")}
      </CheckboxUi>
      <CheckboxUi
        checked={user.dtmf_hangup_enabled}
        onCheckedChange={(e) =>
          setUser({
            ...user,
            dtmf_hangup_enabled: e.checked,
          })
        }
      >
        {t("users.dtmf.dtmf_hangup_enabled")}
      </CheckboxUi>
      <CheckboxUi
        checked={user.online_call_record_enabled}
        onCheckedChange={(e) =>
          setUser({
            ...user,
            online_call_record_enabled: e.checked,
          })
        }
      >
        {t("users.dtmf.online_call_record_enabled")}
      </CheckboxUi>
    </FormContainer>
  );
};

export default UserEditDTMF;
