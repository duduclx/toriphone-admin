import { Field } from "@chakra-ui/react";
import { InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import GroupMembersForm from "../../../helpers/forms/GroupMembersForm";
import PolicyForm from "../../../helpers/forms/PolicyForm";
import FormContainer from "../../../templates/forms/FormContainer";

const PoliciesGroupForm = ({ authgroup, setAuthgroup, members, setMembers, policies, setPolicies, error }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <FormContainer>
      <Field.Root invalid={!!error}>
        <Field.Label>{t("common.name")} :</Field.Label>
        <InputUi
          required
          placeholder={t("common.name")}
          value={authgroup.name || ""}
          onChange={(e) => setAuthgroup({ ...authgroup, name: e.target.value })}
        />
        <Field.ErrorText >{error}</Field.ErrorText >
      </Field.Root>
      <GroupMembersForm groupMembers={members} setGroupMembers={setMembers} />
      <PolicyForm policies={policies} setPolicies={setPolicies} />
    </FormContainer>
  );
};

export default PoliciesGroupForm;
