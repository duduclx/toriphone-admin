import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";
import PagingForm from "../forms/PagingForm";

const PagingEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { t: tErrors } = useTranslation("errors");

  // api
  const { pagingSelected, pagingUpdate } = useApis();

  // errors
  const [errors, setErrors] = useState(null);
  const [error, setError] = useState({});

  // load
  const [loading, setLoading] = useState(false);

  // paging
  const [paging, setpaging] = useState(() => {
    const updatedMembers = {
      ...pagingSelected.members,
      users: pagingSelected.members.users.map((user) => ({
        ...user,
        label: `${user.firstname} ${user.lastname}`,
      })),
    };

    const updatedCallers = {
      ...pagingSelected.callers,
      users: pagingSelected.callers.users.map((user) => ({
        ...user,
        label: `${user.firstname} ${user.lastname}`,
      })),
    };

    return {
      ...pagingSelected,
      members: updatedMembers,
      callers: updatedCallers,
      announce_sound_helper: pagingSelected.announce_sound ? { label: pagingSelected.announce_sound, value: pagingSelected.announce_sound} : null
    };
  });

  // members
  const [members, setMembers] = useState(paging.members.users);

  // callers
  const [callers, setCallers] = useState(paging.callers.users);

  // submit
  const submit = async () => {
    setError({});
    setErrors(null);
    setLoading(true);
    const validationErrors = {};

    if (!paging.name) {
      validationErrors.name = tErrors("requiredName");
      setLoading(false);
      setError(validationErrors);
      return;
    }

    if (!paging.number) {
      validationErrors.number = tErrors("requiredNumber");
      setLoading(false);
      setError(validationErrors);
      return;
    }

    const res = await pagingUpdate(paging);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("pagings");
    }
  };

  return (
    <TemplatePage
      title={t("pagings.edit.title", { name: pagingSelected.name })}
      setSelectedComponent={setSelectedComponent}
      route={"pagings"}
      submit={submit}
      isEdit
      errors={errors}
      loading={loading}
    >
      <PagingForm
        paging={paging}
        setpaging={setpaging}
        members={members}
        setMembers={setMembers}
        callers={callers}
        setCallers={setCallers}
        error={error}
      />
    </TemplatePage>
  );
};

export default PagingEdit;
