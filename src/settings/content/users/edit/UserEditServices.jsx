import { Field } from "@chakra-ui/react";
import { CheckboxUi, InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../templates/forms/FormContainer";

const UserEditServices = ({ user, setUser }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <FormContainer alignSelf="center" justifyContent="center" mt="4">
      <CheckboxUi
        checked={user.services.dnd.enabled}
        onCheckedChange={(e) =>
          setUser({
            ...user,
            services: {
              ...user.services,
              dnd: {
                enabled: e.checked,
              },
            },
          })
        }
      >
        {t("users.services.dnd")}
      </CheckboxUi>

      <CheckboxUi
        checked={user.services.incallfilter.enabled}
        onCheckedChange={(e) =>
          setUser({
            ...user,
            services: {
              ...user.services,
              incallfilter: {
                enabled: e.checked,
              },
            },
          })
        }
      >
        {t("users.services.incallfilter")}
      </CheckboxUi>

      <CheckboxUi
        checked={user.call_record_incoming_external_enabled}
        onCheckedChange={(e) =>
          setUser({
            ...user,
            call_record_incoming_external_enabled: e.checked,
          })
        }
      >
        {t("users.services.call_record_incoming_external_enabled")}
      </CheckboxUi>

      <CheckboxUi
        checked={user.call_record_incoming_internal_enabled}
        onCheckedChange={(e) =>
          setUser({
            ...user,
            call_record_incoming_internal_enabled: e.checked,
          })
        }
      >
        {t("users.services.call_record_incoming_internal_enabled")}
      </CheckboxUi>

      <CheckboxUi
        checked={user.call_record_outgoing_external_enabled}
        onCheckedChange={(e) =>
          setUser({
            ...user,
            call_record_outgoing_external_enabled: e.checked,
          })
        }
      >
        {t("users.services.call_record_outgoing_external_enabled")}
      </CheckboxUi>

      <CheckboxUi
        checked={user.call_record_outgoing_internal_enabled}
        onCheckedChange={(e) =>
          setUser({
            ...user,
            call_record_outgoing_internal_enabled: e.checked,
          })
        }
      >
        {t("users.services.call_record_outgoing_internal_enabled")}
      </CheckboxUi>
      <Field.Root>
        <Field.Label>{t("users.services.call_permission_password")} :</Field.Label>
        <InputUi
          placeholder={t("users.services.call_permission_password")}
          value={user.call_permission_password || ""}
          onChange={(e) => setUser({ ...user, call_permission_password: e.value })}
        />
      </Field.Root>
      <CheckboxUi
        checked={user.supervision_enabled}
        onCheckedChange={(e) =>
          setUser({
            ...user,
            supervision_enabled: e.checked,
          })
        }
      >
        {t("users.services.supervision_enabled")}
      </CheckboxUi>
    </FormContainer>
  );
};

export default UserEditServices;
