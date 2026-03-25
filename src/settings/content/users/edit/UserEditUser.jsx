import { useState } from "react";
import { Field } from "@chakra-ui/react";
import { InputUi, NativeSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { subscriptionsTypes } from "../../subscriptions/helpers/SubscriptionsHelper";
import FormContainer from "../../../templates/forms/FormContainer";

const UserEditUser = ({ user, setUser }) => {
  // requirements
  const { t } = useTranslation("admin");

  // error
  const [emailError, setEmailError] = useState(false);

  // form
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setUser({ ...user, email });
    const emailRegex = /^[^\s@]+@[^\s@]{2,}\.[^\s@]{2,}$/;
    setEmailError(!emailRegex.test(email));
  };

  return (
    <FormContainer alignSelf="center" justifyContent="center">
      <Field.Root>
        <Field.Label>{t("common.firstname")} :</Field.Label>
        <InputUi
          placeholder={t("common.firstname")}
          value={user.firstname || ""}
          // edit line too
          onChange={(e) => {
            const newFirstname = e.target.value;
            const updatedUser = {
              ...user,
              firstname: newFirstname,
              caller_id: `\"${newFirstname} ${user.lastname || ""}\"`,
              voicemail: {
                ...user.voicemail,
                label: `${newFirstname} ${user.lastname}`,
                name: `${newFirstname} ${user.lastname}`,
              },
            };
            setUser(updatedUser);
          }}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.lastname")} :</Field.Label>
        <InputUi
          placeholder={t("common.lastname")}
          value={user.lastname || ""}
          onChange={(e) => {
            const newLastname = e.target.value;
            const updatedUser = {
              ...user,
              lastname: newLastname,
              caller_id: `\"${user.firstname || ""} ${newLastname}\"`,
              voicemail: {
                ...user.voicemail,
                label: `${user.firstname} ${newLastname}`,
                name: `${user.firstname} ${newLastname}`,
              },
            };
            setUser(updatedUser);
          }}
        />
      </Field.Root>
      <Field.Root invalid={emailError}>
        <Field.Label>{t("common.email")} :</Field.Label>
        <InputUi value={user.email || ""} placeholder="email" onChange={handleEmailChange} />
        {emailError && <Field.ErrorText>{t("users.edit.email_invalid")}</Field.ErrorText>}
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.password")} :</Field.Label>
        <InputUi
          placeholder={t("common.password")}
          value={user.password || ""}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("subscriptions.list.type")} :</Field.Label>
        <NativeSelectUi
          value={user.subscription_type}
          onChange={(e) => setUser({ ...user, subscription_type: parseInt(e.target.value, 10) })}
        >
          {subscriptionsTypes.map((subscription, index) => (
            <option value={index} key={index}>
              {subscription}
            </option>
          ))}
        </NativeSelectUi>
      </Field.Root>
    </FormContainer>
  );
};

export default UserEditUser;
