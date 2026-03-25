import { Field } from "@chakra-ui/react";
import { InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../templates/forms/FormContainer";

const UserEditGeneral = ({ user, setUser }) => {
  // requirements
  const { t } = useTranslation("admin");

  /*
 input number -> ring_seconds
 moh form -> music_on_hold
 input number -> simultaneous_calls
 timezone -> voir timezone voicemails pour la liste ??
  */

  return (
    <FormContainer alignSelf="center" justifyContent="center">
      <Field.Root>
        <Field.Label>{t("users.general.mobile_phone")} :</Field.Label>
        <InputUi
          placeholder={t("users.general.mobile_phone")}
          value={user.mobile_phone_number || ""}
          onChange={(e) => setUser({ ...user, mobile_phone_number: e.target.value })}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("users.general.routine")} :</Field.Label>
        <InputUi
          placeholder={t("users.general.routine")}
          value={user.preprocess_subroutine || ""}
          onChange={(e) => setUser({ ...user, preprocess_subroutine: e.target.value })}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("users.general.timezone")} :</Field.Label>
        <InputUi
          placeholder={t("users.general.timezone")}
          value={user.timezone || ""}
          onChange={(e) => setUser({ ...user, timezone: e.target.value })}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("users.general.userfield")} :</Field.Label>
        <InputUi
          placeholder={t("users.general.userfield")}
          value={user.userfield || ""}
          onChange={(e) => setUser({ ...user, userfield: e.target.value })}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.description")} :</Field.Label>
        <InputUi
          placeholder={t("common.description")}
          value={user.description || ""}
          onChange={(e) => setUser({ ...user, description: e.target.value })}
        />
      </Field.Root>
    </FormContainer>
  );
}

export default UserEditGeneral