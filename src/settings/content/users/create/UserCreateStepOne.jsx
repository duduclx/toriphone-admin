import { Flex, Text, Field } from "@chakra-ui/react";
import { CheckboxUi, InputUi, NativeSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { subscriptionsTypes } from "../../subscriptions/helpers/SubscriptionsHelper";
import FormContainer from "../../../templates/forms/FormContainer";

const UserCreateStepOne = ({ newUser, setNewUser, setLine, addPolicie, setAddPolicie, emailError, setEmailError }) => {
  // requirements
  const { t } = useTranslation("admin");

  const handleCheckboxChange = (e) => {
    setAddPolicie(e.checked);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setNewUser({ ...newUser, email });

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]{2,}\.[^\s@]{2,}$/;
    setEmailError(!emailRegex.test(email));
  };

  return (
    <Flex flex="1" justifyContent="center">
      <FormContainer alignSelf="center" width="50%">
        <Text fontSize="xl" textAlign="center" mb="4">
          {t("users.create.title")}
        </Text>
        <Field.Root>
          <InputUi
            required
            placeholder={t("common.firstname")}
            value={newUser.firstname}
            onChange={(e) => {
              setNewUser({ ...newUser, firstname: e.target.value });
              setLine((prevState) => ({
                ...prevState,
                firstname: e.target.value,
              }));
            }}
          />
          <Field.HelperText>{t("users.create.required")}</Field.HelperText>
        </Field.Root>
        <Field.Root>
          <InputUi
            required
            placeholder={t("common.lastname")}
            value={newUser.lastname}
            onChange={(e) => {
              setNewUser({ ...newUser, lastname: e.target.value });
              setLine((prevState) => ({
                ...prevState,
                lastname: e.target.value,
              }));
            }}
          />
          <Field.HelperText>{t("users.create.required")}</Field.HelperText>
        </Field.Root>

        <Field.Root invalid={emailError}>
          <InputUi required value={newUser.email} placeholder={t("common.email")} onChange={handleEmailChange} />
          <Field.HelperText>{t("users.create.required")}</Field.HelperText>
          {emailError && <Field.ErrorText>{t("users.create.step_user_email_invalid")}</Field.ErrorText>}
        </Field.Root>
        <Field.Root invalid={newUser.password.length < 4}>
          <InputUi
            required
            value={newUser.password}
            placeholder={t("common.password")}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
          <Field.HelperText>{t("users.create.required")}</Field.HelperText>
        </Field.Root>
        <CheckboxUi checked={addPolicie} onCheckedChange={handleCheckboxChange}>
          {t("users.create.step_user_admin")}
        </CheckboxUi>
        <Field.Root>
          <Field.Label>{t("subscriptions.list.type")} :</Field.Label>
          <NativeSelectUi
            value={newUser.subscription_type}
            onChange={(e) => setNewUser({ ...newUser, subscription_type: parseInt(e.target.value, 10) })}
          >
            {subscriptionsTypes.map((subscription, index) => (
              <option value={index} key={index}>
                {subscription}
              </option>
            ))}
          </NativeSelectUi>
        </Field.Root>
      </FormContainer>
    </Flex>
  );
};

export default UserCreateStepOne;
