import { useState } from "react";

export const useUsers = ({ apiClient, Wazo }) => {

  // values
  const [users, setUsers] = useState({});
  const [userCurrent, setUserCurrent] = useState({});

  /**
   * Users Get
   * @returns 
   */
  const usersGet = async () => {
    const res = await apiClient.client.get("confd/1.1/users?recurse=false");
    setUsers(res);
    return res;
  };

  /**
   * Users Page Get
   * @param {*} limit 
   * @param {*} offset 
   * @returns 
   */
  const usersPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const res = await apiClient.client.get(`confd/1.1/users?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setUsers(res);
      return res;
    } else {
      const res = await apiClient.client.get(`confd/1.1/users?recurse=false&limit=${limit}&offset=${offset}`);
      setUsers(res);
      return res;
    }
  }

  /**
   * Users search by name
   * @param {*} inputValue 
   * @param {*} setSearchResult 
   * @returns 
   */
  const usersSearchByName = async (inputValue, setSearchResult) => {
    if (inputValue.trim() === "") {
      setSearchResult([]);
    }

    try {
      const get = await Wazo.dird.search("default", inputValue);
      if (get.length === 0) {
        setSearchResult(["failed"]);
      } else {
        setSearchResult(get);
        return get;
      }
    } catch (error) {
      setSearchResult([]);
    }
  };

  /**
   * User Create
   * @param {*} user 
   * @returns 
   */
  const userCreate = async (user) => {
    const userOptions = {
      auth: {
        email_address: user.email,
        enabled: true,
        firstname: user.firstname,
        lastname: user.lastname,
        password: user.password,
        purpose: "user",
        username: user.email,
      },
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      subscription_type: user.subscription_type,
      call_record_incoming_external_enabled: true,
      call_record_incoming_internal_enabled: true,
      call_record_outgoing_external_enabled: true,
      call_record_outgoing_internal_enabled: true,
      outgoing_caller_id: "default"
    };

    try {
      const res = await apiClient.client.post("confd/1.1/users", userOptions);
      // update users
      setUsers((prevState) => ({
        ...prevState,
        items: [...prevState.items, res]
      }));
      return res;
    } catch (e) {
      return e;
    }
  };

  /**
   * User Update
   * @param {*} user 
   * @returns 
   */
  const userUpdate = async (user) => {
    const userId = user.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/users/${userId}`, user);
      return res;
    } catch (e) {
      return e;
    }
  }

  /**
   * User Delete
   * @param {*} user 
   * @returns 
   */
  const userDelete = async (user) => {
    const userId = user.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/users/${userId}?recursive=false`);
      return res;
    } catch (e) {
      return e;
    }
  };

  /**
   * User Delete Recursive
   * @param {*} user 
   * @returns 
   */
  const userDeleteRecursive = async (user) => {
    const userId = user.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/users/${userId}?recursive=true`);
      return res;
    } catch (e) {
      return e;
    }
  };

  /**
   * User Get
   * @param {*} user 
   * @returns 
   */
  const userGet = async (user) => {
    const userId = user.uuid ? user.uuid : user.id;
    try {
      const res = await apiClient.client.get(`confd/1.1/users/${userId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const userAgentAssociate = async (user, agent) => {
    const userId = user.id ? user.id : user.uuid;
    const agentId = agent.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/users/${userId}/agents/${agentId}`);
      return res;
    } catch (e) {
      return e;
    }
  }

  const userAgentDissociate = async (user) => {
    const userId = user.id ? user.id : user.uuid;
    try {
      const res = await apiClient.client.delete(`confd/1.1/users/${userId}/agents`);
      return res;
    } catch (e) {
      return e;
    }
  }

  const userCalleridsOutgoingGet = async (user) => {
    const userId = user.id;
    try {
      const res = await apiClient.client.get(`confd/1.1/users/${userId}/callerids/outgoing`);
      return res;
    } catch (e) {
      return e;
    }
  }

  const userCallpermissionsAssociate = async (user, callpermission) => {
    const userId = user.id;
    const callpermissionId = callpermission.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/users/${userId}/callpermissions/${callpermissionId}`);
      return res;
    } catch (e) {
      return e;
    }
  }

  const userCallpermissionsDissociate = async (user, callpermission) => {
    const userId = user.id;
    const callpermissionId = callpermission.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/users/${userId}/callpermissions/${callpermissionId}`);
      return res;
    } catch (e) {
      return e;
    }
  }

  const userFallbacksGet = async (user) => {
    const userId = user.id;
    try {
      const res = await apiClient.client.get(`confd/1.1/users/${userId}/fallbacks`);
      return res;
    } catch (e) {
      return e;
    }
  }

  const userFallbacksUpdate = async (user, fallbacks) => {
    const userId = user.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/users/${userId}/fallbacks`, fallbacks);
      return res;
    } catch (e) {
      return e;
    }
  }

  const userForwardsGet = async (user) => {
    const userId = user.id;
    try {
      const res = await apiClient.client.get(`confd/1.1/users/${userId}/forwards`);
      return res;
    } catch (e) {
      return e;
    }
  }

  const userForwardsUpdate = async (user, forwards) => {
    const userId = user.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/users/${userId}/forwards`, forwards);
      return res;
    } catch (e) {
      return e;
    }
  }

  const userForwardGet = async (user, forwardName) => {
    const userId = user.id;
    try {
      const res = await apiClient.client.get(`confd/1.1/users/${userId}/forwards/${forwardName}`);
      return res;
    } catch (e) {
      return e;
    }
  }

  const userForwardUpdate = async (user, forwardName, forwards) => {
    const userId = user.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/users/${userId}/forwards/${forwardName}`, forwards);
      return res;
    } catch (e) {
      return e;
    }
  }

  const userFunckeysGet = async (user) => {
    const userId = user.id;
    try {
      const res = await apiClient.client.get(`confd/1.1/users/${userId}/funckeys`);
      return res;
    } catch (e) {
      return e;
    }
  }

  const userFunckeysUpdate = async (user, funckeys) => {
    const userId = user.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/users/${userId}/funckeys`, funckeys);
      return res;
    } catch (e) {
      return e;
    }
  }

  const userFunckeyGet = async (user, position) => {
    const userId = user.id;
    try {
      const res = await apiClient.client.get(`confd/1.1/users/${userId}/funckeys/${position}`);
      return res;
    } catch (e) {
      return e;
    }
  }

  const userFunckeyCreate = async (user, position, funckey) => {
    const userId = user.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/users/${userId}/funckeys/${position}`, funckey);
      return res;
    } catch (e) {
      return e;
    }
  }

  const userFunckeyDelete = async (user, position) => {
    const userId = user.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/users/${userId}/funckeys/${position}`);
      return res;
    } catch (e) {
      return e;
    }
  }

  const userFunckeysTemplatesGet = async (user) => {
    const userId = user.id;
    try {
      const res = await apiClient.client.get(`confd/1.1/users/${userId}/funckeys/templates`);
      return res;
    } catch (e) {
      return e;
    }
  }

  const userFunckeysTemplatesAssociate = async (user, template) => {
    const userId = user.id;
    const templateId = template.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/users/${userId}/funckeys/templates/${templateId}`);
      return res;
    } catch (e) {
      return e;
    }
  }

  const userFunckeysTemplatesDissociate = async (user, template) => {
    const userId = user.id
    const templateId = template.id
    try {
      const res = await apiClient.client.delete(`confd/1.1/users/${userId}/funckeys/templates/${templateId}`)
      return res;
    } catch (e) {
      return e
    }
  }

  const userGroupsUpdate = async (user, groups) => {
    const userId = user.id
    try {
      const res = await apiClient.client.put(`confd/1.1/users/${userId}/groups`, groups)
      return res;
    } catch (e) {
      return e
    }
  }

  const userLinesAssociate = async (user, lines) => {
    const userId = user.id
    try {
      const res = await apiClient.client.put(`confd/1.1/users/${userId}/lines`, lines)
      return res;
    } catch (e) {
      return e
    }
  }

  const userLineAssociate = async (user, line) => {
    const userId = user.id
    const lineId = line.id
    try {
      const res = await apiClient.client.put(`confd/1.1/users/${userId}/lines/${lineId}`)
      return res;
    } catch (e) {
      return e
    }
  }

  const userLineDissociate = async (user, line) => {
    const userId = user.id
    const lineId = line.id
    try {
      const res = await apiClient.client.delete(`confd/1.1/users/${userId}/lines/${lineId}`)
      return res;
    } catch (e) {
      return e
    }
  }

  const userScheduleAssociate = async (user, schedule) => {
    const userId = user.id
    const scheduleId = schedule.id
    try {
      const res = await apiClient.client.put(`confd/1.1/users/${userId}/schedules/${scheduleId}`)
      return res;
    } catch (e) {
      return e
    }
  }

  const userScheduleDissociate = async (user, schedule) => {
    const userId = user.id
    const scheduleId = schedule.id
    try {
      const res = await apiClient.client.delete(`confd/1.1/users/${userId}/schedules/${scheduleId}`)
      return res;
    } catch (e) {
      return e
    }
  }

  const userServicesGet = async (user) => {
    const userId = user.id
    try {
      const res = await apiClient.client.get(`confd/1.1/users/${userId}/services`)
      return res;
    } catch (e) {
      return e
    }
  }

  const userServicesUpdate = async (user, services) => {
    const userId = user.id
    try {
      const res = await apiClient.client.put(`confd/1.1/users/${userId}/services`, services)
      return res;
    } catch (e) {
      return e
    }
  }

  const userServiceGet = async (user, serviceName) => {
    const userId = user.id
    try {
      const res = await apiClient.client.get(`confd/1.1/users/${userId}/services/${serviceName}`)
      return res;
    } catch (e) {
      return e
    }
  }

  const userServiceUpdate = async (user, serviceName, enabled) => {
    const userId = user.id
    try {
      const res = await apiClient.client.put(`confd/1.1/users/${userId}/services/${serviceName}`, enabled)
      return res;
    } catch (e) {
      return e
    }
  }

  const userVoicemailGet = async (user) => {
    const userId = user.id
    try {
      const res = await apiClient.client.get(`confd/1.1/users/${userId}/voicemails`)
      return res
    } catch (e) {
      return e
    }
  }

  const userVoicemailAdd = async (user, voicemail) => {
    const userId = user.id
    try {
      const res = await apiClient.client.post(`confd/1.1/users/${userId}/voicemails`, voicemail)
      return res;
    } catch (e) {
      return e
    }
  } 

  const userVoicemailAssociate = async (user, voicemail) => {
    const userId = user.uuid
    const voicemailId = voicemail.id
    try {
      const res = await apiClient.client.put(`confd/1.1/users/${userId}/voicemails/${voicemailId}`)
      return res
    } catch (e) {
      return e
    }
  }

  const userVoicemailDissociate = async (user) => {
    const userId = user.uuid
    try {
      const res = await apiClient.client.delete(`confd/1.1/users/${userId}/voicemails`);
      return res;
    } catch (e) {
      return e;
    }
  }

  const userCreateVoicemail = async (user, line) => {
    const userId = user.id

    const voicemailOptions = {
      ask_password: false,
      attach_audio: false,
      context: line.extensions[0].context,
      delete_messages: false,
      email: user.email,
      enabled: true,
      language: "fr_FR",
      number: line.extensions[0].exten,
      tenant_uuid: user.tenant_uuid,
      timezone: "eu-fr",
      name: user.firstname + " " + user.lastname,
      users: [
        {
          firstname: user.firstname,
          lastname: user.lastname,
          uuid: user.uuid,
        },
      ]
    }

    try {
      const res = await apiClient.client.post(`confd/1.1/users/${userId}/voicemails`, voicemailOptions)
      return res;
    } catch (e) {
      return e
    }
  };

  const userExternalAppsGet = async (user) => {
    const userUuid = user.uuid
    try {
      const res = await apiClient.client.get(`confd/1.1/users/${userUuid}/external/apps`)
      return res
    } catch (e) {
      return e
    }
  }

  const userExternalAppGet = async (user, app) => {
    const userUuid = user.uuid
    const appname = app.name
    try {
      const res = await apiClient.client.get(`confd/1.1/users/${userUuid}/external/apps/${appname}`)
      return res
    } catch (e) {
      return e
    }
  }

  const userExternalAppCreate = async (user, app) => {
    const userUuid = user.uuid
    const appname = app.name
    try {
      const res = await apiClient.client.post(`confd/1.1/users/${userUuid}/external/apps/${appname}`, app)
      return res
    } catch (e) {
      return e
    }
  }

  const userExternalAppUpdate = async (user, app) => {
    const userUuid = user.uuid
    const appname = app.name
    try {
      const res = await apiClient.client.put(`confd/1.1/users/${userUuid}/external/apps/${appname}`, app)
      return res
    } catch (e) {
      return e
    }
  }

  const userExternalAppDelete = async (user, app) => {
    const userUuid = user.uuid
    const appname = app.name
    try {
      const res = await apiClient.client.delete(`confd/1.1/users/${userUuid}/external/apps/${appname}`)
      return res
    } catch (e) {
      return e
    }
  }

  const userLineGet = async (user, line) => {
    const userUuid = user.uuid
    const lineId = line.id
    try {
      const res = await apiClient.client.get(`confd/1.1/users/${userUuid}/lines/${lineId}/associated/endpoint/sip`)
      return res
    } catch (e) {
      return e
    }
  }

  const userLineMainGet = async (user) => {
    const userUuid = user.uuid
    try {
      const res = await apiClient.client.get(`confd/1.1/users/${userUuid}/lines/main/associated/endpoint/sip`)
      return res
    } catch (e) {
      return e
    }
  }

  const usersExport = async () => {
    try {
      const res = await apiClient.client.get(`confd/1.1/users/export`)
      return res
    } catch (e) {
      return e
    }
  }

  const usersImport = async (usersCsv) => {
    try {
      const res = await apiClient.client.post(`confd/1.1/users/import`, usersCsv)
      return res
    } catch (e) {
      return e
    }
  }

  const usersSubscriptionsGet = async () => {
    try {
      const res = await apiClient.client.get(`confd/1.1/users/subscriptions`)
      return res
    } catch (e) {
      return e
    }
  }

  return {
    users,
    setUsers,
    usersGet,
    usersPageGet,
    usersSearchByName,
    userCurrent,
    setUserCurrent,
    userGet,
    userCreate,
    userUpdate,
    userDelete,
    userDeleteRecursive,
    userAgentAssociate,
    userAgentDissociate,
    userCalleridsOutgoingGet,
    userCallpermissionsAssociate,
    userCallpermissionsDissociate,
    userFallbacksGet,
    userFallbacksUpdate,
    userForwardsGet,
    userForwardsUpdate,
    userForwardGet,
    userForwardUpdate,
    userFunckeysGet,
    userFunckeysUpdate,
    userFunckeyGet,
    userFunckeyCreate,
    userFunckeyDelete,
    userFunckeysTemplatesGet,
    userFunckeysTemplatesAssociate,
    userFunckeysTemplatesDissociate,
    userGroupsUpdate,
    userLinesAssociate,
    userLineAssociate,
    userLineDissociate,
    userScheduleAssociate,
    userScheduleDissociate,
    userServicesGet,
    userServicesUpdate,
    userServiceGet,
    userServiceUpdate,
    userVoicemailGet,
    userVoicemailAdd,
    userVoicemailAssociate,
    userVoicemailDissociate,
    userCreateVoicemail,
    userExternalAppsGet,
    userExternalAppGet,
    userExternalAppCreate,
    userExternalAppUpdate,
    userExternalAppDelete,
    userLineGet,
    userLineMainGet,
    usersExport,
    usersImport,
    usersSubscriptionsGet
  };
};
