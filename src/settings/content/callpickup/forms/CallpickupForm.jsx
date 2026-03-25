import { useEffect } from "react";
import { Field } from "@chakra-ui/react";
import { InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import CallpickupGroupsForm from "./CallpickupGroupsForm";
import GroupMembersForm from "../../../helpers/forms/GroupMembersForm";
import FormContainer from "../../../templates/forms/FormContainer";

const CallpickupForm = ({callpickup, setCallpickup, interceptorsGroups, setInterceptorsGroups, interceptorsUsers, setInterceptorsUsers, targetsGroups, setTargetsGroups, targetsUsers, setTargetsUsers }) => {
  // requirements
  const { t } = useTranslation("admin");

  // interceptorsGroups
  useEffect(() => {
    setCallpickup((prev) => ({
      ...prev,
      interceptors: {
        ...prev.interceptors,
        groups: interceptorsGroups,
        users: prev.interceptors.users ? [...prev.interceptors.users] : [],
      },
    }));
  }, [interceptorsGroups]);

  // interceptorsUsers
  useEffect(() => {
    setCallpickup((prev) => ({
      ...prev,
      interceptors: {
        ...prev.interceptors,
        groups: prev.interceptors.groups ? [...prev.interceptors.groups] : [],
        users: interceptorsUsers,
      },
    }));
  }, [interceptorsUsers]);

  // targetsGroups
  useEffect(() => {
    setCallpickup((prev) => ({
      ...prev,
      targets: {
        ...prev.targets,
        groups: targetsGroups,
        users: prev.targets.users ? [...prev.targets.users] : [],
      },
    }));
  }, [targetsGroups]);

  // targetsUsers
  useEffect(() => {
    setCallpickup((prev) => ({
      ...prev,
      targets: {
        ...prev.targets,
        groups: prev.targets.groups ? [...prev.targets.groups] : [],
        users: targetsUsers,
      },
    }));
  }, [targetsUsers]);

  return (
    <FormContainer>
      <Field.Root>
        <Field.Label>{t("common.name")} :</Field.Label>
        <InputUi
          required
          placeholder={t("common.name")}
          value={callpickup.name}
          onChange={(e) => setCallpickup({ ...callpickup, name: e.target.value })}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.description")} :</Field.Label>
        <InputUi
          required
          placeholder={t("common.description")}
          value={callpickup.description}
          onChange={(e) => setCallpickup({ ...callpickup, description: e.target.value })}
        />
      </Field.Root>
      <CallpickupGroupsForm
        label={t("callpickups.interceptors_group")}
        groups={interceptorsGroups}
        setGroups={setInterceptorsGroups}
      />
      <GroupMembersForm
        label={t("callpickups.interceptors")}
        groupMembers={interceptorsUsers}
        setGroupMembers={setInterceptorsUsers}
      />
      <CallpickupGroupsForm label={t("callpickups.targets_group")} groups={targetsGroups} setGroups={setTargetsGroups} />
      <GroupMembersForm label={t("callpickups.targets")} groupMembers={targetsUsers} setGroupMembers={setTargetsUsers} />
    </FormContainer>
  );
};

export default CallpickupForm;
