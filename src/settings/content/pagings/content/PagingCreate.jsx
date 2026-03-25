import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";
import PagingForm from "../forms/PagingForm";

const PagingCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { t: tErrors} = useTranslation("errors");

  // api
  const { pagingCreate } = useApis();

  // errors
  const [errors, setErrors] = useState(null);
  const [error, setError] = useState({});

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [paging, setpaging] = useState({
    callers: {
      users: null,
    },
    members: {
      users: null,
    },
  });

  // members
  const [members, setMembers] = useState([]);

  // callers
  const [callers, setCallers] = useState([]);

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

    const res = await pagingCreate(paging);
    if (res.error) {
      setLoading(false);
      setErrors({title: res.status, description: res.message});
    } else {
      setLoading(false);
      setSelectedComponent("pagings");
    }
  };

  return (
    <TemplatePage
      title={t("pagings.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"pagings"}
      submit={submit}
      isCreate
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

export default PagingCreate;
