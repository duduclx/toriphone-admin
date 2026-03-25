import { useState } from "react";
import { Flex, Tabs } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import UserEditUser from "./UserEditUser";
import UserEditGeneral from "./UserEditGeneral";
import UserEditFallbacks from "./UserEditFallbacks";
import UserEditServices from "./UserEditServices";
import UserEditForwards from "./UserEditForwards";
import UserEditDTMF from "./UserEditDTMF";
import UserEditGroup from "./UserEditGroup";
import UserEditSchedules from "./UserEditSchedules";
import UserEditVoicemails from "./UserEditVoicemails";
import UserEditCallpermissions from "./UserEditCallpermissions";
import UserEditFunckeys from "./UserEditFunckeys";
import UserEditLines from "./UserEditLines";

import UserHelper from "../helper/UserHelper";
import TemplatePage from "../../../templates/TemplatePage";

const UserEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // helper
  const { userHelperUpdate } = UserHelper();

  // api
  const { userCurrent } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const { call_record_enabled, ...userWithoutCallRecord } = userCurrent;

  const [user, setUser] = useState({
    ...userWithoutCallRecord,
  });

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await userHelperUpdate(userCurrent, user);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("users");
    }
  };

  return (
    <TemplatePage
      title={t("users.edit.title", { name: userCurrent.firstname + " " + userCurrent.lastname })}
      setSelectedComponent={setSelectedComponent}
      route={"users"}
      submit={submit}
      isEdit
      hasTabs
      errors={errors}
      loading={loading}
    >
      <Tabs.Root defaultValue="user">
        <Tabs.List>
          <Tabs.Trigger value="user">{t("users.tabs.user")}</Tabs.Trigger>
          <Tabs.Trigger value="general">{t("users.tabs.informations")}</Tabs.Trigger>
          <Tabs.Trigger value="services">{t("users.tabs.services")}</Tabs.Trigger>
          <Tabs.Trigger value="answer">{t("users.tabs.no_answer")}</Tabs.Trigger>
          <Tabs.Trigger value="forwards">{t("users.tabs.forwards")}</Tabs.Trigger>
          <Tabs.Trigger value="lines">{t("users.tabs.lines")}</Tabs.Trigger>
          <Tabs.Trigger value="groups">{t("users.tabs.groups")}</Tabs.Trigger>
          <Tabs.Trigger value="funckeys">{t("users.tabs.funckeys")}</Tabs.Trigger>
          <Tabs.Trigger value="schedules">{t("users.tabs.schedules")}</Tabs.Trigger>
          <Tabs.Trigger value="voicemails">{t("users.tabs.voicemails")}</Tabs.Trigger>
          <Tabs.Trigger value="call">{t("users.tabs.callpermissions")}</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content width="50%" m="auto" value="user">
          {/*user*/}
          <UserEditUser user={user} setUser={setUser} />
        </Tabs.Content>

        <Tabs.Content width="50%" m="auto" value="general">
          {/*general*/}
          <UserEditGeneral user={user} setUser={setUser} />
        </Tabs.Content>

        <Tabs.Content width="50%" m="auto" value="services">
          <Flex flexDirection="column" gap="4" >
            {/*services*/}
            <UserEditServices user={user} setUser={setUser} />
            {/*DTMF*/}
            <UserEditDTMF user={user} setUser={setUser} />
          </Flex>
        </Tabs.Content>

        <Tabs.Content width="50%" m="auto" value="answer">
          {/*no_answer fallbacks*/}
          <UserEditFallbacks user={user} setUser={setUser} />
        </Tabs.Content>

        <Tabs.Content width="50%" m="auto" value="forwards">
          {/*forwards*/}
          <UserEditForwards user={user} setUser={setUser} />
        </Tabs.Content>

        <Tabs.Content width="100%" m="auto" value="lines">
          {/*lines*/}
          <UserEditLines user={user} setUser={setUser} userCurrent={userCurrent} />
        </Tabs.Content>

        <Tabs.Content width="50%" m="auto" value="groups">
          {/*groups*/}
          <UserEditGroup user={user} setUser={setUser} />
        </Tabs.Content>

        <Tabs.Content value="funckeys">
          {/*funckeys*/}
          <UserEditFunckeys user={user} setUser={setUser} />
        </Tabs.Content>

        <Tabs.Content width="50%" m="auto" value="schedules">
          {/*schedules*/}
          <UserEditSchedules user={user} setUser={setUser} />
        </Tabs.Content>

        <Tabs.Content width="50%" m="auto" value="voicemails">
          {/*voicemails*/}
          <UserEditVoicemails user={user} setUser={setUser} />
        </Tabs.Content>

        <Tabs.Content width="50%" m="auto" value="call">
          {/*callpermissions*/}
          <UserEditCallpermissions user={user} setUser={setUser} />
        </Tabs.Content>
      </Tabs.Root>
    </TemplatePage>
  );
};

export default UserEdit;
