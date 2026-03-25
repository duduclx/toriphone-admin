import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";
import AgentForm from "../forms/AgentForm";

const AgentEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { agentSelected, agentUpdate } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [agent, setAgent] = useState(() => {
    const user = agentSelected.users.length > 0 ? agentSelected.users[0] : null;
    const updatedUser = user
      ? {
          ...user,
          label: `${user.firstname} ${user.lastname}`,
          name: `${user.firstname} ${user.lastname}`,
        }
      : null;

    return {
      description: agentSelected.description,
      firstname: agentSelected.firstname,
      id: agentSelected.id,
      language: agentSelected.language,
      lastname: agentSelected.lastname,
      number: agentSelected.number,
      password: agentSelected.password,
      preprocess_subroutine: agentSelected.preprocess_subroutine,
      queues: agentSelected.queues,
      skills: agentSelected.skills,
      tenant_uuid: agentSelected.tenant_uuid,
      users: updatedUser || null,
    };
  });

  // agent user form
  const [user, setUser] = useState(agent.users);
  useEffect(() => {
    if (user) {
      const names = user.name.split(/\s+/);
      const firstName = names[0];
      const lastName = names.slice(1).join(" ");
      setAgent((prev) => ({
        ...prev,
        users: user,
        //firstname: firstName,
        //lastname: lastName,
        number: user.number,
      }));
    }
  }, [user]);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await agentUpdate(agent, agentSelected);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("agents");
    }
  };

  return (
    <TemplatePage
      title={t("agents.edit.title", { name: agentSelected.firstname + " " + agentSelected.lastname })}
      setSelectedComponent={setSelectedComponent}
      route={"agents"}
      submit={submit}
      isEdit
      errors={errors}
      loading={loading}
    >
      <AgentForm agent={agent} setAgent={setAgent} user={user} setUser={setUser}/>
    </TemplatePage>
  );
};

export default AgentEdit;
