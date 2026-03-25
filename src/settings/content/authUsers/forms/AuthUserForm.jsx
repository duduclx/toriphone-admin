import { useEffect } from "react";
import { Flex, Field } from "@chakra-ui/react";
import { CheckboxUi, InputUi, NativeSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import PolicyForm from "../../../helpers/forms/PolicyForm";
import PolicyGroupForm from "../../../helpers/forms/PolicyGroupForm";
import purposes from "../helpers/purposes";

import { useApis } from "../../../../ApiProvider";
import FormContainer from "../../../templates/forms/FormContainer";

const AuthUserForm = ({ authUser, setAuthUser, policies, setPolicies, policyGroups, setPolicyGroups }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { idp, idpGet } = useApis();

  // load
  useEffect(() => {
    idpGet();
  }, []);

  return (
    <FormContainer>
      <Field.Root>
        <Field.Label>{t("common.username")} :</Field.Label>
        <InputUi
          placeholder={t("common.username")}
          value={authUser.username}
          onChange={(e) => setAuthUser({ ...authUser, username: e.target.value })}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.firstname")} :</Field.Label>
        <InputUi
          placeholder={t("common.firstname")}
          value={authUser.firstname}
          onChange={(e) => setAuthUser({ ...authUser, firstname: e.target.value })}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.lastname")} :</Field.Label>
        <InputUi
          placeholder={t("common.lastname")}
          value={authUser.lastname}
          onChange={(e) => setAuthUser({ ...authUser, lastname: e.target.value })}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.email")} :</Field.Label>
        <InputUi
          placeholder={t("common.email")}
          value={authUser.emails[0]?.address || ""}
          onChange={(e) => {
            const newEmails = [{ address: e.target.value, main: true, confirmed: true }];
            setAuthUser({ ...authUser, emails: newEmails });
          }}
        />
      </Field.Root>
      <CheckboxUi
        checked={authUser.enabled}
        onCheckedChange={(e) => setAuthUser((prev) => ({ ...prev, enabled: e.checked }))}
      >
        {t("common.auth_enabled")}
      </CheckboxUi>
      <Flex justifyContent="space-between">
        <Field.Root width="40%">
          <Field.Label>{t("common.type")} :</Field.Label>
          <NativeSelectUi
            value={authUser.purpose}
            onChange={(e) => setAuthUser({ ...authUser, purpose: e.target.value })}
          >
            {purposes.map((purpose, index) => (
              <option key={index} value={purpose.value}>
                {purpose.label}
              </option>
            ))}
          </NativeSelectUi>
        </Field.Root>
        <Field.Root width="40%">
          <Field.Label>{t("common.auth_method")} :</Field.Label>
          <NativeSelectUi
            value={authUser.authentication_method}
            onChange={(e) => setAuthUser({ ...authUser, authentication_method: e.target.value })}
          >
            {idp.items &&
              idp.items.map((method, index) => (
                <option key={index} value={method}>
                  {method}
                </option>
              ))}
          </NativeSelectUi>
        </Field.Root>
      </Flex>
      <PolicyForm policies={policies} setPolicies={setPolicies} />
      <PolicyGroupForm policyGroups={policyGroups} setPolicyGroups={setPolicyGroups} />
    </FormContainer>
  );
};

export default AuthUserForm;
