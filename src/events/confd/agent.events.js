const agentEvents = ({ apiClient }) => {
    // agent_created
    const OnAgentCreated = async (data) => {
        console.log("agent_created", data);
    }

    // agent_deleted
    const OnAgentDeleted = async (data) => {
        console.log("agent_deleted", data);
    }

    // agent_edited
    const OnAgentEdited = async (data) => {
        console.log("agent_edited", data);
    }

    // agent_skill_associated
    const OnAgentSkillAssociated = async (data) => {
        console.log("agent_skill_associated", data);
    }

    // agent_skill_dissociated
    const OnAgentSkillDissociated = async (data) => {
        console.log("agent_skill_dissociated", data);
    }

  return {
    OnAgentCreated,
    OnAgentDeleted,
    OnAgentEdited,
    OnAgentSkillAssociated,
    OnAgentSkillDissociated
  }
}

export default agentEvents
