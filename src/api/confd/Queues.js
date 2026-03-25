import { useState } from "react";
import { useExtensions } from "./Extensions";

export const useQueues = ({ apiClient }) => {
  
  // dependencies
  const { extensionCreate, extensionDelete } = useExtensions({ apiClient });

  // values
  const [queuesAll, setQueuesAll] = useState({});
  const [queues, setQueues] = useState({});
  const [queueSelected, setQueueSelected] = useState({});
  const [queuesSkills, setQueuesSkills] = useState({});
  const [queueSkillSelected, setQueueSkillSelected] = useState({})

  // functions
  const queuesGet = async () => {
    const res = await apiClient.client.get("confd/1.1/queues?recurse=false");
    setQueuesAll(res);
    return res;
  };

  const queuesPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const res = await apiClient.client.get(`confd/1.1/queues?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setQueues(res);
      return res;
    } else {
      const res = await apiClient.client.get(`confd/1.1/queues?recurse=false&limit=${limit}&offset=${offset}`);
      setQueues(res);
      return res;
    }
  }

  const queueAdd = async (queue) => {
    try {
        const res = await apiClient.client.post("confd/1.1/queues", queue);
        return res;
    } catch (e) {
        return e
    }
  };

  const queueCreate = async (queue, line) => {
    const createdQueue = await queueAdd(queue);
    if (createdQueue.error) {
      return createdQueue
    }
    const createdLine = await extensionCreate(line);
    if (createdLine.error) {
      return createdLine
    }
    const queueWithLine = await queueExtensionAssociate(createdQueue, createdLine);
    if (queueWithLine.error) {
      return queueWithLine
    }
    if (queue.members?.agents?.length > 0) {
      const asso = await queueMembersAgentsAssociate(createdQueue, queue.members.agents);
      if (asso.error) {
        return asso
      }
    }
    if (queue.members?.users?.length > 0) {
      const asso = await queueMembersUsersAssociate(createdQueue, queue.members.users);
      if (asso.error) {
        return asso
      }
    }
    if (queue.schedule) {
      const asso = queueSchedulesAssociate(createdQueue, queue.schedule);
      if (asso.error) {
        return asso
      }
    }
    return queueWithLine;
  };

  const queueEdit = async (queue) => {
    const queueId = queue.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/queues/${queueId}`, queue);
      return res
    } catch (e) {
      return e
    }
  };

  const queueUpdate = async (queue, line, fallbacks, queueSelected) => {
    // queue is the updated queue
    // line is the new line, aka extension
    // fallbacks have no previous state
    // queueSelected is the previous state of the queue (before editing)
    const updatedQueue = await queueEdit(queue);
    if (updatedQueue.error) {
      return updatedQueue
    }
    // extension
    if (line.exten !== queue.extensions[0].exten) {
      // dissocier l'existante
      const diss = await queueExtensionDissociate(queue);
      /*
      if (diss.error) {
        return diss
      }
        */
      // supprimer l'ancienne extension
      const remove = await extensionDelete(queue.extensions[0]);
      /*
      if (remove.error) {
        return remove
      }
        */
      // créer la ligne et l'associer
      const createdLine = await extensionCreate(line);
      /*
      if (createdLine.error) {
        return createdLine
      }
        */
      const groupWithLine = await queueExtensionAssociate(queue, createdLine);
      /*
      if (groupWithLine.error) {
        return groupWithLine
      }
        */
    }
    // members users
    const users = await updateQueueUsers(queue, queueSelected);
    /*
    if (users.error) {
      return users
    }
      */

    // members agents
    const agents = await updateQueueAgents(queue, queueSelected);
    /*
    if (agents.error) {
      return agents
    }
      */

    // fallbacks
    const falls = await queueFallbacksUpdate(queue, fallbacks);
    /*
    if (falls.error) {
      return falls
    }
      */

    // schedule
    if (queue.schedule && queueSelected.schedules[0]) {
      // Si les IDs des schedules sont différents, effectuer les opérations de dissociation et d'association
      if (queue.schedule.id !== queueSelected.schedules[0].id) {
        const diss = await queueSchedulesDissociate(queue, queueSelected.schedules[0]);
        /*
        if (diss.error) {
          return diss
        }
          */
        const asso = await queueSchedulesAssociate(queue, queue.schedule);
        /*
        if (asso.error) {
          return asso
        }
          */
      }
    } else if (queue.schedule && !queueSelected.schedules[0]) {
      // Si seulement newGroup a un schedule, associer ce schedule
      const asso = await queueSchedulesAssociate(queue, queue.schedule);
      /*
      if (asso.error) {
        return asso
      }
        */
    } else if (!queue.schedule && queueSelected.schedules[0]) {
      // Si seulement queueSelected a un schedule, dissocier ce schedule
      const diss = await queueSchedulesDissociate(queue, queueSelected.schedules[0]);
      /*
      if (diss.error) {
        return diss
      }
        */
    }

    return updatedQueue;
  };

  const queueDelete = async (queue) => {
    const queueId = queue.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/queues/${queueId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const queueExtensionAssociate = async (queue, extension) => {
    const queueId = queue.id;
    const extensionId = extension.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/queues/${queueId}/extensions/${extensionId}`);
      return res
    } catch (e) {
      return e
    }
  };

  const queueExtensionDissociate = async (queue) => {
    const queueId = queue.id;
    const extensionId = queue.extensions[0].id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/queues/${queueId}/extensions/${extensionId}`);
      return res
    } catch (e) {
      return e;
    }
  };

  const queueFallbacksGet = async (queue) => {
    const queueId = queue.id;
    try {
        const res = await apiClient.client.get(`confd/1.1/queues/${queueId}/fallbacks`);
        return res;
    } catch (e) {
        return e
    }
  };

  const queueFallbacksUpdate = async (queue, fallbacks) => {
    const queueId = queue.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/queues/${queueId}/fallbacks`, fallbacks);
      return res
    } catch (e) {
      return e
    }
  };

  const queueMembersAgentAssociate = async (queue, agent) => {
    const queueId = queue.id;
    const agentId = agent.id;
    const options = {
      penalty: 0,
      priority: 0,
    };
    try {
      const res = await apiClient.client.put(`confd/1.1/queues/${queueId}/members/agents/${agentId}`, options);
      return res
    } catch (e) {
      return e
    }
  };

  const queueMembersAgentDissociate = async (queue, agent) => {
    const queueId = queue.id;
    const agentId = agent.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/queues/${queueId}/members/agents/${agentId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const queueMembersAgentsAssociate = async (queue, agents) => {
    const queueId = queue.id;
    const options = {
      penalty: 0,
      priority: 0,
    };
    for (const agent of agents) {
      const agentId = agent.id;
      try {
        const res = await apiClient.client.put(`confd/1.1/queues/${queueId}/members/agents/${agentId}`, options);
      } catch (e) {
        return e
      }
    }
  };

  const queueMembersAgentsDissociate = async (queue, agents) => {
    const queueId = queue.id;
    for (const agent of agents) {
      const agentId = agent.id;
      try {
        const res = await apiClient.client.delete(`confd/1.1/queues/${queueId}/members/agents/${agentId}`);
        return res;
      } catch (e) {
        return e;
      }
    }
  };

  const queueMembersUserAssociate = async (queue, user) => {
    const queueId = queue.id;
    const userId = user.id;
    const priority = {
      priority: 0,
    };
    try {
      const res = await apiClient.client.put(`confd/1.1/queues/${queueId}/members/users/${userId}`, priority);
      return res
    } catch (e) {
    return e
    }
  };

  const queueMembersUserDissociate = async (queue, user) => {
    const queueId = queue.id;
    const userId = user.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/queues/${queueId}/members/users/${userId}`);
      return res;
    } catch (e) {
      return e
    }
  };

  const queueMembersUsersAssociate = async (queue, users) => {
    const queueId = queue.id;
    const priority = {
      priority: 0,
    };
    for (const user of users) {
      const userId = user.id;
      try {
        const res = await apiClient.client.put(`confd/1.1/queues/${queueId}/members/users/${userId}`, priority);
      } catch (e) {
        return e
      }
    }
    return true;
  };

  const queueMembersUsersDissociate = async (queue, users) => {
    const queueId = queue.id;
    for (const user of users) {
      const userId = user.id;
      try {
        const res = await apiClient.client.delete(`confd/1.1/queues/${queueId}/members/users/${userId}`);
        return res;
      } catch (e) {
    return e
      }
    }
    return true;
  };

  const queueSchedulesAssociate = async (queue, schedule) => {
    const queueId = queue.id;
    const scheduleId = schedule.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/queues/${queueId}/schedules/${scheduleId}`);
    } catch (e) {
      return e;
    }
  };

  const queueSchedulesDissociate = async (queue, schedule) => {
    const queueId = queue.id;
    const scheduleId = schedule.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/queues/${queueId}/schedules/${scheduleId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const queuesSkillrulesGet = async () => {
    const res = await apiClient.client.get("confd/1.1/queues/skillrules?recurse=false");
    setQueuesSkills(res);
    return res;
  };

  const queuesSkillrulesPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const res = await apiClient.client.get(`confd/1.1/queues/skillrules?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setQueuesSkills(res);
      return res;
    } else {
      const res = await apiClient.client.get(`confd/1.1/queues/skillrules?recurse=false&limit=${limit}&offset=${offset}`);
      setQueuesSkills(res);
      return res;
    }
  }

  const queuesSkillruleAdd = async (skill) => {
    try {
        const res = await apiClient.client.post("confd/1.1/queues/skillrules", skill);
        return res;
    } catch (e) {
        return e
    }
  };

  const queuesSkillruleDelete = async (skill) => {
    const skillId = skill.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/queues/skillrules/${skillId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const queuesSkillruleUpdate = async (skill) => {
    const skillId = skill.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/queues/skillrules/${skillId}`, skill);
      return res
    } catch (e) {
      return e;
    }
  };

  const updateQueueUsers = async (queue, queueSelected) => {
    const queueUsers = queue.members.users;
    const selectedQueueUsers = queueSelected.members.users;

    // Convert to sets for easier comparison
    const queueUserIds = new Set(queueUsers.map((user) => user.id));
    const selectedQueueUserIds = new Set(selectedQueueUsers.map((user) => user.id));

    // Users to dissociate (present in selectedQueueUsers but not in queueUsers)
    const usersToDissociate = selectedQueueUsers.filter((user) => !queueUserIds.has(user.id));

    // Users to associate (present in queueUsers but not in selectedQueueUsers)
    const usersToAssociate = queueUsers.filter((user) => !selectedQueueUserIds.has(user.id));

    // Perform dissociation
    for (const user of usersToDissociate) {
      const diss = await queueMembersUserDissociate(queue, user);
      if (diss.error) {
        return diss
      }
    }

    // Perform association
    for (const user of usersToAssociate) {
      const asso = await queueMembersUserAssociate(queue, user);
      if (asso.error) {
        return asso
      }
    }
  };

  // compare agents and associate or dissociate
  const updateQueueAgents = async (queue, queueSelected) => {
    const queueAgents = queue.members.agents;
    const selectedQueueAgents = queueSelected.members.agents;

    // Convert to sets for easier comparison
    const queueAgentIds = new Set(queueAgents.map((agent) => agent.id));
    const selectedQueueAgentIds = new Set(selectedQueueAgents.map((agent) => agent.id));

    // Agents to dissociate (present in selectedQueueAgents but not in queueAgents)
    const agentsToDissociate = selectedQueueAgents.filter((agent) => !queueAgentIds.has(agent.id));

    // Agents to associate (present in queueAgents but not in selectedQueueAgents)
    const agentsToAssociate = queueAgents.filter((agent) => !selectedQueueAgentIds.has(agent.id));

    // Perform dissociation
    for (const agent of agentsToDissociate) {
      const diss = await queueMembersAgentDissociate(queue, agent);
      if (diss.error) {
        return diss
      }
    }

    // Perform association
    for (const agent of agentsToAssociate) {
      const asso = await queueMembersAgentAssociate(queue, agent);
      if (asso.error) {
        return asso
      }
    }
  };

  return {
    queuesAll,
    setQueuesAll,
    queues,
    setQueues,
    queueSelected,
    setQueueSelected,
    queuesSkills,
    setQueuesSkills,
    queueSkillSelected,
    setQueueSkillSelected,
    queuesGet,
    queuesPageGet,
    queueAdd,
    queueCreate,
    queueEdit,
    queueUpdate,
    queueDelete,
    queueExtensionAssociate,
    queueExtensionDissociate,
    queueFallbacksGet,
    queueFallbacksUpdate,
    queueMembersAgentAssociate,
    queueMembersAgentDissociate,
    queueMembersAgentsAssociate,
    queueMembersAgentsDissociate,
    queueMembersUserAssociate,
    queueMembersUserDissociate,
    queueMembersUsersAssociate,
    queueMembersUsersDissociate,
    queueSchedulesAssociate,
    queueSchedulesDissociate,
    queuesSkillrulesGet,
    queuesSkillrulesPageGet,
    queuesSkillruleAdd,
    queuesSkillruleDelete,
    queuesSkillruleUpdate,
  };
};
