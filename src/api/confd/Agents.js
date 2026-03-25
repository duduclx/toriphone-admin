import { useState, useEffect } from "react";
import { useUsers } from "./Users";

export const useAgents = ({ tenantCurrent = {}, apiClient } = {}) => {

  // dependencies
  const { userAgentAssociate, userAgentDissociate } = useUsers({ apiClient });

  useEffect(() => {
    if(tenantCurrent?.uuid) {
      apiClient.client.setTenant(tenantCurrent.uuid)
    }
  }, [tenantCurrent])

  // values
  const [agents, setAgents] = useState({});
  const [agentSelected, setAgentSelected] = useState({});
  const [agentsSkillsAll, setAgentsSkillsAll] = useState({});
  const [agentsSkills, setAgentsSkills] = useState({});
  const [agentsSkillSelected, setAgentsSkillSelected] = useState({});

  // functions
  const agentsGet = async () => {
    const res = await apiClient.client.get("confd/1.1/agents?recurse=false");
    setAgents(res);
    return res;
  };

  const agentsPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const res = await apiClient.client.get(`confd/1.1/agents?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setAgents(res);
      return res;
    } else {
      const res = await apiClient.client.get(`confd/1.1/agents?recurse=false&limit=${limit}&offset=${offset}`);
      setAgents(res);
      return res;
    }
  }

  const agentAdd = async (agent) => {
    try {
      const res = await apiClient.client.post("confd/1.1/agents", agent);
      return res;
    } catch (e) {
      return e;
    }
  };

  const agentCreate = async (agent) => {
    const newAgent = await agentAdd(agent);

    if (agent.users) {
      await userAgentAssociate(agent.users, newAgent);
    }

    for (const skill of agent.skills) {
      await agentSkillAssociate(newAgent, skill, skill);
    }

    return newAgent;
  };

  const agentDelete = async (agent) => {
    const agentId = agent.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/agents/${agentId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const agentRemove = async (agent) => {
    if (agent.users.length > 0) {
      await userAgentDissociate(agent.users[0]);
    }
    const res = await agentDelete(agent);
    return res;
  };

  const agentGet = async (agent) => {
    const agentId = agent.id;
    try {
      const res = await apiClient.client.get(`confd/1.1/agents/${agentId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const agentEdit = async (agent) => {
    const agentId = agent.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/agents/${agentId}`, agent);
      return res;
    } catch (e) {
      return e;
    }
  };

  const agentUpdate = async (agentUpdated, agentSelected) => {
    const agentIsUpdated = await agentEdit(agentUpdated);

    if (agentUpdated.users || (agentSelected.users && agentSelected.users.length > 0)) {
      if (agentUpdated.users && agentSelected.users && agentSelected.users.length > 0) {
        // Both agentUpdated.users and agentSelected.users are defined and not empty
        if (agentUpdated.users.uuid !== agentSelected.users[0]?.uuid) {
          await userAgentDissociate(agentSelected.users[0]);
          await userAgentAssociate(agentUpdated.users, agentUpdated);
        }
      } else if (agentUpdated.users && (!agentSelected.users || agentSelected.users.length === 0)) {
        // agentUpdated.users is defined and agentSelected.users is either undefined or empty
        await userAgentAssociate(agentUpdated.users, agentUpdated);
      } else if (!agentUpdated.users && agentSelected.users && agentSelected.users.length > 0) {
        // agentUpdated.users is not defined but agentSelected.users is defined and not empty
        await userAgentDissociate(agentSelected.users[0]);
      }
    }

    // Gestion des compétences (skills)
    // Condition 1 : Vérification des skills existant dans les deux objets
    for (const updatedSkill of agentUpdated.skills) {
      const matchingSkill = agentSelected.skills.find((s) => s.id === updatedSkill.id);

      if (matchingSkill) {
        // Vérifier si skill_weight a changé
        if (matchingSkill.skill_weight !== updatedSkill.skill_weight) {
          const asso = await agentSkillAssociate(agentUpdated, updatedSkill, updatedSkill);
          if(asso.error) {
            return asso
          }
        }
      } else {
        // Condition 2 : skill présente dans agentUpdated mais pas dans agentSelected
        const asso = await agentSkillAssociate(agentUpdated, updatedSkill, updatedSkill);
        if(asso.error) {
          return asso
        }
      }
    }

    // Condition 3 : Skills présentes dans agentSelected mais pas dans agentUpdated
    for (const selectedSkill of agentSelected.skills) {
      const matchingSkill = agentUpdated.skills.find((s) => s.id === selectedSkill.id);

      if (!matchingSkill) {
        await agentSkillDissociate(agentUpdated, selectedSkill);
      }
    }

    return agentIsUpdated;
  };

  const agentSkillAssociate = async (agent, skill, skillweight) => {
    const agentId = agent.id;
    const skillId = skill.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/agents/${agentId}/skills/${skillId}`, skillweight);
      return res;
    } catch (e) {
      return e;
    }
  };

  const agentSkillDissociate = async (agent, skill) => {
    const agentId = agent.id;
    const skillId = skill.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/agents/${agentId}/skills/${skillId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const agentsSkillsGet = async () => {
    const res = await apiClient.client.get("confd/1.1/agents/skills?recurse=false");
    setAgentsSkillsAll(res);
    return res;
  };

  const agentsSkillsPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const res = await apiClient.client.get(`confd/1.1/agents/skills?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setAgentsSkills(res);
      return res;
    } else {
      const res = await apiClient.client.get(`confd/1.1/agents/skills?recurse=false&limit=${limit}&offset=${offset}`);
      setAgentsSkills(res);
      return res;
    }
  }

  const agentsSkillGet = async (skill) => {
    const skillId = skill.id;
    const res = await apiClient.client.get(`confd/1.1/agents/skills/${skillId}`);
    return res;
  };

  const agentsSkillsCreate = async (skill) => {
    try {
      const res = await apiClient.client.post("confd/1.1/agents/skills", skill);
      return res;
    } catch (e) {
      return e;
    }
  };

  const agentsSkillsUpdate = async (skill) => {
    const skillId = skill.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/agents/skills/${skillId}`, skill);
      return res;
    } catch (e) {
      return e;
    }
  };

  const agentsSkillsDelete = async (skill) => {
    const skillId = skill.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/agents/skills/${skillId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    agents,
    setAgents,
    agentSelected,
    setAgentSelected,
    agentsSkillsAll,
    setAgentsSkillsAll,
    agentsSkills,
    setAgentsSkills,
    agentsSkillSelected,
    setAgentsSkillSelected,
    agentsGet,
    agentsPageGet,
    agentAdd,
    agentCreate,
    agentDelete,
    agentRemove,
    agentGet,
    agentEdit,
    agentUpdate,
    agentSkillAssociate,
    agentSkillDissociate,
    agentsSkillsGet,
    agentsSkillsPageGet,
    agentsSkillGet,
    agentsSkillsCreate,
    agentsSkillsUpdate,
    agentsSkillsDelete,
  };
};
