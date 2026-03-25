import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplatePage from "../../../templates/TemplatePage";
import CallpickupForm from "../forms/CallpickupForm";

const CallpickupEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { callpickupSelected, callpickupUpdate, groupsAll } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [callpickup, setCallpickup] = useState(() => {
    const interceptorsGroups = {
      groups: callpickupSelected.interceptors.groups.map((group) => ({
        ...group,
        label: groupsAll.items.find((item) => item.id === group.id).label,
        value: group.id,
      })),
    };
    const interceptorsUsers = {
      users: callpickupSelected.interceptors.users.map((user) => ({
        ...user,
        label: `${user.firstname} ${user.lastname}`,
      })),
    };
    const targetsGroups = {
      groups: callpickupSelected.targets.groups.map((group) => ({
        ...group,
        label: groupsAll.items.find((item) => item.id === group.id).label,
        value: group.id,
      })),
    };
    const targetsUsers = {
      users: callpickupSelected.targets.users.map((user) => ({
        ...user,
        label: `${user.firstname} ${user.lastname}`,
      })),
    };
    return {
      ...callpickupSelected,
      interceptors: {
        groups: interceptorsGroups.groups,
        users: interceptorsUsers.users,
      },
      targets: {
        groups: targetsGroups.groups,
        users: targetsUsers.users,
      },
    };
  });

  // interceptors group form
  const [interceptorsGroups, setInterceptorsGroups] = useState(callpickup.interceptors.groups);

  // interceptors users form
  const [interceptorsUsers, setInterceptorsUsers] = useState(callpickup.interceptors.users);

  // targets groups form
  const [targetsGroups, setTargetsGroups] = useState(callpickup.targets.groups);

  // targets users form
  const [targetsUsers, setTargetsUsers] = useState(callpickup.targets.users);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await callpickupUpdate(callpickup);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("callpickups");
    }
  };

  return (
    <TemplatePage
      title={t("callpickups.edit.title", { name: callpickupSelected.name })}
      setSelectedComponent={setSelectedComponent}
      route={"callpickups"}
      submit={submit}
      isEdit
      errors={errors}
      loading={loading}
    >
      <CallpickupForm
        callpickup={callpickup}
        setCallpickup={setCallpickup}
        interceptorsGroups={interceptorsGroups}
        setInterceptorsGroups={setInterceptorsGroups}
        interceptorsUsers={interceptorsUsers}
        setInterceptorsUsers={setInterceptorsUsers}
        targetsGroups={targetsGroups}
        setTargetsGroups={setTargetsGroups}
        targetsUsers={targetsUsers}
        setTargetsUsers={setTargetsUsers}
      />
    </TemplatePage>
  );
};

export default CallpickupEdit;
