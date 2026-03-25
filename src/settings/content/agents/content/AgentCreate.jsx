import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";
import AgentForm from "../forms/AgentForm";

const AgentCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { agentCreate } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [agent, setAgent] = useState({
    firstname: "",
    lastname: "",
    description: "",
    number: "",
    users: "",
  });

  // user form
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (user) {
      const names = user.name.split(/\s+/);
      const firstName = names[0];
      const lastName = names.slice(1).join(" ");
      setAgent((prev) => ({
        ...prev,
        users: user,
        firstname: firstName,
        lastname: lastName,
        number: user.number,
      }));
    }
  }, [user]);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await agentCreate(agent);
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
      title={t("agents.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"agents"}
      submit={submit}
      isCreate
      errors={errors}
      loading={loading}
    >
      <AgentForm agent={agent} setAgent={setAgent} user={user} setUser={setUser}/>
    </TemplatePage>
  );
};

export default AgentCreate;
