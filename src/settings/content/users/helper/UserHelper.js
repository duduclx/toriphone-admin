import { useApis } from "../../../../ApiProvider";

import UserHelperLine from "./UserHelperLine";

const UserHelper = () => {
  const { userUpdateLines } = UserHelperLine();
  const {
    userCallpermissionsAssociate,
    userCallpermissionsDissociate,
    userFallbacksUpdate,
    userForwardsUpdate,
    userFunckeysUpdate,
    userFunckeysTemplatesAssociate,
    userFunckeysTemplatesDissociate,
    userGroupsUpdate,
    userScheduleAssociate,
    userScheduleDissociate,
    userServicesUpdate,
    userUpdate,
    userVoicemailAssociate,
    userVoicemailDissociate,
    voicemailEdit
  } = useApis();

  const userHelperUpdate = async (userCurrent, user) => {
    const res = await userUpdate(user);
    await userFallbacksUpdate(user, user.fallbacks);
    await userForwardsUpdate(user, user.forwards);
    await userGroupsUpdate(user, { groups: user.groups });
    await userServicesUpdate(user, user.services);
    await userUpdateCallpermissions(userCurrent, user);
    await userUpdateFunckeys(user)
    await userUpdateFunckeysTemplate(userCurrent, user)
    await userUpdateSchedules(userCurrent, user)
    await userUpdateVoicemail(userCurrent, user)
    await userUpdateLines(userCurrent, user)

    return res
  };

  // callpermissions
  const userUpdateCallpermissions = async (userCurrent, user) => {
    const currentPermissions = new Set(userCurrent.call_permissions?.map((p) => p.id) || []);
    const newPermissions = new Set(user.call_permissions?.map((p) => p.id) || []);

    const permissionsToDissociate = userCurrent.call_permissions?.filter((p) => !newPermissions.has(p.id)) || [];
    const permissionsToAssociate = user.call_permissions?.filter((p) => !currentPermissions.has(p.id)) || [];

    for (let permission of permissionsToDissociate) {
      await userCallpermissionsDissociate(user, permission);
    }

    for (let permission of permissionsToAssociate) {
      await userCallpermissionsAssociate(user, permission);
    }
  };

  // funckeys
  const userUpdateFunckeys = async (user) => {
    const fks = {
      keys: user.funckeys.reduce((acc, funckey) => {
        acc[funckey.position] = funckey;
        return acc;
      }, {}),
    };
    await userFunckeysUpdate(user, fks);
  };

  // funckeys templates
  const userUpdateFunckeysTemplate = async (userCurrent, user) => {
    if (userCurrent.func_key_template_id !== user.func_key_template_id) {
      if (userCurrent.func_key_template_id) {
        await userFunckeysTemplatesDissociate(user, { id: userCurrent.func_key_template_id });
      }
      if (user.func_key_template_id) {
        await userFunckeysTemplatesAssociate(user, { id: user.func_key_template_id });
      }
    }
  };

  // schedules
  const userUpdateSchedules = async (userCurrent, user) => {
    if (userCurrent.schedules[0]?.id !== user.schedules[0]?.id) {
      if (userCurrent.schedules[0]) {
        await userScheduleDissociate(user, userCurrent.schedules[0]);
      }
      if (user.schedules[0]) {
        await userScheduleAssociate(user, user.schedules[0]);
      }
    }
  };

  // voicemails
  const userUpdateVoicemail = async (userCurrent, user) => {
    if (userCurrent.voicemail?.id !== user.voicemail?.id) {
      if (userCurrent.voicemail?.id) {
        await userVoicemailDissociate(user, userCurrent.voicemail);
      }
      if (user.voicemail?.id !== null && user.voicemail?.id !== undefined) {
        await userVoicemailAssociate(user, user.voicemail);
      }
    } else {
      if (user.voicemail?.id) {
        await voicemailEdit(user.voicemail);
      }
    }
  };

  return {
    userHelperUpdate,
  };
};

export default UserHelper;
